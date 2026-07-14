from playwright.sync_api import sync_playwright

URL = "http://localhost:8080"
SITE = "https://bestdeejay-design.github.io/designer-references/"
ERRORS = []


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.on("console", lambda m: ERRORS.append(m.text) if m.type == "error" else None)
        page.on("pageerror", lambda e: ERRORS.append(str(e)))
        page.goto(URL, wait_until="networkidle")
        page.wait_for_timeout(300)

        # meta description
        desc = page.query_selector('meta[name="description"]').get_attribute("content")
        assert desc and 0 < len(desc) <= 200, f"meta description плохой: {desc!r}"

        # canonical
        canon = page.query_selector('link[rel="canonical"]').get_attribute("href")
        assert canon == SITE, f"canonical: {canon}"

        # Open Graph
        def og(prop):
            el = page.query_selector(f'meta[property="og:{prop}"]')
            assert el, f"нет og:{prop}"
            return el.get_attribute("content")

        assert og("type") == "website"
        assert og("title") == "Справочник дизайнера — References"
        assert og("url") == SITE
        assert og("image").endswith("/og-image.png"), og("image")
        assert og("image:width") == "1200"
        assert og("image:height") == "630"
        assert og("locale") == "ru_RU"
        assert og("site_name") == "Справочник дизайнера"

        # Twitter Card
        tw_card = page.query_selector('meta[name="twitter:card"]').get_attribute("content")
        assert tw_card == "summary_large_image", tw_card
        tw_img = page.query_selector('meta[name="twitter:image"]').get_attribute("content")
        assert tw_img == og("image"), "twitter:image != og:image"

        # assets reachable on the local server
        img = page.request.get(URL.rstrip('/') + "/og-image.png")
        assert img.status == 200, f"og-image status {img.status}"
        assert "image/png" in img.headers.get("content-type", ""), img.headers.get("content-type")

        robots = page.request.get(URL.rstrip('/') + "/robots.txt")
        assert robots.status == 200, f"robots status {robots.status}"
        assert "Sitemap:" in robots.text(), "robots.txt без Sitemap"

        sitemap = page.request.get(URL.rstrip('/') + "/sitemap.xml")
        assert sitemap.status == 200, f"sitemap status {sitemap.status}"
        assert SITE in sitemap.text(), "sitemap без URL сайта"

        # floating share button + popover (как в ksu)
        btn = page.query_selector("#share-btn-fixed")
        assert btn, "нет кнопки Поделиться"
        pop = page.query_selector("#share-pop")
        assert pop, "нет поповера"
        kinds = {a.get_attribute("data-share") for a in pop.query_selector_all("[data-share]")}
        assert {"vk", "tg", "fb", "tw", "wa", "native", "copy"} <= kinds, f"не все сети: {kinds}"
        btn.click()
        page.wait_for_timeout(150)
        assert "open" in (pop.get_attribute("class") or ""), "поповер не открылся"
        vk = pop.query_selector('[data-share="vk"]').get_attribute("href")
        assert vk.startswith("https://vk.com/share.php?url="), vk

        assert ERRORS == [], f"console errors: {ERRORS}"
        print("PASS phase3 seo: meta/og/twitter/robots/sitemap/share ok")
        browser.close()


if __name__ == "__main__":
    main()

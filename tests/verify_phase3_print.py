from playwright.sync_api import sync_playwright
import sys

URL = "http://localhost:8080"
ERRORS = []

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.on("console", lambda m: ERRORS.append(m.text) if m.type == "error" else None)
        page.on("pageerror", lambda e: ERRORS.append(str(e)))
        page.goto(URL, wait_until="networkidle")
        page.wait_for_timeout(300)

        # Печатные стили подключены: @media print прячет хром и показывает карточки.
        # Проверяем через эмуляцию медиазапроса print, что:
        #  - .topbar скрыт
        #  - карточки видимы (display не none)
        #  - URL печатается через ::after content (attr(href))
        page.emulate_media(media="print")
        page.wait_for_timeout(100)

        topbar_hidden = page.evaluate("getComputedStyle(document.querySelector('.topbar')).display === 'none'")
        assert topbar_hidden, "topbar не скрыт в печати"

        cards = page.query_selector_all("#references-grid .ref-card")
        assert len(cards) == 18, f"cards: {len(cards)}"
        first_visible = page.evaluate("(c) => getComputedStyle(c).display !== 'none'", cards[0])
        assert first_visible, "карточка скрыта в печати (без выбора должна быть видна)"

        # URL реально печатается (::after содержит href)
        url_printed = page.evaluate("""() => {
          const a = document.querySelector('.ref-card__link');
          const after = getComputedStyle(a, '::after').content;
          return after && after !== 'none' && after.includes('http');
        }""")
        assert url_printed, "URL не печатается в ::after"

        # selection-aware: выбираем 2 карточки -> в печати только они
        page.emulate_media(media="screen")
        cards[0].query_selector(".ref-card__select").click()
        cards[1].query_selector(".ref-card__select").click()
        page.wait_for_timeout(100)
        has_sel = page.evaluate("document.body.classList.contains('has-selection')")
        assert has_sel, "body.has-selection не выставлен"

        page.emulate_media(media="print")
        page.wait_for_timeout(100)
        visible_ids = page.evaluate("""() => [...document.querySelectorAll('#references-grid .ref-card')]
          .filter(c => getComputedStyle(c).display !== 'none')
          .map(c => c.dataset.id)""")
        assert visible_ids == ['r0', 'r1'], f"в печати выбранного ожидалось [r0,r1], got {visible_ids}"

        browser.close()

    if ERRORS:
        print("FAIL console errors:", ERRORS)
        sys.exit(1)
    print("PASS phase3 print: chrome-hidden, url-printed, selection-aware=[r0,r1]")

if __name__ == "__main__":
    main()

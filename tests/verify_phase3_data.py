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

        # --- Data file loaded: globals present ---
        nav = page.evaluate("typeof refsData + '|' + typeof refsI18n + '|' + typeof specialResources + '|' + typeof boardResources + '|' + typeof refTags")
        assert nav == "object|object|object|object|object", f"data globals missing: {nav}"

        # --- Render identical to prior phases ---
        cards = page.query_selector_all("#references-grid .ref-card")
        assert len(cards) == 18, f"expected 18 cards, got {len(cards)}"

        # tags dataset present on every card (comma-separated)
        tag_sets = [c.get_attribute("data-tags") for c in cards]
        assert all(tag_sets), "a card is missing data-tags"
        assert all("," in t for t in tag_sets), "data-tags must be comma-separated"

        # resource sections rendered from data file
        special = page.query_selector_all("#special-grid .ref-mini")
        boards = page.query_selector_all("#boards-grid .ref-mini")
        assert len(special) == 5, f"expected 5 special, got {len(special)}"
        assert len(boards) == 3, f"expected 3 boards, got {len(boards)}"

        # i18n applied
        label = page.text_content("#refs-label").strip()
        assert label in ("Референсы", "Inspiration"), f"label not i18n: {label}"

        # platform links intact inside cards (4 each, with platform classes)
        link_counts = [len(c.query_selector_all(".ref-card__link")) for c in cards]
        assert all(n == 4 for n in link_counts), f"link count mismatch: {link_counts}"

        # data-id is r0..r17 (used by selection + filter)
        ids = [c.get_attribute("data-id") for c in cards]
        assert ids == [f"r{i}" for i in range(18)], f"data-id mismatch: {ids[:3]}..."

        # toggle lang to en -> cards re-render with en copy, data still from file
        page.click("#lang-en")
        page.wait_for_timeout(200)
        en_label = page.text_content("#refs-label").strip()
        assert en_label == "Inspiration", f"lang toggle failed: {en_label}"
        en_cards = page.query_selector_all("#references-grid .ref-card")
        assert len(en_cards) == 18, "card count changed after lang toggle"

        # selection persists to localStorage (data-driven feature still works)
        en_cards[0].query_selector(".ref-card__select").click()
        page.wait_for_timeout(100)
        fav = page.evaluate("localStorage.getItem('references:fav')")
        assert fav and "r0" in fav, f"selection not persisted: {fav}"

        browser.close()

    if ERRORS:
        print("FAIL console errors:", ERRORS)
        sys.exit(1)
    print("PASS phase3 data extraction: globals=%s cards=18 special=5 boards=3" % nav)

if __name__ == "__main__":
    main()

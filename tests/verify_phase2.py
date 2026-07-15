"""Phase 2 — tags refine search (do NOT hide cards), 'similar' adds tag context,
'only my selection' view.

Product decision: tags only affect the search query inside card links and the
result-count note; they must NOT change how many cards are visible. Categories and
favorites are the only filters that hide cards.

Run in OrbStack: docker -c orbstack run --rm --network host \
  -v /Users/best/Projects/references:/refs mcr.microsoft.com/playwright/python:latest \
  bash -c "pip install -q playwright==1.46.0 && python /refs/tests/verify_phase2.py"
"""
from playwright.sync_api import sync_playwright

URL = "http://localhost:8080"


def main():
    errs = []
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page()
        pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.on("console", lambda m: errs.append("CONSOLE " + m.type + ": " + m.text)
              if m.type in ("error", "warning") else None)

        pg.goto(URL, wait_until="networkidle")
        pg.evaluate("localStorage.clear()")
        pg.reload(wait_until="networkidle")

        def vis():
            return pg.eval_on_selector_all(".ref-card", "els=>els.filter(e=>e.style.display!=='none').length")

        base = vis()
        tag_count = pg.eval_on_selector_all(".tag-chip", "els=>els.length")

        # click tag 'brand' -> cards NOT hidden (tag only refines search query)
        pg.click('.tag-chip[data-tag="brand"]')
        brand_visible = vis()
        brand_chip = pg.eval_on_selector('.tag-chip[data-tag="brand"]', "el=>el.getAttribute('aria-pressed')")
        brand_link_has = pg.eval_on_selector('.ref-card a.ref-card__link--be', "el=>el.href.includes('brand')")

        # clear tag -> still all visible
        pg.click('.tag-chip[data-tag="brand"]')
        all_after_clear = vis()

        # 'similar' on r0 -> activeTags = r0's tags -> cards NOT hidden, links carry tag
        pg.click('.ref-card[data-id="r0"] .ref-card__similar')
        similar_visible = vis()
        r0_tags = pg.eval_on_selector('.ref-card[data-id="r0"]', "el=>el.dataset.tags.split(',')")
        similar_link_has = pg.evaluate(
            "(tags)=>{const c=[...document.querySelectorAll('.ref-card')].find(c=>c.style.display!=='none');"
            "const a=c.querySelector('a.ref-card__link--be'); return tags.some(t=>a.href.includes(t));}",
            r0_tags)
        # reset tags
        for t in pg.eval_on_selector_all('.tag-chip[aria-pressed="true"]', "els=>els.map(e=>e.dataset.tag)"):
            pg.click(f'.tag-chip[data-tag="{t}"]')
        all_after_similar = vis()

        # 'only my selection' view (favorites DO hide cards)
        pg.click('.ref-card[data-id="r2"] .ref-card__select')
        pg.click('.ref-card[data-id="r8"] .ref-card__select')
        pg.click('#fav-only')
        fav_visible = vis()
        fav_visible_ids = pg.eval_on_selector_all(".ref-card", "els=>els.filter(e=>e.style.display!=='none').map(e=>e.dataset.id)")
        fav_chip = pg.eval_on_selector('#fav-only', "el=>el.getAttribute('aria-pressed')")
        # turn off
        pg.click('#fav-only')
        all_after_fav = vis()

        b.close()

    print("BASE=", base)
    print("TAG_CHIPS=", tag_count)
    print("BRAND visible/chip/link_has=", brand_visible, brand_chip, brand_link_has)
    print("ALL_AFTER_CLEAR=", all_after_clear)
    print("SIMILAR r0_tags=", r0_tags, "visible/link_has=", similar_visible, similar_link_has)
    print("ALL_AFTER_SIMILAR=", all_after_similar)
    print("FAV visible=", fav_visible, "ids=", fav_visible_ids, "chip=", fav_chip)
    print("ALL_AFTER_FAV=", all_after_fav)
    print("ERRORS=", errs)

    ok = (tag_count > 5
          and base == 18
          and brand_visible == 18 and brand_chip == 'true' and brand_link_has
          and all_after_clear == 18
          and similar_visible == 18 and similar_link_has
          and all_after_similar == 18
          and fav_visible == 2 and set(fav_visible_ids) == {'r2', 'r8'} and fav_chip == 'true'
          and all_after_fav == 18
          and errs == [])
    print("RESULT=", "PASS" if ok else "FAIL")
    raise SystemExit(0 if ok else 1)


if __name__ == "__main__":
    main()

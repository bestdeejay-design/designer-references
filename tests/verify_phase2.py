"""Phase 2 — tags filter, 'similar' by tags, 'only my selection' view.
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

        # tag bar exists
        tag_count = pg.eval_on_selector_all(".tag-chip", "els=>els.length")

        # click tag 'brand' -> only cards tagged brand visible
        pg.click('.tag-chip[data-tag="brand"]')
        brand_visible = pg.eval_on_selector_all(".ref-card", "els=>els.filter(e=>e.style.display!=='none').length")
        brand_expected = pg.eval_on_selector_all(".ref-card", "els=>els.filter(e=>(e.dataset.tags||'').split(',').includes('brand')).length")
        brand_chip = pg.eval_on_selector('.tag-chip[data-tag="brand"]', "el=>el.getAttribute('aria-pressed')")

        # clear tag
        pg.click('.tag-chip[data-tag="brand"]')
        all_after_clear = pg.eval_on_selector_all(".ref-card", "els=>els.filter(e=>e.style.display!=='none').length")

        # 'similar' on r0 -> activeTags = r0's tags -> matching cards visible
        pg.click('.ref-card[data-id="r0"] .ref-card__similar')
        similar_visible = pg.eval_on_selector_all(".ref-card", "els=>els.filter(e=>e.style.display!=='none').length")
        # r0 tags from page
        r0_tags = pg.eval_on_selector('.ref-card[data-id="r0"]', "el=>el.dataset.tags.split(',')")
        similar_expected = pg.eval_on_selector_all(".ref-card", "els=>els.filter(e=>{const t=(e.dataset.tags||'').split(','); return t.some(x=>%r.includes(x));}).length" % r0_tags)
        # reset tags
        pg.click('.tag-chip[aria-pressed="true"]') if pg.eval_on_selector_all('.tag-chip[aria-pressed="true"]', "els=>els.length") else None
        # clear any active tag chips
        for t in pg.eval_on_selector_all('.tag-chip[aria-pressed="true"]', "els=>els.map(e=>e.dataset.tag)"):
            pg.click(f'.tag-chip[data-tag="{t}"]')
        all_after_similar = pg.eval_on_selector_all(".ref-card", "els=>els.filter(e=>e.style.display!=='none').length")

        # 'only my selection' view
        pg.click('.ref-card[data-id="r2"] .ref-card__select')
        pg.click('.ref-card[data-id="r8"] .ref-card__select')
        pg.click('#fav-only')
        fav_visible = pg.eval_on_selector_all(".ref-card", "els=>els.filter(e=>e.style.display!=='none').length")
        fav_visible_ids = pg.eval_on_selector_all(".ref-card", "els=>els.filter(e=>e.style.display!=='none').map(e=>e.dataset.id)")
        fav_chip = pg.eval_on_selector('#fav-only', "el=>el.getAttribute('aria-pressed')")
        # turn off
        pg.click('#fav-only')
        all_after_fav = pg.eval_on_selector_all(".ref-card", "els=>els.filter(e=>e.style.display!=='none').length")

        b.close()

    print("TAG_CHIPS=", tag_count)
    print("BRAND visible/expected=", brand_visible, brand_expected, "chip=", brand_chip)
    print("ALL_AFTER_CLEAR=", all_after_clear)
    print("SIMILAR r0_tags=", r0_tags, "visible/expected=", similar_visible, similar_expected)
    print("ALL_AFTER_SIMILAR=", all_after_similar)
    print("FAV visible=", fav_visible, "ids=", fav_visible_ids, "chip=", fav_chip)
    print("ALL_AFTER_FAV=", all_after_fav)
    print("ERRORS=", errs)

    ok = (tag_count > 5
          and brand_visible == brand_expected and brand_expected > 0 and brand_chip == 'true'
          and all_after_clear == 18
          and similar_visible == similar_expected and similar_expected > 0
          and all_after_similar == 18
          and fav_visible == 2 and set(fav_visible_ids) == {'r2', 'r8'} and fav_chip == 'true'
          and all_after_fav == 18
          and errs == [])
    print("RESULT=", "PASS" if ok else "FAIL")
    raise SystemExit(0 if ok else 1)

if __name__ == "__main__":
    main()

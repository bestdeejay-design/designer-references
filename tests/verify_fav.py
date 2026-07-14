"""Phase 0 — verify localStorage favorites (Избранное) on the live preview.
Run inside OrbStack: docker -c orbstack run --rm --network host \
  -v /Users/best/Projects/references:/refs mcr.microsoft.com/playwright/python:latest \
  bash -c "pip install -q playwright==1.46.0 && python /refs/tests/verify_fav.py"
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
        # clean slate
        pg.evaluate("localStorage.removeItem('references:fav')")
        pg.reload(wait_until="networkidle")

        # select two cards
        pg.click('.ref-card[data-id="r0"] .ref-card__select')
        pg.click('.ref-card[data-id="r5"] .ref-card__select')
        saved = pg.evaluate("localStorage.getItem('references:fav')")
        sel0 = pg.eval_on_selector('.ref-card[data-id="r0"]', "el=>el.classList.contains('is-selected')")
        sel5 = pg.eval_on_selector('.ref-card[data-id="r5"]', "el=>el.classList.contains('is-selected')")
        bar_hidden = pg.eval_on_selector("#share-bar", "el=>el.hidden")

        # reload -> persistence
        pg.reload(wait_until="networkidle")
        saved_after = pg.evaluate("localStorage.getItem('references:fav')")
        sel0_after = pg.eval_on_selector('.ref-card[data-id="r0"]', "el=>el.classList.contains('is-selected')")
        sel5_after = pg.eval_on_selector('.ref-card[data-id="r5"]', "el=>el.classList.contains('is-selected')")

        # clear
        if not pg.eval_on_selector("#share-bar", "el=>el.hidden"):
            pg.click("#share-clear")
        saved_cleared = pg.evaluate("localStorage.getItem('references:fav')")
        pg.reload(wait_until="networkidle")
        sel0_cleared = pg.eval_on_selector('.ref-card[data-id="r0"]', "el=>el.classList.contains('is-selected')")

        # shared link precedence: ?sel= must NOT pull in localStorage favorites
        pg.goto(URL + "?sel=r3", wait_until="networkidle")
        shared_banner = pg.eval_on_selector("#share-banner", "el=>!el.hidden")
        r3_visible = pg.eval_on_selector('.ref-card[data-id="r3"]', "el=>el.style.display !== 'none'")
        r0_visible_in_shared = pg.eval_on_selector('.ref-card[data-id="r0"]', "el=>el.style.display !== 'none'")

        b.close()

    print("SAVED=", saved)
    print("SEL_IMMEDIATE r0/r5=", sel0, sel5)
    print("SHARE_BAR_VISIBLE=", not bar_hidden)
    print("SAVED_AFTER_RELOAD=", saved_after)
    print("SEL_AFTER_RELOAD r0/r5=", sel0_after, sel5_after)
    print("SAVED_AFTER_CLEAR=", saved_cleared)
    print("SEL_AFTER_CLEAR_RELOAD r0=", sel0_cleared)
    print("SHARED_BANNER_SHOWN=", shared_banner)
    print("SHARED r3_VISIBLE=", r3_visible, "r0_HIDDEN=", not r0_visible_in_shared)
    print("ERRORS=", errs)

    ok = (saved == '["r0","r5"]'
          and sel0 and sel5 and not bar_hidden
          and saved_after == '["r0","r5"]' and sel0_after and sel5_after
          and saved_cleared == '[]' and not sel0_cleared
          and shared_banner and r3_visible and not r0_visible_in_shared
          and errs == [])
    print("RESULT=", "PASS" if ok else "FAIL")
    raise SystemExit(0 if ok else 1)

if __name__ == "__main__":
    main()

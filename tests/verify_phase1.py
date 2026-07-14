"""Phase 1 — theme/lang persistence, platform link filter, '/' shortcut, result counter.
Run in OrbStack: docker -c orbstack run --rm --network host \
  -v /Users/best/Projects/references:/refs mcr.microsoft.com/playwright/python:latest \
  bash -c "pip install -q playwright==1.46.0 && python /refs/tests/verify_phase1.py"
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

        total = pg.eval_on_selector_all(".ref-card", "els=>els.length")
        result_txt = pg.text_content("#ref-result")
        counter_ok = (str(total) in (result_txt or ""))

        # theme persistence
        theme_before = pg.eval_on_selector("html", "el=>el.getAttribute('data-theme')")
        pg.click("#theme-toggle")
        theme_after = pg.eval_on_selector("html", "el=>el.getAttribute('data-theme')")
        theme_saved = pg.evaluate("localStorage.getItem('references:theme')")
        pg.reload(wait_until="networkidle")
        theme_reload = pg.eval_on_selector("html", "el=>el.getAttribute('data-theme')")

        # lang persistence
        pg.click("#lang-en")
        lang_saved = pg.evaluate("localStorage.getItem('references:lang')")
        pg.reload(wait_until="networkidle")
        en_pressed = pg.eval_on_selector("#lang-en", "el=>el.getAttribute('aria-pressed')")
        ru_pressed = pg.eval_on_selector("#lang-ru", "el=>el.getAttribute('aria-pressed')")

        # platform link filter: clicking Behance -> each visible card shows only its Be link
        pg.click('.plat-chip[data-key="be"]')
        be_chip = pg.eval_on_selector('.plat-chip[data-key="be"]', "el=>el.getAttribute('aria-pressed')")
        vis_links_be = pg.eval_on_selector_all(".ref-card", "els=>els.map(e=>[...e.querySelectorAll('.ref-card__link')].filter(a=>a.style.display!=='none').length)")
        be_link_ok = all(n == 1 for n in vis_links_be) and len(vis_links_be) == total
        result_after = pg.text_content("#ref-result")
        counter_filter_ok = (str(total) in (result_after or ""))

        # combo Behance + Dribbble -> 2 links per card
        pg.click('.plat-chip[data-key="dr"]')
        vis_links_combo = pg.eval_on_selector_all(".ref-card", "els=>els.map(e=>[...e.querySelectorAll('.ref-card__link')].filter(a=>a.style.display!=='none').length)")
        combo_ok = all(n == 2 for n in vis_links_combo)

        # deselect all -> 4 links per card
        pg.click('.plat-chip[data-key="be"]')
        pg.click('.plat-chip[data-key="dr"]')
        vis_links_all = pg.eval_on_selector_all(".ref-card", "els=>els.map(e=>[...e.querySelectorAll('.ref-card__link')].filter(a=>a.style.display!=='none').length)")
        all_links_ok = all(n == 4 for n in vis_links_all)

        # '/' focuses search
        pg.keyboard.press("/")
        focus_id = pg.evaluate("document.activeElement.id")

        b.close()

    print("TOTAL=", total, "COUNTER_ON_LOAD=", counter_ok)
    print("THEME before/after/saved/reload=", theme_before, theme_after, theme_saved, theme_reload)
    print("LANG saved=", lang_saved, "en_pressed=", en_pressed, "ru_pressed=", ru_pressed)
    print("BE chip=", be_chip, "links_per_card==1=", be_link_ok, "counter_ok=", counter_filter_ok)
    print("COMBO links==2=", combo_ok, "ALL links==4=", all_links_ok)
    print("FOCUS_AFTER_SLASH=", focus_id)
    print("ERRORS=", errs)

    ok = (counter_ok
          and theme_before != theme_after and theme_saved == theme_after and theme_reload == theme_after
          and lang_saved == 'en' and en_pressed == 'true' and ru_pressed == 'false'
          and be_chip == 'true' and be_link_ok and counter_filter_ok
          and combo_ok and all_links_ok
          and focus_id == 'ref-filter'
          and errs == [])
    print("RESULT=", "PASS" if ok else "FAIL")
    raise SystemExit(0 if ok else 1)

if __name__ == "__main__":
    main()

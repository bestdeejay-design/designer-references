from playwright.sync_api import sync_playwright
import sys

URL = "http://localhost:8080"
ERRORS = []

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        ctx = browser.new_context(viewport={"width": 1440, "height": 900})
        page = ctx.new_page()
        page.on("console", lambda m: ERRORS.append(m.text) if m.type == "error" else None)
        page.on("pageerror", lambda e: ERRORS.append(str(e)))
        page.goto(URL, wait_until="networkidle")
        page.wait_for_timeout(600)

        # SW контекст безопасный (localhost) -> регистрация возможна
        has_sw = page.evaluate("'serviceWorker' in navigator")
        assert has_sw, "serviceWorker API недоступен (нужен https/localhost)"

        # manifest корректно отдаётся и парсится
        manifest = page.evaluate("""async () => {
          const l = document.querySelector('link[rel=manifest]');
          if (!l) return null;
          const r = await fetch(l.href); const j = await r.json();
          return j && j.name ? j.name : null;
        }""")
        assert manifest == "Справочник дизайнера — референсы", f"manifest bad: {manifest}"

        # иконка отдаётся
        icon_ok = page.evaluate("""async () => {
          const r = await fetch('./icon.svg'); return r.ok && r.headers.get('content-type').includes('svg');
        }""")
        assert icon_ok, "icon.svg не отдаётся как svg"

        # SW регистрируется и становится active
        reg_state = page.evaluate("""async () => {
          const reg = await navigator.serviceWorker.ready;
          return reg ? reg.active ? 'active' : 'registered' : 'none';
        }""")
        assert reg_state in ("active", "registered"), f"SW не зарегистрирован: {reg_state}"

        # кэш каркаса заполнен
        cached = page.evaluate("""async () => {
          const keys = await caches.keys();
          if (!keys.length) return [];
          const c = await caches.open(keys[0]);
          const reqs = await c.keys();
          return reqs.map(r => r.url.split('/').pop());
        }""")
        for asset in ['index.html', 'references.css', 'references.js', 'references.data.js']:
            assert asset in cached, f"{asset} не в кэше SW: {cached}"

        browser.close()

    if ERRORS:
        print("FAIL console errors:", ERRORS)
        sys.exit(1)
    print(f"PASS phase3 PWA: sw={reg_state} manifest=ok icon=ok cached={sorted(cached)}")

if __name__ == "__main__":
    main()

# SEO-аудит — Справочник дизайнера

Цель: сайт должен попадать в индекс Google и Яндекса и красиво
отображаться при шаринге в соцсетях. Проект статический, хостится на
GitHub Pages (`bestdeejay-design.github.io/designer-references/`),
контент рисуется JS.

## Текущее состояние (до доработки)

| Что | Статус | Замечание |
|---|---|---|
| Публичный URL + статика | ✅ | GitHub Pages отдаёт обычный HTML |
| `<title>` | ✅ | «Справочник дизайнера — References» |
| `meta description` | ❌ (добавлено) | сниппет теперь задан вручную |
| `canonical` | ❌ (добавлено) | защита от дублей |
| OG-теги | ❌ (добавлено) | og:title/url/description/image/locale/site_name |
| Twitter Card | ❌ (добавлено) | summary_large_image + image:alt |
| `og:image` (1200×630) | ❌ (добавлено) | `og-image.png` |
| `robots.txt` | ❌ (добавлено) | allow all + ссылка на sitemap |
| `sitemap.xml` | ❌ (добавлено) | одна страница |
| Плавающая кнопка «Поделиться» | ❌ (добавлено) | как в `ksu/`: VK/TG/FB/TW/WA + копия |
| Тема/язык в статике | ⚠️ | контент карточек — из JS (см. риски) |

## Что должно быть (чек-лист реализовано)

- [x] `<title>` — уникальный, ≤ 60 символов.
- [x] `meta description` — ≤ 160 символов, осмысленный.
- [x] `canonical` → `https://bestdeejay-design.github.io/designer-references/`.
- [x] `meta robots: index,follow`.
- [x] `theme-color` (#0A0A0A) для мобильного хрома.
- [x] Open Graph: `og:type=website`, `og:url`, `og:title`,
      `og:description`, `og:image` (+ width/height/type), `og:locale=ru_RU`,
      `og:site_name`.
- [x] Twitter Card: `summary_large_image`, title/description/image/image:alt.
- [x] `og-image.png` 1200×630, та же бренд-система (акцент #FF2D55).
- [x] `robots.txt` + `sitemap.xml` в корне.
- [x] Кнопка «Поделиться» (соцсети + системный share + копия ссылки).

## Риски и нюансы

- **JS-контент.** Карточки рисуются в `buildReferences()`. Google рендерит
  JS и проиндексирует их; **Яндекс делает это слабее/медленнее**. Если
  важна гарантия под Яндекс — можно вынести заголовки/описания направлений
  в статический HTML (или SSR-подобный пре-рендер). Сейчас критичная мета-
  информация (title/description/OG) — статичная, этого достаточно для сниппета.
- **Тонкий контент.** Сайт в основном ссылается наружу; поисковики могут
  оценить как малозначимый. Входящие ссылки (с `ksu/` и демо) решают.
- **`github.io`** — отдельный «домен» в глазах поиска; в топ по широким
  запросам не выйдет, по нишевым/брендовым — реально.

## Как отправить в индекс

1. **Google Search Console** → «URL-адреса» → добавить
   `https://bestdeejay-design.github.io/designer-references/`; в «Охват
   URL» отправить `sitemap.xml`.
2. **Яндекс.Вебмастер** → добавить сайт, подтвердить (метатег/DNS),
   отправить `sitemap.xml`.
3. Поставить внешние ссылки со своих проектов и демо-версий (важно для
   обнаружения и веса).
4. Ждать индексации (от недель до месяцев). Проверять
   `site:bestdeejay-design.github.io/designer-references/`.

## Проверка

`tests/verify_seo.py` (Playwright) проверяет наличие OG/Twitter-тегов,
доступность `og-image.png`, `robots.txt`, `sitemap.xml` и работу кнопки
«Поделиться».

/* ============================================================
 * REFERENCES — данные (вынесены из references.js)
 * ------------------------------------------------------------
 * Сюда класть направления, ресурсы и ТЕГИ ПОИСКА. Код рендера —
 * в references.js. Файл грузится ДО references.js.
 *
 * refSearch — язык-нейтральные поисковые фразы (по одной на
 * направление, индекс совпадает с refsData[lang]). Именно они
 * формируют точные ссылки-поиск на Behance / Dribbble / Figma /
 * Pinterest (см. platformSearchUrls в references.js), чтобы
 * посетитель попадал на релевантный контент, а не на общее
 * галерейное меню.
 * ============================================================ */


/* --- i18n: ключи refs.* (en + ru) --- */
const refsI18n = {
  en: {
    'refs.label': 'Inspiration',
    'refs.subtitle': 'Explore thousands of projects across all design disciplines',
    'refs.specialTitle': 'Specialized Resources',
    'refs.specialDesc': 'Editorial picks, awards, and focused inspiration',
    'refs.boardsTitle': 'Moodboards & References',
    'refs.boardsDesc': 'Services for collecting ideas and visual search',
    ui: {
      brand: 'Design References',
      similar: '↔ Similar',
      favOnly: '☆ Favorites only',
      selectAria: 'Select for collection',
      ambientAria: 'Screensaver',
      themeAria: 'Toggle theme',
      searchPlaceholder: 'Search directions…',
      closeAria: 'Close presentation',
      copyLink: 'Copy link',
      list: 'List',
      present: 'Presentation',
      clear: 'Clear',
      viewAll: 'View all',
      collection: 'Collection: ',
      directions: 'directions',
      selected: 'Selected: ',
      toastLinkCopied: 'Link copied',
      toastCopyManual: 'Copy manually: ',
      toastListCopied: 'List copied',
      shareTitle: 'Share',
      shareSystem: 'Share… (system)',
      presentHint: '← → — navigate · Esc — exit',
      mdHeader: '# Reference collection — Design References',
    },
  },
  ru: {
    'refs.label': 'Референсы',
    'refs.subtitle': 'Тысячи проектов по всем направлениям дизайна',
    'refs.specialTitle': 'Специализированные ресурсы',
    'refs.specialDesc': 'Редакционные подборки, премии и вдохновение',
    'refs.boardsTitle': 'Референсы и мудборды',
    'refs.boardsDesc': 'Сервисы для сбора идей и визуального поиска',
    ui: {
      brand: 'Справочник дизайнера',
      similar: '↔ Похожее',
      favOnly: '☆ Только избранное',
      selectAria: 'Выбрать для подборки',
      ambientAria: 'Заставка',
      themeAria: 'Переключить тему',
      searchPlaceholder: 'Поиск по направлениям…',
      closeAria: 'Закрыть презентацию',
      copyLink: 'Копировать ссылку',
      list: 'Список',
      present: 'Презентация',
      clear: 'Очистить',
      viewAll: 'Смотреть всё',
      collection: 'Подборка: ',
      directions: 'направлений',
      selected: 'Выбрано: ',
      toastLinkCopied: 'Ссылка скопирована',
      toastCopyManual: 'Скопируй вручную: ',
      toastListCopied: 'Список скопирован',
      shareTitle: 'Поделиться',
      shareSystem: 'Поделиться… (система)',
      presentHint: '← → — листать · Esc — выйти',
      mdHeader: '# Подборка референсов — Справочник дизайнера',
    },
  },
}


/* --- Основные референсы по направлениям (refsData) --- */
const refsData = {
  en: [
    { cat: 'Branding & Identity', desc: 'Logos, visual identities, rebranding, brand books, brand guidelines, corporate style, naming, visual systems', color: '#FF2D55' },
    { cat: 'Typography', desc: 'Typefaces, lettering, typographic posters, fonts, font pairing, type specimens, calligraphy', color: '#FFD633' },
    { cat: 'Packaging', desc: 'Package design, labels, boxes, merch, bottles, cans, bags, stickers, wraps', color: '#00E5FF' },
    { cat: 'Posters', desc: 'Posters, billboards, event flyers, gig posters, movie posters, banners, prints', color: '#9B59B6' },
    { cat: 'Logos', desc: 'Thousands of logos from designers worldwide, monograms, marks, emblems, wordmarks', color: '#2ECC71' },
    { cat: 'Editorial', desc: 'Books, magazines, brochures, catalogues layout, zines, lookbooks, annual reports', color: '#E67E22' },
    { cat: 'Infographics', desc: 'Data visualization, charts, maps, diagrams, timelines, statistics design', color: '#1ABC9C' },
    { cat: 'Exhibition & Signage', desc: 'Expo design, wayfinding, signage, museum graphics, stands, environmental graphics', color: '#E74C3C' },
    { cat: 'Music Packaging', desc: 'Album covers, merch, visual identity for musicians, vinyl, CD, record sleeves', color: '#8E44AD' },
    { cat: 'Advertising', desc: 'Creative campaigns, banners, outdoor ads, OOH, billboards, social ads', color: '#F1C40F' },
    { cat: 'Game Design', desc: 'Concept art, UI, characters, environments, levels, props, game art', color: '#E74C3C' },
    { cat: 'Illustration', desc: 'Vector art, drawing, comics, digital painting, character art, editorial illustration', color: '#FF6B9D' },
    { cat: 'Product Design', desc: 'Industrial design, gadgets, furniture, appliances, consumer products', color: '#3498DB' },
    { cat: 'UI/UX', desc: 'Interfaces, websites, apps, prototypes, dashboards, mobile, web design', color: '#9B59B6' },
    { cat: 'Motion', desc: 'Animation, motion design, titles, ads, explainer videos, loops, intros', color: '#E67E22' },
    { cat: '3D Art', desc: '3D graphics, renders, CGI, AR, VR, modeling, product visualization', color: '#2ECC71' },
    { cat: 'Photography', desc: 'Photo shoots, retouching, styling, portrait, product, editorial photography', color: '#1ABC9C' },
    { cat: 'Fashion', desc: 'Style trends, visual concepts, editorials, lookbooks, clothing, runway', color: '#FF2D55' }
  ],
  ru: [
    { cat: 'Айдентика и брендинг', desc: 'Логотипы, фирменный стиль, брендбуки, ребрендинг, айдентика, гайдлайны, нейминг, визуальные системы бренда', color: '#FF2D55' },
    { cat: 'Типографика', desc: 'Шрифтовые работы, леттеринг, постеры, шрифты, подбор пар шрифтов, каллиграфия, гарнитуры', color: '#FFD633' },
    { cat: 'Упаковка', desc: 'Дизайн упаковки, этикетки, коробки, мерч, бутылки, банки, пакеты, стикеры, обёртка', color: '#00E5FF' },
    { cat: 'Плакаты', desc: 'Постеры, афиши, рекламные плакаты, музыкальные афиши, киноафиши, баннеры, принты', color: '#9B59B6' },
    { cat: 'Логотипы', desc: 'Тысячи логотипов от дизайнеров со всего мира, монограммы, эмблемы, словесные знаки, символы', color: '#2ECC71' },
    { cat: 'Издательский дизайн', desc: 'Вёрстка книг, журналов, брошюр, каталогов, зинов, лукбуков, годовых отчётов', color: '#E67E22' },
    { cat: 'Инфографика', desc: 'Визуализация данных, схемы, карты, диаграммы, таймлайны, статистика', color: '#1ABC9C' },
    { cat: 'Выставки и навигация', desc: 'Экспозиционный дизайн, вывески, указатели, музейная графика, стенды, эко-графика', color: '#E74C3C' },
    { cat: 'Музыкальная упаковка', desc: 'Обложки альбомов, мерч, дизайн для музыкантов, винил, CD, конверты пластинок', color: '#8E44AD' },
    { cat: 'Реклама', desc: 'Креативные рекламные кампании, баннеры, наружка, OOH, билборды, соцсети', color: '#F1C40F' },
    { cat: 'Гейм-дизайн', desc: 'Концепт-арт, интерфейсы, персонажи, окружение, локации, пропсы, гейм-арт', color: '#E74C3C' },
    { cat: 'Иллюстрация', desc: 'Рисунки, векторная графика, комиксы, арты, персонажи, редакционная иллюстрация', color: '#FF6B9D' },
    { cat: 'Product Design', desc: 'Промышленный дизайн, предметы, гаджеты, мебель, техника, потребительские товары', color: '#3498DB' },
    { cat: 'UI/UX', desc: 'Дизайн интерфейсов, сайтов, приложений, прототипов, дашбордов, мобильных и веб-сервисов', color: '#9B59B6' },
    { cat: 'Motion', desc: 'Анимация, моушн-дизайн, титры, рекламные ролики, экспленеры, интро, заставки', color: '#E67E22' },
    { cat: '3D Art', desc: 'Трёхмерная графика, рендеры, CGI, AR, VR, моделирование, визуализация продукта', color: '#2ECC71' },
    { cat: 'Фотография', desc: 'Фотосъёмка, обработка, ретушь, стилизация, портрет, предметная, редакционная съёмка', color: '#1ABC9C' },
    { cat: 'Fashion', desc: 'Мода, стиль, тренды, визуальные концепции, лукбуки, одежда, показы', color: '#FF2D55' }
  ],
}


/* --- Специализированные ресурсы --- */
const specialResources = [
  { nameEn: "It's Nice That", nameRu: 'It\'s Nice That', descEn: 'Editorial picks of the best design, illustration, typography and art projects', descRu: 'Редакционные подборки лучшего дизайна, графики, иллюстрации, типографики и арт-проектов', url: 'https://www.itsnicethat.com', color: '#333' },
  { nameEn: 'Design Week', nameRu: 'Design Week', descEn: 'Design news and case studies: branding, packaging, graphic and product design', descRu: 'Новости и кейсы дизайна: брендинг, упаковка, графический и продуктовый дизайн', url: 'https://www.designweek.co.uk', color: '#FF2D55' },
  { nameEn: 'Awwwards', nameRu: 'Awwwards', descEn: 'Best web design, UI/UX, site animation, interaction, frontend trends', descRu: 'Лучший веб-дизайн, UI/UX, анимация сайтов, интерактив, фронтенд-тренды', url: 'https://www.awwwards.com', color: '#00E5FF' },
  { nameEn: 'SiteInspire', nameRu: 'SiteInspire', descEn: 'Website inspiration: web portfolios, landing pages, corporate and creative sites', descRu: 'Вдохновение сайтами: веб-портфолио, лендинги, корпоративные и креативные сайты', url: 'https://www.siteinspire.com', color: '#9B59B6' },
  { nameEn: 'Typewolf', nameRu: 'Typewolf', descEn: 'Typography, font pairings, font recommendations, type trends', descRu: 'Типографика, шрифтовые пары, подборки шрифтов, тренды типографики', url: 'https://www.typewolf.com', color: '#F39C12' }
]


/* --- Сервисы для мудбордов и поиска идей --- */
const boardResources = [
  { nameEn: 'Are.na', nameRu: 'Are.na', descEn: 'Visual channels for ideas, moodboards, image collections, research, bookmarks', descRu: 'Визуальные каналы для идей, мудборды, коллекции картинок, исследования, закладки', url: 'https://www.are.na', color: '#FF2D55' },
  { nameEn: 'Muzli', nameRu: 'Muzli', descEn: 'Design insights and collections, UI/UX trends, product design, inspiration', descRu: 'Дизайн-инсайты и подборки, тренды UI/UX, продуктовый дизайн, вдохновение', url: 'https://muz.li', color: '#2ECC71' },
  { nameEn: 'Designspiration', nameRu: 'Designspiration', descEn: 'Search by color and style, design collections, palettes, tagged references', descRu: 'Поиск по цвету и стилю, подборки дизайна, палитры, референсы по тегам', url: 'https://www.designspiration.net', color: '#3498DB' }
]


/* --- Теги направлений (язык-нейтральные), индекс совпадает с refsData[lang] --- */
const refTags = [
  ['brand', 'logo', 'identity'],
  ['type', 'lettering', 'editorial'],
  ['packaging', 'product', 'print'],
  ['poster', 'print', 'campaign'],
  ['logo', 'brand', 'mark'],
  ['editorial', 'print', 'book'],
  ['data', 'editorial', 'ui'],
  ['environment', 'signage', 'print'],
  ['packaging', 'music', 'print'],
  ['campaign', 'brand', 'social'],
  ['game', 'ui', 'character'],
  ['illustration', 'character', 'editorial'],
  ['product', 'industrial', 'ui'],
  ['ui', 'web', 'app', 'product'],
  ['motion', 'video', 'animation'],
  ['3d', 'render', 'cgi'],
  ['photo', 'editorial', 'product'],
  ['fashion', 'editorial', 'brand'],
]


/* --- Поисковые фразы по направлениям (язык-нейтральные), индекс
 * совпадает с refsData[lang]. Формируют точные ссылки-поиск на
 * площадках (platformSearchUrls в references.js). --- */
const refSearch = [
  'branding identity logo',
  'typography typeface lettering',
  'packaging design box',
  'poster design print',
  'logo design mark',
  'editorial design book',
  'infographic data visualization',
  'exhibition signage wayfinding',
  'album cover vinyl',
  'advertising campaign creative',
  'game ui concept art',
  'illustration character art',
  'product design industrial',
  'ui ux app design',
  'motion design animation',
  '3d render cgi',
  'photography editorial',
  'fashion design lookbook',
]

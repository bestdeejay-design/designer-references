/* ============================================================
 * REFERENCES — данные (вынесены из references.js)
 * ------------------------------------------------------------
 * Сюда класть направления, ресурсы и теги. Код рендера —
 * в references.js. Файл грузится ДО references.js.
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
  },
  ru: {
    'refs.label': 'Референсы',
    'refs.subtitle': 'Тысячи проектов по всем направлениям дизайна',
    'refs.specialTitle': 'Специализированные ресурсы',
    'refs.specialDesc': 'Редакционные подборки, премии и вдохновение',
    'refs.boardsTitle': 'Референсы и мудборды',
    'refs.boardsDesc': 'Сервисы для сбора идей и визуального поиска',
  },
}


/* --- Основные референсы по направлениям (refsData) --- */
const refsData = {
  en: [
    { cat: 'Branding & Identity', desc: 'Logos, visual identities, rebranding, brand books, brand guidelines, corporate style, naming, visual systems', behance: 'https://www.behance.net/galleries/graphic-design/logo-branding', dribbble: 'https://dribbble.com/search/branding', figma: 'https://www.figma.com/community/search?query=branding', pinterest: 'https://www.pinterest.com/search/pins/?q=branding+design', color: '#FF2D55' },
    { cat: 'Typography', desc: 'Typefaces, lettering, typographic posters, fonts, font pairing, type specimens, calligraphy', behance: 'https://www.behance.net/galleries/graphic-design/typography', dribbble: 'https://dribbble.com/search/typography', figma: 'https://www.figma.com/community/search?query=typography', pinterest: 'https://www.pinterest.com/search/pins/?q=typography+design', color: '#FFD633' },
    { cat: 'Packaging', desc: 'Package design, labels, boxes, merch, bottles, cans, bags, stickers, wraps', behance: 'https://www.behance.net/galleries/graphic-design/packaging', dribbble: 'https://dribbble.com/search/packaging', figma: 'https://www.figma.com/community/search?query=packaging', pinterest: 'https://www.pinterest.com/search/pins/?q=packaging+design', color: '#00E5FF' },
    { cat: 'Posters', desc: 'Posters, billboards, event flyers, gig posters, movie posters, banners, prints', behance: 'https://www.behance.net/galleries/graphic-design/poster', dribbble: 'https://dribbble.com/search/poster', figma: 'https://www.figma.com/community/search?query=poster+design', pinterest: 'https://www.pinterest.com/search/pins/?q=poster+design', color: '#9B59B6' },
    { cat: 'Logos', desc: 'Thousands of logos from designers worldwide, monograms, marks, emblems, wordmarks', behance: 'https://www.behance.net/galleries/graphic-design/logo', dribbble: 'https://dribbble.com/search/logo', figma: 'https://www.figma.com/community/search?query=logo', pinterest: 'https://www.pinterest.com/search/pins/?q=logo+design', color: '#2ECC71' },
    { cat: 'Editorial', desc: 'Books, magazines, brochures, catalogues layout, zines, lookbooks, annual reports', behance: 'https://www.behance.net/galleries/graphic-design/editorial', dribbble: 'https://dribbble.com/search/editorial', figma: 'https://www.figma.com/community/search?query=editorial+design', pinterest: 'https://www.pinterest.com/search/pins/?q=editorial+design', color: '#E67E22' },
    { cat: 'Infographics', desc: 'Data visualization, charts, maps, diagrams, timelines, statistics design', behance: 'https://www.behance.net/galleries/graphic-design/infographic', dribbble: 'https://dribbble.com/search/infographic', figma: 'https://www.figma.com/community/search?query=infographic', pinterest: 'https://www.pinterest.com/search/pins/?q=infographic', color: '#1ABC9C' },
    { cat: 'Exhibition & Signage', desc: 'Expo design, wayfinding, signage, museum graphics, stands, environmental graphics', behance: 'https://www.behance.net/galleries/graphic-design/exhibition-signage', dribbble: 'https://dribbble.com/search/signage', figma: 'https://www.figma.com/community/search?query=signage', pinterest: 'https://www.pinterest.com/search/pins/?q=signage+design', color: '#E74C3C' },
    { cat: 'Music Packaging', desc: 'Album covers, merch, visual identity for musicians, vinyl, CD, record sleeves', behance: 'https://www.behance.net/galleries/graphic-design/music-packaging', dribbble: 'https://dribbble.com/search/music-packaging', figma: 'https://www.figma.com/community/search?query=music+packaging', pinterest: 'https://www.pinterest.com/search/pins/?q=album+cover+design', color: '#8E44AD' },
    { cat: 'Advertising', desc: 'Creative campaigns, banners, outdoor ads, OOH, billboards, social ads', behance: 'https://www.behance.net/galleries/advertising', dribbble: 'https://dribbble.com/search/advertising', figma: 'https://www.figma.com/community/search?query=advertising', pinterest: 'https://www.pinterest.com/search/pins/?q=advertising+design', color: '#F1C40F' },
    { cat: 'Game Design', desc: 'Concept art, UI, characters, environments, levels, props, game art', behance: 'https://www.behance.net/galleries/game-design', dribbble: 'https://dribbble.com/search/game-design', figma: 'https://www.figma.com/community/search?query=game+ui', pinterest: 'https://www.pinterest.com/search/pins/?q=game+design+art', color: '#E74C3C' },
    { cat: 'Illustration', desc: 'Vector art, drawing, comics, digital painting, character art, editorial illustration', behance: 'https://www.behance.net/galleries/illustrator', dribbble: 'https://dribbble.com/search/illustration', figma: 'https://www.figma.com/community/search?query=illustration', pinterest: 'https://www.pinterest.com/search/pins/?q=illustration+art', color: '#FF6B9D' },
    { cat: 'Product Design', desc: 'Industrial design, gadgets, furniture, appliances, consumer products', behance: 'https://www.behance.net/galleries/product-design', dribbble: 'https://dribbble.com/search/product-design', figma: 'https://www.figma.com/community/search?query=product+design', pinterest: 'https://www.pinterest.com/search/pins/?q=product+design', color: '#3498DB' },
    { cat: 'UI/UX', desc: 'Interfaces, websites, apps, prototypes, dashboards, mobile, web design', behance: 'https://www.behance.net/galleries/ui-ux', dribbble: 'https://dribbble.com/search/ui-ux', figma: 'https://www.figma.com/community/search?query=ui+design', pinterest: 'https://www.pinterest.com/search/pins/?q=ui+ux+design', color: '#9B59B6' },
    { cat: 'Motion', desc: 'Animation, motion design, titles, ads, explainer videos, loops, intros', behance: 'https://www.behance.net/galleries/motion', dribbble: 'https://dribbble.com/search/motion', figma: 'https://www.figma.com/community/search?query=motion+design', pinterest: 'https://www.pinterest.com/search/pins/?q=motion+design', color: '#E67E22' },
    { cat: '3D Art', desc: '3D graphics, renders, CGI, AR, VR, modeling, product visualization', behance: 'https://www.behance.net/galleries/3d-art', dribbble: 'https://dribbble.com/search/3d', figma: 'https://www.figma.com/community/search?query=3d', pinterest: 'https://www.pinterest.com/search/pins/?q=3d+art+design', color: '#2ECC71' },
    { cat: 'Photography', desc: 'Photo shoots, retouching, styling, portrait, product, editorial photography', behance: 'https://www.behance.net/galleries/photography', dribbble: 'https://dribbble.com/search/photography', figma: 'https://www.figma.com/community/search?query=photography', pinterest: 'https://www.pinterest.com/search/pins/?q=photography', color: '#1ABC9C' },
    { cat: 'Fashion', desc: 'Style trends, visual concepts, editorials, lookbooks, clothing, runway', behance: 'https://www.behance.net/galleries/fashion', dribbble: 'https://dribbble.com/search/fashion', figma: 'https://www.figma.com/community/search?query=fashion', pinterest: 'https://www.pinterest.com/search/pins/?q=fashion+design', color: '#FF2D55' }
  ],
  ru: [
    { cat: 'Айдентика и брендинг', desc: 'Логотипы, фирменный стиль, брендбуки, ребрендинг, айдентика, гайдлайны, нейминг, визуальные системы бренда', behance: 'https://www.behance.net/galleries/graphic-design/logo-branding', dribbble: 'https://dribbble.com/search/branding', figma: 'https://www.figma.com/community/search?query=branding', pinterest: 'https://www.pinterest.com/search/pins/?q=branding+design', color: '#FF2D55' },
    { cat: 'Типографика', desc: 'Шрифтовые работы, леттеринг, постеры, шрифты, подбор пар шрифтов, каллиграфия, гарнитуры', behance: 'https://www.behance.net/galleries/graphic-design/typography', dribbble: 'https://dribbble.com/search/typography', figma: 'https://www.figma.com/community/search?query=typography', pinterest: 'https://www.pinterest.com/search/pins/?q=typography+design', color: '#FFD633' },
    { cat: 'Упаковка', desc: 'Дизайн упаковки, этикетки, коробки, мерч, бутылки, банки, пакеты, стикеры, обёртка', behance: 'https://www.behance.net/galleries/graphic-design/packaging', dribbble: 'https://dribbble.com/search/packaging', figma: 'https://www.figma.com/community/search?query=packaging', pinterest: 'https://www.pinterest.com/search/pins/?q=packaging+design', color: '#00E5FF' },
    { cat: 'Плакаты', desc: 'Постеры, афиши, рекламные плакаты, музыкальные афиши, киноафиши, баннеры, принты', behance: 'https://www.behance.net/galleries/graphic-design/poster', dribbble: 'https://dribbble.com/search/poster', figma: 'https://www.figma.com/community/search?query=poster+design', pinterest: 'https://www.pinterest.com/search/pins/?q=poster+design', color: '#9B59B6' },
    { cat: 'Логотипы', desc: 'Тысячи логотипов от дизайнеров со всего мира, монограммы, эмблемы, словесные знаки, символы', behance: 'https://www.behance.net/galleries/graphic-design/logo', dribbble: 'https://dribbble.com/search/logo', figma: 'https://www.figma.com/community/search?query=logo', pinterest: 'https://www.pinterest.com/search/pins/?q=logo+design', color: '#2ECC71' },
    { cat: 'Издательский дизайн', desc: 'Вёрстка книг, журналов, брошюр, каталогов, зинов, лукбуков, годовых отчётов', behance: 'https://www.behance.net/galleries/graphic-design/editorial', dribbble: 'https://dribbble.com/search/editorial', figma: 'https://www.figma.com/community/search?query=editorial+design', pinterest: 'https://www.pinterest.com/search/pins/?q=editorial+design', color: '#E67E22' },
    { cat: 'Инфографика', desc: 'Визуализация данных, схемы, карты, диаграммы, таймлайны, статистика', behance: 'https://www.behance.net/galleries/graphic-design/infographic', dribbble: 'https://dribbble.com/search/infographic', figma: 'https://www.figma.com/community/search?query=infographic', pinterest: 'https://www.pinterest.com/search/pins/?q=infographic', color: '#1ABC9C' },
    { cat: 'Выставки и навигация', desc: 'Экспозиционный дизайн, вывески, указатели, музейная графика, стенды, эко-графика', behance: 'https://www.behance.net/galleries/graphic-design/exhibition-signage', dribbble: 'https://dribbble.com/search/signage', figma: 'https://www.figma.com/community/search?query=signage', pinterest: 'https://www.pinterest.com/search/pins/?q=signage+design', color: '#E74C3C' },
    { cat: 'Музыкальная упаковка', desc: 'Обложки альбомов, мерч, дизайн для музыкантов, винил, CD, конверты пластинок', behance: 'https://www.behance.net/galleries/graphic-design/music-packaging', dribbble: 'https://dribbble.com/search/music-packaging', figma: 'https://www.figma.com/community/search?query=music+packaging', pinterest: 'https://www.pinterest.com/search/pins/?q=album+cover+design', color: '#8E44AD' },
    { cat: 'Реклама', desc: 'Креативные рекламные кампании, баннеры, наружка, OOH, билборды, соцсети', behance: 'https://www.behance.net/galleries/advertising', dribbble: 'https://dribbble.com/search/advertising', figma: 'https://www.figma.com/community/search?query=advertising', pinterest: 'https://www.pinterest.com/search/pins/?q=advertising+design', color: '#F1C40F' },
    { cat: 'Гейм-дизайн', desc: 'Концепт-арт, интерфейсы, персонажи, окружение, локации, пропсы, гейм-арт', behance: 'https://www.behance.net/galleries/game-design', dribbble: 'https://dribbble.com/search/game-design', figma: 'https://www.figma.com/community/search?query=game+ui', pinterest: 'https://www.pinterest.com/search/pins/?q=game+design+art', color: '#E74C3C' },
    { cat: 'Иллюстрация', desc: 'Рисунки, векторная графика, комиксы, арты, персонажи, редакционная иллюстрация', behance: 'https://www.behance.net/galleries/illustrator', dribbble: 'https://dribbble.com/search/illustration', figma: 'https://www.figma.com/community/search?query=illustration', pinterest: 'https://www.pinterest.com/search/pins/?q=illustration+art', color: '#FF6B9D' },
    { cat: 'Product Design', desc: 'Промышленный дизайн, предметы, гаджеты, мебель, техника, потребительские товары', behance: 'https://www.behance.net/galleries/product-design', dribbble: 'https://dribbble.com/search/product-design', figma: 'https://www.figma.com/community/search?query=product+design', pinterest: 'https://www.pinterest.com/search/pins/?q=product+design', color: '#3498DB' },
    { cat: 'UI/UX', desc: 'Дизайн интерфейсов, сайтов, приложений, прототипов, дашбордов, мобильных и веб-сервисов', behance: 'https://www.behance.net/galleries/ui-ux', dribbble: 'https://dribbble.com/search/ui-ux', figma: 'https://www.figma.com/community/search?query=ui+design', pinterest: 'https://www.pinterest.com/search/pins/?q=ui+ux+design', color: '#9B59B6' },
    { cat: 'Motion', desc: 'Анимация, моушн-дизайн, титры, рекламные ролики, экспленеры, интро, заставки', behance: 'https://www.behance.net/galleries/motion', dribbble: 'https://dribbble.com/search/motion', figma: 'https://www.figma.com/community/search?query=motion+design', pinterest: 'https://www.pinterest.com/search/pins/?q=motion+design', color: '#E67E22' },
    { cat: '3D Art', desc: 'Трёхмерная графика, рендеры, CGI, AR, VR, моделирование, визуализация продукта', behance: 'https://www.behance.net/galleries/3d-art', dribbble: 'https://dribbble.com/search/3d', figma: 'https://www.figma.com/community/search?query=3d', pinterest: 'https://www.pinterest.com/search/pins/?q=3d+art+design', color: '#2ECC71' },
    { cat: 'Фотография', desc: 'Фотосъёмка, обработка, ретушь, стилизация, портрет, предметная, редакционная съёмка', behance: 'https://www.behance.net/galleries/photography', dribbble: 'https://dribbble.com/search/photography', figma: 'https://www.figma.com/community/search?query=photography', pinterest: 'https://www.pinterest.com/search/pins/?q=photography', color: '#1ABC9C' },
    { cat: 'Fashion', desc: 'Мода, стиль, тренды, визуальные концепции, лукбуки, одежда, показы', behance: 'https://www.behance.net/galleries/fashion', dribbble: 'https://dribbble.com/search/fashion', figma: 'https://www.figma.com/community/search?query=fashion', pinterest: 'https://www.pinterest.com/search/pins/?q=fashion+design', color: '#FF2D55' }
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

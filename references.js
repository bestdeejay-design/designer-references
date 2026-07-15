/* ============================================================
 * REFERENCES — рендер (код).
 * Данные (refsI18n, refsData, specialResources, boardResources,
 * refTags) вынесены в references.data.js и грузятся ДО этого
 * файла, поэтому здесь они доступны как globals.
 * ============================================================ */


/* Точные ссылки-поиск на площадках для направления #index.
 * Форматы взяты с реальных поисковых URL сервисов:
 *  - Behance:  /search/projects/{query}?tracking_source=typeahead_search_recent_suggestion
 *  - Dribbble: /search/{query через "-" }
 *  - Figma:    /community/search?query={query через "+"}&resource_type=files&...
 *  - Pinterest: /search/pins/?q={query через "+"}
 * Базовая фраза — язык-нейтральная (refSearch[index]); queryOverride
 * позволяет подставить составной запрос из активных фильтров. */
function platformSearchUrls(index, queryOverride) {
  const q = (queryOverride != null ? queryOverride : (refSearch[index] || '')).trim();
  const plus = q.split(' ').join('+');
  const dash = q.split(' ').join('-');
  return {
    beh: 'https://www.behance.net/search/projects/' + encodeURIComponent(q) + '?tracking_source=typeahead_search_recent_suggestion',
    dri: 'https://dribbble.com/search/' + dash,
    fig: 'https://www.figma.com/community/search?query=' + plus + '&resource_type=files&editor_type=all&price=all&sort_by=relevancy&creators=all&metadata%5Btools%5D=all',
    pin: 'https://www.pinterest.com/search/pins/?q=' + plus,
  };
}


function ui(key) {
  const langObj = refsI18n[lang];
  if (!langObj) return key;
  if (key.indexOf('ui.') === 0 && langObj.ui) {
    const v = langObj.ui[key.slice(3)];
    if (v != null) return v;
  }
  const v = langObj[key];
  return v != null ? v : key;
}
function applyUI() {
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    el.textContent = ui(el.getAttribute('data-i18n'));
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
    el.setAttribute('aria-label', ui(el.getAttribute('data-i18n-aria')));
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
    el.setAttribute('placeholder', ui(el.getAttribute('data-i18n-ph')));
  });
}


function buildReferences() {
  const grid = document.getElementById('references-grid')
  const data = refsData[lang] || refsData.en
  data.forEach((r, i) => {
    const u = platformSearchUrls(i)
    const card = document.createElement('div')
    card.className = 'ref-card'
    card.dataset.id = 'r' + i
    card.dataset.be = '1'
    card.dataset.dr = '1'
    card.dataset.fg = '1'
    card.dataset.pt = '1'
    card.dataset.tags = (refTags[i] || []).join(',')
    const ctxHidden = (refContext[i] || []).join(' ')
    card.innerHTML = `
      <button class="ref-card__select" type="button" aria-pressed="false" aria-label="${ui('ui.selectAria')}"><span class="ref-card__select-star">☆</span></button>
      <div class="ref-card__inner" style="--rc:${r.color}">
        <div class="ref-card__cat">${r.cat}</div>
        <div class="ref-card__desc">${r.desc}</div>
        <div class="ref-card__links">
          <a href="${u.beh}" target="_blank" rel="noopener" class="ref-card__link ref-card__link--be"><span>Be</span><span>${lang === 'ru' ? 'искать' : 'explore'}</span></a>
          <a href="${u.dri}" target="_blank" rel="noopener" class="ref-card__link ref-card__link--dr"><span>Dr</span><span>${lang === 'ru' ? 'искать' : 'explore'}</span></a>
          <a href="${u.fig}" target="_blank" rel="noopener" class="ref-card__link ref-card__link--fg"><span>Fg</span><span>${lang === 'ru' ? 'искать' : 'explore'}</span></a>
          <a href="${u.pin}" target="_blank" rel="noopener" class="ref-card__link ref-card__link--pt"><span>Pt</span><span>${lang === 'ru' ? 'искать' : 'explore'}</span></a>
        </div>
        <button class="ref-card__similar" type="button" data-i="${i}">${ui('ui.similar')}</button>
      </div>
      <span hidden>${ctxHidden}</span>`
    grid.appendChild(card)
  })
}


/* --- Рендер мини-секций ресурсов (нужен #<id>) --- */
function buildResourceSection(id, items) {
  const grid = document.getElementById(id)
  items.forEach((r) => {
    const el = document.createElement('a')
    el.className = 'ref-mini'
    el.href = r.url
    el.target = '_blank'
    el.rel = 'noopener'
    const name = lang === 'ru' ? r.nameRu : r.nameEn
    const desc = lang === 'ru' ? r.descRu : r.descEn
    el.innerHTML = `<div class="ref-mini__inner" style="border-color:${r.color}55"><div class="ref-mini__name">${name}</div><div class="ref-mini__desc">${desc}</div></div>`
    grid.appendChild(el)
  })
}

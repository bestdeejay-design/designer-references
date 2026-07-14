/* ============================================================
 * REFERENCES — рендер (код).
 * Данные (refsI18n, refsData, specialResources, boardResources,
 * refTags) вынесены в references.data.js и грузятся ДО этого
 * файла, поэтому здесь они доступны как globals.
 * ============================================================ */


function buildReferences() {
  const grid = document.getElementById('references-grid')
  const data = refsData[lang] || refsData.en
  data.forEach((r, i) => {
    const card = document.createElement('div')
    card.className = 'ref-card'
    card.dataset.id = 'r' + i
    card.dataset.be = r.behance ? '1' : ''
    card.dataset.dr = r.dribbble ? '1' : ''
    card.dataset.fg = r.figma ? '1' : ''
    card.dataset.pt = r.pinterest ? '1' : ''
    card.dataset.tags = (refTags[i] || []).join(',')
    card.innerHTML = `
      <button class="ref-card__select" type="button" aria-pressed="false" aria-label="Выбрать для подборки"><span class="ref-card__select-star">☆</span></button>
      <div class="ref-card__inner" style="background:linear-gradient(135deg,${r.color}22,${r.color}08)">
        <div class="ref-card__cat">${r.cat}</div>
        <div class="ref-card__desc">${r.desc}</div>
        <div class="ref-card__links">
          <a href="${r.behance}" target="_blank" rel="noopener" class="ref-card__link ref-card__link--be"><span>Be</span><span>${lang === 'ru' ? 'искать' : 'explore'}</span></a>
          <a href="${r.dribbble}" target="_blank" rel="noopener" class="ref-card__link ref-card__link--dr"><span>Dr</span><span>${lang === 'ru' ? 'искать' : 'explore'}</span></a>
          <a href="${r.figma}" target="_blank" rel="noopener" class="ref-card__link ref-card__link--fg"><span>Fg</span><span>${lang === 'ru' ? 'искать' : 'explore'}</span></a>
          <a href="${r.pinterest}" target="_blank" rel="noopener" class="ref-card__link ref-card__link--pt"><span>Pt</span><span>${lang === 'ru' ? 'искать' : 'explore'}</span></a>
        </div>
        <button class="ref-card__similar" type="button" data-i="${i}">↔ Похожее</button>
      </div>`
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

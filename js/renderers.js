/**
 * Rendering utilities for all content types
 */

import { RESOURCE_ICONS, RESOURCE_NAMES } from './config.js';

export class Renderer {
  constructor(data) {
    this.novels = data.novels || [];
    this.models = data.models || [];
    this.lego = data.lego || [];
    this.cars = data.cars || [];
    this.watches = data.watches || [];
    this.games = data.games || [];
    this.movies = data.movies || [];
    this.tvshows = data.tvshows || [];
  }

  // ===== SHARED: render a single card (publication-style) =====

  renderCard(item) {
    const linksHtml = this.formatLinks(item.links || {});
    const imageHtml = item.image
      ? `<div class="publication-media">
           <img src="images/${item.image}" alt="${item.title}" class="publication-image" loading="lazy" onerror="this.style.display='none'">
         </div>`
      : '';

    return `
      <article class="publication" id="${item.id}">
        <div class="publication-content">
          <h3 class="publication-title">${item.title}</h3>
          ${item.subtitle ? `<div class="publication-venue"><span class="venue-name">${item.subtitle}</span></div>` : ''}
          ${linksHtml ? `<div class="publication-links">${linksHtml}</div>` : ''}
        </div>
        ${imageHtml}
      </article>
    `;
  }

  // ===== SHARED: render a list item (education-style) with image =====

  renderListItem(item) {
    const imageHtml = item.image
      ? `<div class="publication-media">
           <img src="images/${item.image}" alt="${item.title}" class="publication-image" loading="lazy" onerror="this.style.display='none'">
         </div>`
      : '';

    return `
      <div class="publication" id="${item.id}">
        <div class="publication-content">
          <div class="edu-degree">${item.title}</div>
          ${item.subtitle ? `<div class="edu-institution">${item.subtitle}</div>` : ''}
        </div>
        ${imageHtml}
      </div>
    `;
  }

  // ===== SHARED: format resource links =====

  formatLinks(links) {
    if (!links || Object.keys(links).length === 0) return '';

    return Object.entries(links).map(([type, url]) => {
      const iconClass = RESOURCE_ICONS[type] || 'fas fa-external-link-alt';
      const displayName = RESOURCE_NAMES[type] || type.charAt(0).toUpperCase() + type.slice(1);
      return `
        <a href="${url}" class="resource-link" data-type="${type}" target="_blank" rel="noopener">
          <i class="${iconClass}"></i> ${displayName}
        </a>
      `;
    }).join('\n');
  }

  // ===== SHARED: group items by category and render (publication-style) =====

  renderGrouped(items, categoryField) {
    const grouped = {};
    const categoriesInOrder = [];

    items.forEach(item => {
      const cat = item[categoryField] || 'Other';
      if (!grouped[cat]) {
        grouped[cat] = [];
        categoriesInOrder.push(cat);
      }
      grouped[cat].push(item);
    });

    let html = '';
    categoriesInOrder.forEach(cat => {
      const catItems = grouped[cat];
      if (catItems && catItems.length > 0) {
        html += `<div class="year-group" id="cat-${cat.replace(/\s+/g, '-')}">`;
        html += `<h3 class="year-title">${cat}</h3>`;
        catItems.forEach(item => {
          html += this.renderCard(item);
        });
        html += '</div>';
      }
    });
    return html;
  }

  // ===== SHARED: render flat list (education-style) =====

  renderFlat(items) {
    return items.map(item => this.renderListItem(item)).join('');
  }

  // ===== SECTION RENDERERS =====

  // ===== NOVEL: image-based card with links below =====

  renderNovelCard(item) {
    const linksHtml = this.formatLinks(item.links || {});
    const imageHtml = item.image
      ? `<img src="images/${item.image}" alt="${item.title}" title="${item.title}" class="novel-cover" loading="lazy" onerror="this.style.display='none'">`
      : '';

    return `
      <div class="novel-card" id="${item.id}">
        ${imageHtml}
        ${linksHtml ? `<div class="novel-links">${linksHtml}</div>` : ''}
      </div>
    `;
  }

  renderCoverOnly(item) {
    const imageHtml = item.image
      ? `<img src="images/${item.image}" alt="${item.title}" title="${item.title}" class="novel-cover" loading="lazy" onerror="this.style.display='none'">`
      : '';

    return `
      <div class="novel-card" id="${item.id}">
        ${imageHtml}
      </div>
    `;
  }

  renderAllNovels() {
    const grouped = {};
    const categoriesInOrder = [];

    this.novels.forEach(item => {
      const cat = item.category || 'Other';
      if (!grouped[cat]) {
        grouped[cat] = [];
        categoriesInOrder.push(cat);
      }
      grouped[cat].push(item);
    });

    let html = '';
    categoriesInOrder.forEach(cat => {
      const catItems = grouped[cat];
      if (catItems && catItems.length > 0) {
        html += `<div class="year-group" id="cat-${cat.replace(/\s+/g, '-')}">`;
        html += `<h3 class="year-title">${cat}</h3>`;
        html += `<div class="novel-grid">`;
        catItems.forEach(item => {
          html += this.renderNovelCard(item);
        });
        html += '</div></div>';
      }
    });
    return html;
  }

  renderAllModels() {
    return this.renderGrouped(this.models, 'category');
  }

  renderAllCars() {
    return this.renderGrouped(this.cars, 'category');
  }

  renderAllWatches() {
    return this.renderGrouped(this.watches, 'category');
  }

  renderAllMovies() {
    let html = '<div class="novel-grid">';
    this.movies.forEach(item => {
      html += this.renderCoverOnly(item);
    });
    html += '</div>';
    return html;
  }

  renderAllLego() {
    return this.renderFlat(this.lego);
  }

  renderAllGames() {
    let html = '<div class="novel-grid">';
    this.games.forEach(item => {
      html += this.renderNovelCard(item);
    });
    html += '</div>';
    return html;
  }

  renderAllTvshows() {
    let html = '<div class="novel-grid">';
    this.tvshows.forEach(item => {
      html += this.renderCoverOnly(item);
    });
    html += '</div>';
    return html;
  }
}

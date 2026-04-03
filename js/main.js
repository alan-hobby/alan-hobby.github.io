/**
 * Main application coordinator
 */

import { dataLoader } from './data.js';
import { Renderer } from './renderers.js';

class WebsiteApp {
  constructor() {
    this.data = null;
    this.renderer = null;
    this.isInitialized = false;
  }

  async init() {
    try {
      this.data = await dataLoader.loadAllData();
      this.renderer = new Renderer(this.data);
      this.renderContent();
      this.setupEventListeners();
      this.updateCurrentYear();
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize website:', error);
      this.showError('Failed to load website content. Please try again later.');
    }
  }

  renderContent() {
    // Grouped sections (publication-style)
    this.renderSection('novelsContainer', this.data.novels, () => this.renderer.renderAllNovels());
    this.renderSection('modelsContainer', this.data.models, () => this.renderer.renderAllModels());
    this.renderSection('carsContainer', this.data.cars, () => this.renderer.renderAllCars());
    this.renderSection('watchesContainer', this.data.watches, () => this.renderer.renderAllWatches());
    this.renderSection('moviesContainer', this.data.movies, () => this.renderer.renderAllMovies());
    // Flat sections (education-style)
    this.renderSection('legoContainer', this.data.lego, () => this.renderer.renderAllLego());
    this.renderSection('gamesContainer', this.data.games, () => this.renderer.renderAllGames());
    this.renderSection('tvshowsContainer', this.data.tvshows, () => this.renderer.renderAllTvshows());
  }

  renderSection(containerId, data, renderFn) {
    const container = document.getElementById(containerId);
    if (!container || !this.renderer) return;
    if (data && data.length > 0) {
      container.innerHTML = renderFn();
    } else {
      container.innerHTML = '<p class="no-data">No data found.</p>';
    }
  }

  setupEventListeners() {
    const navToggle = document.getElementById('navToggle');
    const navbarMenu = document.getElementById('navbarMenu');

    if (navToggle && navbarMenu) {
      navToggle.addEventListener('click', () => {
        navbarMenu.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', navbarMenu.classList.contains('active'));
      });
    }

    document.addEventListener('click', (event) => {
      if (navbarMenu && navbarMenu.classList.contains('active') &&
          !navbarMenu.contains(event.target) && !navToggle.contains(event.target)) {
        navbarMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
      window.addEventListener('scroll', () => {
        backToTop.classList.toggle('visible', window.pageYOffset > 300);
      });
      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') === '#') return;
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          if (navbarMenu && navbarMenu.classList.contains('active')) {
            navbarMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
          }
          window.scrollTo({ top: targetElement.offsetTop - 80, behavior: 'smooth' });
          history.pushState(null, null, targetId);
        }
      });
    });
  }

  updateCurrentYear() {
    const el = document.getElementById('currentYear');
    if (el) el.textContent = new Date().getFullYear();
  }

  showError(message) {
    const div = document.createElement('div');
    div.className = 'error-message';
    div.innerHTML = `<div class="error-content"><i class="fas fa-exclamation-triangle"></i><p>${message}</p></div>`;
    document.body.prepend(div);
    setTimeout(() => div.remove(), 5000);
  }
}

const app = new WebsiteApp();

export function initWebsite() {
  app.init();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => app.init());
} else {
  app.init();
}

/**
 * Data loading and caching
 */

import { DATA_PATHS } from './config.js';

class DataLoader {
  constructor() {
    this.cache = new Map();
  }

  async fetchJSON(url) {
    if (this.cache.has(url)) {
      return this.cache.get(url);
    }
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      this.cache.set(url, data);
      return data;
    } catch (error) {
      console.error(`Error fetching ${url}:`, error);
      throw error;
    }
  }

  async loadAllData() {
    try {
      const collections = await this.fetchJSON(DATA_PATHS.collections);
      return {
        novels: collections.novels || [],
        models: collections.models || [],
        lego: collections.lego || [],
        cars: collections.cars || [],
        watches: collections.watches || [],
        games: collections.games || [],
        movies: collections.movies || [],
        tvshows: collections.tvshows || []
      };
    } catch (error) {
      console.error('Error loading data files:', error);
      return {
        novels: [], models: [], lego: [], cars: [],
        watches: [], games: [], movies: [], tvshows: []
      };
    }
  }
}

export const dataLoader = new DataLoader();

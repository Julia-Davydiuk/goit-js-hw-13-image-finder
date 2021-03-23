const BASE_URL = 'https://pixabay.com/api/';
const key = '20800579-f7c0bb28a4e2ffd48417d472c';

export default  {
  searchQuery:  '',
  page: 1,
  perPage: 12,
    
  async fetchImages() {
    const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=${this.perPage}&key=${key}`;
    
    const response = await fetch(url);
    return response.json().then(({ hits }) => {
      this.incrementPage();
      return hits;
    });
  },

    incrementPage() {
      this.page += 1;
    },

    resetPage() {
      this.page = 1;
    },

    get query() {
      return this.searchQuery;
    },

    set query(value) {
      this.searchQuery = value;
    },
  };
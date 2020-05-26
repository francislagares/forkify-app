import axios from 'axios';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    try {
      const res = await axios(
        `${proxy}https://forkify-api.herokuapp.com/api/search?q=${this.query}`
      );
      this.results = res.data.recipes;
    } catch (err) {
      console.log(err);
    }
  }
}

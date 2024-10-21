import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TmdbService {
  private readonly apiUrl = 'https://api.themoviedb.org/3';
  private readonly apiKey = 'ccd41c052dfd78b71ba8ddd27618e3a9';  // Replace with your TMDB API key

  async fetchMovies(): Promise<any> {
    const response = await axios.get(`${this.apiUrl}/movie/popular?api_key=${this.apiKey}`);
    return response.data.results;
  }

  async fetchGenres(): Promise<any> {
    const response = await axios.get(`${this.apiUrl}/genre/movie/list?api_key=${this.apiKey}`);
    return response.data.genres;
  }
}

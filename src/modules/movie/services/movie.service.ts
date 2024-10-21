import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../entities/movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async findAll(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  async findOne(id: any): Promise<Movie> {
    return this.movieRepository.findOne(id);
  }

  async create(movieData: Partial<Movie>): Promise<Movie> {
    const movie = this.movieRepository.create(movieData);
    return this.movieRepository.save(movie);
  }

  async update(id: number, movieData: Partial<Movie>): Promise<void> {
    await this.movieRepository.update(id, movieData);
  }

  async delete(id: number): Promise<void> {
    await this.movieRepository.delete(id);
  }
}

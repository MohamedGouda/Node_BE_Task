import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { MovieService } from '../services/movie.service';
import { Movie } from '../entities/movie.entity';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  findAll(): Promise<Movie[]> {
    return this.movieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Movie> {
    return this.movieService.findOne(id);
  }

  @Post()
  create(@Body() movieData: Partial<Movie>): Promise<Movie> {
    return this.movieService.create(movieData);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() movieData: Partial<Movie>): Promise<void> {
    return this.movieService.update(id, movieData);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.movieService.delete(id);
  }
}

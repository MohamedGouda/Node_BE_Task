import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Movie } from '../entities/movie.entity';
import { Repository } from 'typeorm';
import { MovieService } from '../services/movie.service';

const mockMovie = {
  id: 1,
  title: 'Test Movie',
  overview: 'Test Overview',
  releaseDate: '2021-01-01',
  rating: 4.5,
  genre: 'Action',
};

describe('MovieService', () => {
  let service: MovieService;
  let repository: Repository<Movie>;

  const mockMovieRepository = {
    find: jest.fn().mockResolvedValue([mockMovie]),
    findOne: jest.fn().mockResolvedValue(mockMovie),
    save: jest.fn().mockResolvedValue(mockMovie),
    create: jest.fn().mockReturnValue(mockMovie),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        {
          provide: getRepositoryToken(Movie),
          useValue: mockMovieRepository,
        },
      ],
    }).compile();

    service = module.get<MovieService>(MovieService);
    repository = module.get<Repository<Movie>>(getRepositoryToken(Movie));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a list of movies', async () => {
    const movies = await service.findAll();
    expect(movies).toEqual([mockMovie]);
  });

  it('should return a single movie', async () => {
    const movie = await service.findOne(1);
    expect(movie).toEqual(mockMovie);
  });

  it('should create a new movie', async () => {
    const newMovie = await service.create(mockMovie);
    expect(newMovie).toEqual(mockMovie);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { Movie } from '../entities/movie.entity';
import { MovieController } from '../controllers/movie.controller';
import { MovieService } from '../services/movie.service';

const mockMovie = {
  id: 1,
  title: 'Test Movie',
  overview: 'Test Overview',
  releaseDate: '2021-01-01',
  rating: 4.5,
  genre: 'Action',
};

describe('MovieController', () => {
  let controller: MovieController;
  let service: MovieService;

  const mockMovieService = {
    findAll: jest.fn().mockResolvedValue([mockMovie]),
    findOne: jest.fn().mockResolvedValue(mockMovie),
    create: jest.fn().mockResolvedValue(mockMovie),
    update: jest.fn().mockResolvedValue(null),
    delete: jest.fn().mockResolvedValue(null),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [
        {
          provide: MovieService,
          useValue: mockMovieService,
        },
      ],
    }).compile();

    controller = module.get<MovieController>(MovieController);
    service = module.get<MovieService>(MovieService);
  });

  it('should return a list of movies', async () => {
    const movies = await controller.findAll();
    expect(movies).toEqual([mockMovie]);
  });

  it('should return a single movie', async () => {
    const movie = await controller.findOne(1);
    expect(movie).toEqual(mockMovie);
  });

  it('should create a new movie', async () => {
    const newMovie = await controller.create(mockMovie);
    expect(newMovie).toEqual(mockMovie);
  });
});

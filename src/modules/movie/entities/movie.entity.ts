import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  overview: string;

  @Column()
  releaseDate: string;

  @Column()
  rating: number;

  @Column()
  genre: string;
}

import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Entity, Column, ManyToMany } from 'typeorm';
import { Movie } from './movie.entity';

@Entity(
  { name: 'actor' }
)
@ObjectType()
export class Actor {
  @Field(type => Int)
  @Column(
    {
      primary: true
    }
  )
  id: number;

  @Field()
  @Column()
  adult: boolean;

  @Field()
  @Column()
  gender: number;


  @Column()
  known_for_department: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  original_name: string;

  @Field(
    type => Float,
  )
  @Column(
    { type: 'float' }
  )
  popularity: number;

  @Field()
  @Column(
    {
      nullable: true
    }
  )
  profile_path: string;

  @Field()
  @Column()
  cast_id: number;

  @Field()
  @Column()
  character: string;

  @Field()
  @Column()
  credit_id: string;

  @Field()
  @Column()
  order: number;

  @Field(
    type => [Movie],
    { nullable: true }
  )
  @ManyToMany(() => Movie, { cascade: true })
  movies: Movie[];
}

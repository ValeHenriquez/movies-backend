import { Resolver, Query, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { MoviesService } from './movies.service';
import { Actor, Genre, Movie } from './entities';
import { FetchMoviesArgs } from './dto/fetch-movies.input';

@Resolver(() => Movie)
export class MoviesResolver {
  constructor(
    private readonly movieService: MoviesService,
  ) { }

  @Query(() => [Movie], { name: 'movies' })
  async getMovies(@Args() args: FetchMoviesArgs) {
    return await this.movieService.findAll(args);
  }

  @Query(() => [Movie])
  async searchMovies(@Args('query') query: string): Promise<Movie[]> {
    return await this.movieService.searchMovies(query);
  }

  @Query(() => Int, { name: 'moviesCount' })
  async getCount() {
    return await this.movieService.getCount();
  }

  @Query(() => Movie, { name: 'getMovieByID' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.movieService.findOne(id);
  }

  @ResolveField('genres', () => [Genre])
  async genres(@Parent() movie: Movie) {
    return await this.movieService.findGenresByMovieId(movie.id);
  }

  @ResolveField('actors', () => [Actor])
  async actors(@Parent() movie: Movie) {
    return await this.movieService.findActorByMovieId(movie.id);
  }
}



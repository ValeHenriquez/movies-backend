import { Inject, Injectable } from '@nestjs/common';
import { CreatePlaylistInput } from './dto/create-playlist.input';
import { UpdatePlaylistInput } from './dto/update-playlist.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie, Playlist, User } from './entities';
import { Repository } from 'typeorm';
import { InsertMoviePlaylistInput } from './dto/insert-movie-playlist.input';
import { MoviesService } from './movies.service';


@Injectable()
export class PlaylistService {

  constructor(
    @InjectRepository(Playlist) private playlistRepository: Repository<Playlist>,

    private movieService: MoviesService,

  ) { }

  //*******Para testear el microservicio********
  async findAll(): Promise<Playlist[]> {
    return this.playlistRepository.find()
  }

  async forEach(userId: string) {
    return this.playlistRepository.find({
      where: { userId: userId },
      relations: ['movies'],
    });
  }


  //TODO:  verificar si existe el user
  async addPlaylist(userId: string, createPlaylistInput: CreatePlaylistInput) {

    const { moviesIds } = createPlaylistInput;

    let movies: Movie[];
    if (moviesIds) {
      movies = await this.movieService.findMoviesByMoviesIds(moviesIds);
    }
    const playlistData = {
      title: createPlaylistInput.title,
      description: createPlaylistInput.description,
      userId: userId,
      movies: movies,
    }
    const playlist = this.playlistRepository.create(playlistData);
    return await this.playlistRepository.save(playlist);
  }

  async insertMoviePlaylist(insertMoviePlaylistInput: InsertMoviePlaylistInput) {
    const { playlistId, moviesIds } = insertMoviePlaylistInput;
    const playlist = await this.playlistRepository.findOne({
      where: { id: playlistId },
      relations: ['movies'],
    });
    const movies = await this.movieService.findMoviesByMoviesIds(moviesIds);

    playlist.movies = [...playlist.movies, ...movies];

    return await this.playlistRepository.save(playlist);
  }

  async findPlaylistsByUser(userId: string) {
    return await this.playlistRepository.find({
      where: { userId: userId },
      relations: ['movies'],
    });
  }

  async updatePlaylist(updatePlaylistInput: UpdatePlaylistInput) {
    const { id, title, description, moviesIds } = updatePlaylistInput;
    const playlist = await this.playlistRepository.findOne({
      where: { id },
      relations: ['movies'],
    });

    playlist.title = title;
    playlist.description = description;
    if (moviesIds) {
      const movies = await this.movieService.findMoviesByMoviesIds(moviesIds);
      playlist.movies = movies;
    }

    return await this.playlistRepository.save(playlist);
  }

  async removePlaylist(id: string) {
    const playlist = await this.playlistRepository.findOne({
      where: { id },
      relations: ['movies'],
    });
    if (!playlist) {
      throw new Error(`Playlist not found`);
    }
    return await this.playlistRepository.remove(playlist);
  }
}
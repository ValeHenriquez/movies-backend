import { Resolver, Query, Mutation, Args, Context, ResolveField, Parent } from '@nestjs/graphql';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistInput } from './dto/create-playlist.input';
import { UpdatePlaylistInput } from './dto/update-playlist.input';
import { InsertMoviePlaylistInput } from './dto/insert-movie-playlist.input';
import { Movie, Playlist, User } from './entities';
import { CurrentUser } from './dto/current-user.decorator';

@Resolver(() => Playlist)
export class PlaylistResolver {
  constructor(private readonly playlistService: PlaylistService) { }

  //*******Para testear el microservicio********
  @ResolveField(() => User)
  user(@Parent() playlist: Playlist): any {
    return { __typename: 'User', id: playlist.userId }
  }

  @Query(() => [Playlist], { name: 'playlists' })
  findAll() {
    return this.playlistService.findAll();
  }


  @Mutation(() => Playlist, { name: 'addPlaylist' })
  async addPlaylist(@CurrentUser() user, @Args('createPlaylistInput') createPlaylistInput: CreatePlaylistInput) {
    const userId = user.id;
    return await this.playlistService.addPlaylist(userId, createPlaylistInput);
  }

  @Mutation(() => Playlist, { name: 'insertMoviePlaylist' })
  async insertMoviePlaylist(@Args('insertMoviePlaylistInput') insertMoviePlaylistInput: InsertMoviePlaylistInput) {
    return await this.playlistService.insertMoviePlaylist(insertMoviePlaylistInput);
  }

  @Query(() => [Playlist], { name: 'playlistsByUser' })
  async findPlaylistsByUser(@CurrentUser() user) {
    const userId = user.id;
    return await this.playlistService.findPlaylistsByUser(userId);
  }

  @Mutation(() => Playlist, { name: 'updatePlaylist' })
  async updatePlaylist(@Args('updatePlaylistInput') updatePlaylistInput: UpdatePlaylistInput) {
    return await this.playlistService.updatePlaylist(updatePlaylistInput);
  }
  @Mutation(() => Playlist, { name: 'removePlaylist' })
  async removePlaylist(@Args('id', { type: () => String }) id: string) {
    return await this.playlistService.removePlaylist(id);
  }
}

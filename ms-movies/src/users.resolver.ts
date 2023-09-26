import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Playlist, User } from "./entities";
import { PlaylistService } from "./playlist.service";



@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly playlistsService: PlaylistService) { }

    @ResolveField(() => [Playlist])
    playlists(@Parent() user: User) {
        return this.playlistsService.forEach(user.id);
    }


}
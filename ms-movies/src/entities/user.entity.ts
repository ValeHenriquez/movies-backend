import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";
import { Playlist } from "../entities";

@ObjectType()
@Directive('@key(fields: "id")')
export class User {
    @Field(() => ID)
    id: string

    @Field(() => [Playlist])
    playlists?: Playlist[]
}
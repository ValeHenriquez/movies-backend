import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class InsertMoviePlaylistInput {
    @Field()
    playlistId: string;

    @Field(
        type => [Int],
    )
    moviesIds: number[];
}
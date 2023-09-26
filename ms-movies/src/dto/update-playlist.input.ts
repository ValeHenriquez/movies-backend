import { CreatePlaylistInput } from './create-playlist.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePlaylistInput extends PartialType(CreatePlaylistInput) {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(
    type => [Int],
    {
      nullable: true,

    }
  )
  moviesIds?: number[];
}

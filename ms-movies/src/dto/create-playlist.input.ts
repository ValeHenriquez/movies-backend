import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePlaylistInput {
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

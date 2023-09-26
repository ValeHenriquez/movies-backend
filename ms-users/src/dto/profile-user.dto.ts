import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ProfileUserDto {

    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    password: string;
}
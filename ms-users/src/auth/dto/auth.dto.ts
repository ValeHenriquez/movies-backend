import { ObjectType, Field, InputType } from "@nestjs/graphql";
import { User } from "../../entities/user.entity";

@InputType()
export class LoginInput {
    @Field()
    email: string;

    @Field()
    password: string;
}


@ObjectType()
export class LoginResponse {

    @Field(() => String)
    token: string;

    @Field(() => User)
    user: User;
}

@InputType()
export class SignUpInput {
    @Field()
    email: string;

    @Field()
    password: string;

    @Field()
    name: string;
}

export interface JwtPayload {
    email: string;
    name: string;
}
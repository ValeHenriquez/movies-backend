import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput, LoginResponse, SignUpInput } from './dto/auth.dto';
import { User } from "../entities/user.entity";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(() => LoginResponse)
  async login(@Args('loginInput') loginInput: LoginInput): Promise<LoginResponse> {
    return await this.authService.login(loginInput);
  }

  @Mutation(() => LoginResponse)
  async refreshToken(@Args('token') token: string): Promise<LoginResponse> {
    return await this.authService.refreshToken(token);
  }

  @Mutation((
  ) => User)
  async signup(@Args('signUpInput') signUpInput: SignUpInput): Promise<User> {
    return await this.authService.signup(signUpInput);
  }
}

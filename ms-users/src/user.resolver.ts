import { Args, Context, Int, Mutation, Query, ResolveReference, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ProfileUserDto } from './dto/profile-user.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { CurrentUser } from './auth/dto/current-user.decorator';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Query(() => [User], { name: 'users' })
  async findAll() {
    return await this.userService.findAll();
  }

  @Query(() => User, { name: 'usersById' })
  async findOne(@Args('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Mutation(() => User)
  async updateUser(@CurrentUser() user, @Args('updateUserInput') updateUserInput: UpdateUserInput) {
    const userId = user.id;
    return await this.userService.update(userId, updateUserInput);
  }

  @Query(() => User, { name: 'profile' })
  async profile(@CurrentUser() user): Promise<ProfileUserDto> {
    const userId = user.id;
    return await this.userService.findOne(userId);
  }
}

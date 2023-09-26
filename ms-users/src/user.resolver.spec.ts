import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { User } from './entities';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ProfileUserDto } from './dto/profile-user.dto';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserResolver,
        {
          provide: UserService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn()
          }
        }],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const expectedResult: User[] = []; // Add expected user data here
      jest.spyOn(userService, 'findAll').mockResolvedValue(expectedResult);

      const result = await resolver.findAll();

      expect(result).toEqual(expectedResult);
      expect(userService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user based on the provided ID', async () => {
      const userId = '1'; // Add a valid user ID here
      const expectedResult: User = {
        id: userId,
        name: 'John Doe',
        email: 'johndoe@example.com'
        ,
        password: '',
        encryptPassword: function (password: string): void {
          throw new Error('Function not implemented.');
        },
        validatePassword: function (password: string): boolean {
          throw new Error('Function not implemented.');
        },
        getInfoToToken: function (): { name: string; email: string; } {
          throw new Error('Function not implemented.');
        }
      };

      jest.spyOn(userService, 'findOne').mockResolvedValue(expectedResult);

      const result = await resolver.findOne(userId);

      expect(result).toEqual(expectedResult);
      expect(userService.findOne).toHaveBeenCalledWith(userId);
    });
  });


  describe('updateUser', () => {
    it('should update and return the updated user', async () => {
      const userId = '1'; // Add a valid user ID here
      const updateUserInput: UpdateUserInput = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'newpassword123'
      };
      const expectedResult: User = {
        id: userId,
        name: 'John Doe',
        email: 'johndoe@example.com'
        // Add other expected user data here
        ,
        password: '',
        encryptPassword: function (password: string): void {
          throw new Error('Function not implemented.');
        },
        validatePassword: function (password: string): boolean {
          throw new Error('Function not implemented.');
        },
        getInfoToToken: function (): { name: string; email: string; } {
          throw new Error('Function not implemented.');
        }
      };

      jest.spyOn(userService, 'update').mockResolvedValue(expectedResult);

      const result = await resolver.updateUser(userId, updateUserInput);

      expect(result).toEqual(expectedResult);
      expect(userService.update).toHaveBeenCalledWith(userId, updateUserInput);
    });
  });


  describe('profile', () => {
    it('should return the profile of the user based on the provided ID', async () => {
      const userId = '1'; // Add a valid user ID here
      const expectedResult: ProfileUserDto = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123'
      }; // Add expected profile data here
      jest.spyOn(userService, 'findOne').mockResolvedValue(expectedResult);

      const result = await resolver.profile(userId);

      expect(result).toEqual(expectedResult);
      expect(userService.findOne).toHaveBeenCalledWith(userId);
    });
  });
});

import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { ProfileUserDto } from './dto/profile-user.dto';
import { User } from './entities';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>
    ) { }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(id: string): Promise<ProfileUserDto> {
        const user = await this.userRepository.findOne(
            {
                where: { id: id }
            }
        );

        return user;
    }

    async update(id: string, updateUserInput: UpdateUserInput) {
        const user = await this.userRepository.findOne({
            where: { id: id }
        });
        if (!user) {
            throw new Error(`User not found`);
        }
        user.name = updateUserInput.name;
        user.email = updateUserInput.email;
        user.password = updateUserInput.password;
        return await this.userRepository.save(user);
    }

    async findByEmail(email: string) {
        const user = await this.userRepository.findOne({
            where: {
                email: email
            }
        });

        if (!user) return null;

        return user;
    }

    async create(createUserInput: CreateUserInput) {
        const exists = await this.findByEmail(createUserInput.email);
        if (exists) throw new Error('User already exists');

        const user = this.userRepository.create(createUserInput);
        user.encryptPassword(createUserInput.password);
        return await this.userRepository.save(user);
    }
}

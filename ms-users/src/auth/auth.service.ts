import { Injectable } from '@nestjs/common';
import { User } from "../entities/user.entity";
import { JwtPayload, LoginInput, SignUpInput } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user.service';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) { }

    async login(loginInput: LoginInput) {
        const user = await this.usersService.findByEmail(loginInput.email);
        if (!user) {
            throw new Error('Invalid Credentials');
        }
        if (!user.validatePassword(loginInput.password)) {
            throw new Error('Invalid Credentials');
        }
        const token = this.jwtService.sign(user.getInfoToToken(), { expiresIn: '1d', secret: process.env.JWT_SECRET });
        return {
            token: token,
            user: user
        }
    }

    async refreshToken(token: string): Promise<any> {
        const user = await this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
        const newToken = this.jwtService.sign(user, { expiresIn: '1d', secret: process.env.JWT_SECRET });
        return {
            token: newToken,
            user: user
        }
    }

    async signup(signUpInput: SignUpInput): Promise<User> {
        const userExist = await this.usersService.findByEmail(signUpInput.email);

        if (userExist) {
            throw new Error('Invalid Credentials');
        }

        return await this.usersService.create(signUpInput);
    }

    async validateUser(payload: JwtPayload): Promise<User> {
        const user = await this.usersService.findByEmail(payload.email);
        if (!user) throw new Error('Invalid User');
        return user;
    }
}

import { ObjectType, Field, Int, Directive, ID } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity(
    { name: 'users' }
)
@ObjectType()
@Directive('@key(fields: "id")')
export class User {

    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column()
    @Field()
    name: string;

    @Column()
    @Field()
    email: string;

    @Column()
    @Field()
    password: string;


    encryptPassword(password: string) {
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(password, salt);
    }

    validatePassword(password: string): boolean {
        return bcrypt.compareSync(password, this.password);
    }

    getInfoToToken() {
        return {
            id: this.id,
            name: this.name,
            email: this.email
        }
    }
}

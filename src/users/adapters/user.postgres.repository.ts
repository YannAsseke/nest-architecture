import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "../domain/repository/user.repository";
import { User } from "../domain/entities/user.entity";
import { Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "../domain/dtos/createuser.dto";
import { UpdateUserDto } from "../domain/dtos/updateuser.dto";
import * as bcrypt from 'bcrypt';

export class UserPostgresRepository implements UserRepository{
    constructor(
        @InjectRepository(User) private readonly userRepository : Repository<User>
    ){}

    async getAllUsers(): Promise<User[]> {

        try {
            return this.userRepository.find()
        } catch (error) {
            return error.message
        }
    }

    async getOneUser(id: number): Promise<User | null> {
        const user_find = this.userRepository.findOneBy({id})

        if(!user_find){
            throw new NotFoundException;
        }

        try {
            return user_find;
        } catch (error) {
            return error.message
        }

    }

    async createUser(body : CreateUserDto) : Promise<User> {
        try {
            const hashpassword = await bcrypt.hash(body.password, 12);
            body.password = hashpassword;
          return this.userRepository.save(body)  
        } catch (error) {
            return error.message
        }
    }

    async updateUser(id: number, body: UpdateUserDto): Promise<User | null> {
        const user_find = await this.getOneUser(id)

        if(!user_find){
            throw new NotFoundException;
        }

        try {
            return this.userRepository.save({...user_find, ...body})
        } catch (error) {
           return error.message 
        }
    }

    async deleteUser(id: number): Promise<boolean> {
        const user_find = await this.getOneUser(id)

        if(!user_find){
            throw new NotFoundException;
        }
        try {
            this.userRepository.delete(id)
            return true;
        } catch (error) {
            return error.message
        }
    }
}
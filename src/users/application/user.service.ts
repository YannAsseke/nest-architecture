import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../domain/entities/user.entity";
import { UserRepository } from "../domain/repository/user.repository";
import { CreateUserDto } from "../domain/dtos/createuser.dto";
import { UpdateUserDto } from "../domain/dtos/updateuser.dto";
import { UserPostgresRepository } from "../adapters/user.postgres.repository";

@Injectable()
export class UserService {
    constructor(
        @Inject(UserPostgresRepository) private readonly userRepository : UserRepository
    ){}

    async getAllUsers() : Promise<User[]>{
        return this.userRepository.getAllUsers();
    }

    async getOneUser(id : number) : Promise<User | null>{
        return this.userRepository.getOneUser(id)
    }

    async createUser(body : CreateUserDto) : Promise<User> {
        return this.userRepository.createUser(body)
    }

    async updateUser(id : number, body : UpdateUserDto) : Promise<User | null>{
        return this.userRepository.updateUser(id, body)
    }

    async deleteUser(id : number) : Promise<boolean> {
        return this.userRepository.deleteUser(id)
    }
}
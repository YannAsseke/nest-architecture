import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { UserRepositoryPort } from "../ports/user.repository.port";
import { CreateUserDto } from "../../interfaces/dtos/createuser.dto";
import { UpdateUserDto } from "../../interfaces/dtos/updateuser.dto";
import { UserPostgresRepository } from "../../infrastructure/repository/user.postgres.repository";
import { UserMapper } from "src/users/infrastructure/mappers/user.mapper";
import { UserServicePort } from "../ports/user.service.port";

@Injectable()
export class UserService implements UserServicePort{
    constructor(
        private readonly userRepositoryPort : UserRepositoryPort,
    ){}

    async getAllUsers() : Promise<User[]>{
        return this.userRepositoryPort.getAllUsers();
    }

    async getOneUser(id : number) : Promise<User | null>{
        return this.userRepositoryPort.getOneUser(id)
    }

    async createUser(body : User) : Promise<User> {
        return this.userRepositoryPort.createUser(body)
    }

    async updateUser(body : User) : Promise<User | null>{
        return this.userRepositoryPort.updateUser(body)
    }

    async deleteUser(id : number) : Promise<boolean> {
        return this.userRepositoryPort.deleteUser(id)
    }
}
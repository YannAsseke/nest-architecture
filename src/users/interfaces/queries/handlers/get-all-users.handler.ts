import { Injectable } from "@nestjs/common";
import { getAllUsersQuery } from "../queries/get-all-users.query";
import {IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/users/domain/entities/user.entity";
import { UserRepositoryPort } from "src/users/domain/ports/user.repository.port";

@Injectable()
@QueryHandler(getAllUsersQuery)
export class GetAllUsersHandler implements IQueryHandler<getAllUsersQuery>{
    constructor(
        private readonly userRepositoryPort : UserRepositoryPort
    ){}

    async execute() : Promise<User[]> {
         return this.userRepositoryPort.getAllUsers()
    }
}
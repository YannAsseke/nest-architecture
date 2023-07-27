import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { getOneUserQuery } from "../queries/get-one-user.query";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/users/domain/entities/user.entity";
import { UserRepositoryPort } from "src/users/domain/ports/user.repository.port";
import { UserMapper } from "src/users/infrastructure/mappers/user.mapper";

@Injectable()
@QueryHandler(getOneUserQuery)
export class GetOneUserHandler implements IQueryHandler<getOneUserQuery>{
    constructor(
        private readonly userRepositoryPort : UserRepositoryPort
    ){}

    async execute(query : getOneUserQuery) : Promise<User | null>{
        const {id} = query
        const user_find = await this.userRepositoryPort.getOneUser(id)
        if(!user_find){
            throw new NotFoundException
        }
        return UserMapper.toDomainFromPersistance(user_find);
        
    }
}
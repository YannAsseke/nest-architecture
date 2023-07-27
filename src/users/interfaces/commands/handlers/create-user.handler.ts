import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { createUserCommand } from "../commands/create-user.command";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/domain/entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { UserService } from "src/users/domain/application/user.service";
import { UserMapper } from "src/users/infrastructure/mappers/user.mapper";
import { CreateUserDto } from "../../dtos/createuser.dto";
import { UserRepositoryPort } from "src/users/domain/ports/user.repository.port";

@Injectable()
@CommandHandler(createUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserDto>{
    constructor(
        private readonly userRepositoryPort : UserRepositoryPort
    ){}

    async execute(data): Promise<CreateUserDto> {
        const {body} = data
        const user = UserMapper.toDomainFromDto(body)
        const savedUserEntity = await this.userRepositoryPort.createUser(user)
        return UserMapper.toDtoFromDomain(savedUserEntity)
    }
}
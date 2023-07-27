import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { updateUserCommand } from "../commands/update-user.command";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/domain/entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { UserService } from "src/users/domain/application/user.service";
import { UserRepositoryPort } from "src/users/domain/ports/user.repository.port";
import { UserMapper } from "src/users/infrastructure/mappers/user.mapper";
import { UpdateUserDto } from "../../dtos/updateuser.dto";
import { CreateUserDto } from "../../dtos/createuser.dto";

@Injectable()
@CommandHandler(updateUserCommand)
export class UpdateUserHandler implements ICommandHandler<updateUserCommand>{
    constructor(
        private readonly userRepositoryPort : UserRepositoryPort
    ){}

    async execute(command : updateUserCommand) {
        // const {id} = command
        // const {username, email, password} = command.body
        // const user = new User()
        // user.id = id
        // user.username = username
        // user.email = email
        // user.password = password
        // console.log(user)
        const UserEntity = UserMapper.toDomainFromDtoUpdateUser(command)
        const UpdatedUser = await this.userRepositoryPort.updateUser(UserEntity)
        return UserMapper.toDtoFromDomainUpdateUser(UpdatedUser)
    }
}
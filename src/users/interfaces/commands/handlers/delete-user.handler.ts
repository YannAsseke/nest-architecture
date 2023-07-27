import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { deleteUserCommand } from "../commands/delete-user.command";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/domain/entities/user.entity";
import { Repository } from "typeorm";
import { UserService } from "src/users/domain/application/user.service";
import { UserRepositoryPort } from "src/users/domain/ports/user.repository.port";
import { UserMapper } from "src/users/infrastructure/mappers/user.mapper";

@Injectable()
@CommandHandler(deleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<deleteUserCommand>{
    constructor(
        private readonly userRepositoryPort : UserRepositoryPort
    ){}

    async execute(command: deleteUserCommand): Promise<boolean> {
        const {id} = command
         return this.userRepositoryPort.deleteUser(id)
    }
}
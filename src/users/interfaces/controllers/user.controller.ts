import { Body, Controller, Get, Param, Post, Patch, Delete } from "@nestjs/common";
import { User } from "src/users/domain/entities/user.entity";
import { CreateUserDto } from "../dtos/createuser.dto";
import { UpdateUserDto } from "../dtos/updateuser.dto";
import { UserService } from "src/users/domain/application/user.service";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { getAllUsersQuery } from "../queries/queries/get-all-users.query";
import { getOneUserQuery } from "../queries/queries/get-one-user.query";
import { createUserCommand } from "../commands/commands/create-user.command";
import { updateUserCommand } from "../commands/commands/update-user.command";
import { deleteUserCommand } from "../commands/commands/delete-user.command";
import { CreateUserHandler } from "../commands/handlers/create-user.handler";

@Controller('users')
export class UserController {
    constructor(
        private readonly commandBus : CommandBus,
        private readonly queryBus : QueryBus
    ){}

    
    @Get()
    async getAllUsers() : Promise<User[]>{
        const query = new getAllUsersQuery()
        return this.queryBus.execute(query)
    }

    @Get(':id')
    async getOneUser(@Param('id') id : number) : Promise<User | null>{
        const query = new getOneUserQuery(id)
        return this.queryBus.execute(query)
    }


    @Post()
    async createUser(@Body() body : CreateUserDto) : Promise<CreateUserDto> {
        const command = new createUserCommand(body);
        return this.commandBus.execute(command)
    }

    @Patch(':id')
    async updateUser(@Param('id') id : number, @Body() body : UpdateUserDto) : Promise<User | null>{
        const command = new updateUserCommand(id, body)
        return this.commandBus.execute(command)
    }

    @Delete(':id')
    async deleteUser(@Param('id') id : number) : Promise<boolean>{
        const command = new deleteUserCommand(id)
        return this.commandBus.execute(command)
    }

}

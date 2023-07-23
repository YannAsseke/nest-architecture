import { Body, Controller, Get, Param, Post, Patch, Delete } from "@nestjs/common";
import { User } from "../domain/entities/user.entity";
import { CreateUserDto } from "../domain/dtos/createuser.dto";
import { UpdateUserDto } from "../domain/dtos/updateuser.dto";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {
    constructor(
        private userService : UserService
    ){}

    
    @Get()  
    async getAllUsers() : Promise<User[]>{
        return this.userService.getAllUsers()
    }

    @Get(':id')
    async getOneUser(@Param('id') id : number) : Promise<User | null>{
        return this.userService.getOneUser(id)
    }


    @Post()
    async createUser(@Body() body : CreateUserDto) : Promise<User> {
        return this.userService.createUser(body)
    }

    @Patch(':id')
    async updateUser(@Param('id') id : number, @Body() body : UpdateUserDto) : Promise<User | null>{
        return this.userService.updateUser(id , body)
    }

    @Delete(':id')
    async deleteUser(@Param('id') id : number) : Promise<boolean>{
        return this.userService.deleteUser(id)
    }

}

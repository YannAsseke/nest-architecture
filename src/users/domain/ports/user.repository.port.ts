import { CreateUserDto } from "../../interfaces/dtos/createuser.dto";
import { UpdateUserDto } from "../../interfaces/dtos/updateuser.dto";
import { User } from "../../domain/entities/user.entity";

export interface UserRepositoryPort {
    getAllUsers() : Promise <User[]>;
    getOneUser(id : number) : Promise<User | null>;
    createUser(body : CreateUserDto) : Promise<User>;
    updateUser(body : User) : Promise<User | null>;
    deleteUser(id : number) : Promise<boolean>;
}
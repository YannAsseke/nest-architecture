import { CreateUserDto } from "../dtos/createuser.dto";
import { UpdateUserDto } from "../dtos/updateuser.dto";
import { User } from "../entities/user.entity";

export interface UserRepository {
    getAllUsers() : Promise <User[]>;
    getOneUser(id : number) : Promise<User | null>;
    createUser(body : CreateUserDto) : Promise<User>;
    updateUser(id : number, body : UpdateUserDto) : Promise<User | null>;
    deleteUser(id : number) : Promise<boolean>;
}
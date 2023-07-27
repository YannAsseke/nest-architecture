import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../domain/entities/user.entity";
import { Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "../../interfaces/dtos/createuser.dto";
import { UpdateUserDto } from "../../interfaces/dtos/updateuser.dto";
import * as bcrypt from 'bcrypt';
import { UserMapper } from "../mappers/user.mapper";
import { UserRepositoryPort } from "src/users/domain/ports/user.repository.port";
import { UserPersistance } from "../persistances/entities/user.persistance.entity";

export class UserPostgresRepository implements UserRepositoryPort{
    constructor(
        @InjectRepository(UserPersistance) private readonly userRepository : Repository<UserPersistance>,
    ){}

    async getAllUsers(): Promise<User[]> {

        try {
            return this.userRepository.find()
        } catch (error) {
            return error.message
        }
    }

    async getOneUser(id: number): Promise<User | null> {
        const user_find = this.userRepository.findOneBy({id})

        if(!user_find){
            throw new NotFoundException;
        }
        try {
            return user_find;
        } catch (error) {
            return error.message
        }

    }

    async createUser(command : User) : Promise<User> {
        try {
            
            const hashpassword = await bcrypt.hash(command.password, 12);
            command.password = hashpassword;
            const userEntity = UserMapper.toPersistenceFromDomain(command)
            const savedUserEntity = await this.userRepository.save(userEntity) 
            
            return savedUserEntity

        } catch (error) {
            return error.message
        }
    }

    async updateUser(body : User): Promise<User | null> {
        
        const {id, username, email, password} = body
        const user_find = await this.getOneUser(id)
        
        if(!user_find){
            throw new NotFoundException;
        }
        const data_user = new UpdateUserDto()
        if(password){
            data_user.password = await bcrypt.hash(password, 12);
        }
        data_user.username = username
        data_user.email = email
        try {
            return this.userRepository.save({...user_find, ...data_user})
        } catch (error) {
           return error.message 
        }
    }

    async deleteUser(id: number): Promise<boolean> {
        const user_find = await this.getOneUser(id)

        if(!user_find){
            throw new NotFoundException;
        }
        try {
            this.userRepository.delete(id)
            return true;
        } catch (error) {
            return error.message
        }
    }
}
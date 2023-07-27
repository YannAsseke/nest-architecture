
import { User } from "src/users/domain/entities/user.entity";
import { UserPersistance } from "../persistances/entities/user.persistance.entity";
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/users/interfaces/dtos/createuser.dto";
import { UpdateUserDto } from "src/users/interfaces/dtos/updateuser.dto";

@Injectable()
export class UserMapper {

    static toDomainFromDto(dto : CreateUserDto ) : User{
        const {username, email, password} = dto
        const user = new User();
        user.username = username
        user.email = email
        user.password = password
        
        return user
    }

    static toDomainFromPersistance(entity : UserPersistance) : User{
        const {id, username, email, password} = entity
        const user = new User();
        user.id = id
        user.username = username
        user.email = email
        user.password = password
        return user
    }

    static toPersistenceFromDomain(domain : User) : UserPersistance {
        const userPersistance = new UserPersistance()
        userPersistance.id = domain.id;
        userPersistance.username = domain.username;
        userPersistance.email = domain.email;
        userPersistance.password = domain.password;
        return userPersistance;
    }

    static toDtoFromDomain(entity : User) {
        const dto = new CreateUserDto()
        dto.username = entity.username
        dto.email = entity.email
        dto.password = entity.password
        return dto
    }

    static toDomainFromDtoUpdateUser(dto) : User{
        const {id} = dto
        const {username, email, password} = dto.body
        const user = new User();
        user.id = id
        user.username = username
        user.email = email
        user.password = password
        return user
    }

    static toDtoFromDomainUpdateUser(entity){
        const {id} = entity
        
        const dto = new UpdateUserDto()
        dto.username = entity.username
        dto.email = entity.email
        dto.password = entity.password
        return {id , body : dto}
    }
}

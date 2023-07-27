import { CreateUserDto } from "src/users/interfaces/dtos/createuser.dto";

export class createUserCommand{
    constructor(
        public readonly body : CreateUserDto
    ){}
}
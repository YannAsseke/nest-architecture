import { UpdateUserDto } from "src/users/interfaces/dtos/updateuser.dto";

export class updateUserCommand{
    constructor(
        public readonly id : number,
        public readonly body : UpdateUserDto
    ){}
}
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto{
    
    @IsNotEmpty()
    @IsString()
    username : string

    @IsNotEmpty()
    @IsEmail()
    email : string

    @IsNotEmpty()
    password : string
}

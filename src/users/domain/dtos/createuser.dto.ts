import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto{
    
    @IsNotEmpty()
    @IsString()
    readonly username : string

    @IsNotEmpty()
    @IsEmail()
    readonly email : string

    @IsNotEmpty()
    password : string
}

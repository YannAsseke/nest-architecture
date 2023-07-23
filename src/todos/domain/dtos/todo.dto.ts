import { IsString, IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class TodoDto{
    
    @IsNotEmpty()
    @IsString()
    readonly title : string

    @IsNotEmpty()
    @IsString()
    readonly description : string

    readonly status : boolean
}

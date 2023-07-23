import { IsString, IsBoolean, IsNotEmpty, IsNumber } from "class-validator"

export class TodoUpdateDto{
    title : string
    description : string
    status : boolean
}
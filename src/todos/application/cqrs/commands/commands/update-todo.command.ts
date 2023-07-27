import { TodoUpdateDto } from "src/todos/domain/dtos/updatetodo.dto";

export class UpdateTodoCommand {
    constructor(
        public readonly id : number,
        public readonly body : TodoUpdateDto
    ){}
}
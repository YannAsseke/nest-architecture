import { TodoDto } from "src/todos/domain/dtos/todo.dto";

export class createTodoCommand {
    constructor(public readonly body : TodoDto){}
}
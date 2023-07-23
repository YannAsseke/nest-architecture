import { TodoDto } from "../dtos/todo.dto";
import { TodoUpdateDto } from "../dtos/updatetodo.dto";
import { Todo } from "../entities/todo.entity";

export interface TodoRepository{
    getAllTodos() : Promise<Todo []>;
    getOneTodo(id : number) : Promise<Todo | null>;
    createTodo(body : TodoDto) : Promise<Todo>;
    updateTodo(id : number, body : TodoUpdateDto) : Promise <Todo | null>;
    deleteTodo(id : number) : Promise<boolean>;
}
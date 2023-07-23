import { Inject, Injectable } from "@nestjs/common";
import { TodoRepository } from "../domain/repository/todo.repository";
import { Todo } from "../domain/entities/todo.entity";
import { TodoDto } from "../domain/dtos/todo.dto";
import { TodoUpdateDto } from "../domain/dtos/updatetodo.dto";
import { TodoPostgresRepository } from "../adapters/todo.postgres.repository";

@Injectable()
export class TodoServices{
    constructor(
        @Inject(TodoPostgresRepository) private readonly todoRepository : TodoRepository 
    ){}

    async getAllTodos() : Promise<Todo[]>{
        return this.todoRepository.getAllTodos();
    }

    async getOneTodo(id : number): Promise<Todo |null>{
        return this.todoRepository.getOneTodo(id)
    }

    async createTodo(body : TodoDto) : Promise<Todo>{
        return this.todoRepository.createTodo(body)
    }

    async updateTodo (id : number, body : TodoUpdateDto) : Promise<Todo | null> {
        return this.todoRepository.updateTodo(id, body)
    }

    async deleteTodo (id : number) : Promise<boolean>{
        return this.todoRepository.deleteTodo(id)
    }
}
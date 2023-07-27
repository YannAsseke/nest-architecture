import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { getAllTodosQuery } from "../queries/get-all-todos.query";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Todo } from "src/todos/domain/entities/todo.entity";
import { Repository } from "typeorm";
import { getOneTodoQuery } from "../queries/get-one-todo.query";

@Injectable()
@QueryHandler(getOneTodoQuery)
export class getOneTodoHandler implements IQueryHandler<getOneTodoQuery>{
    constructor(
        @InjectRepository(Todo)
        private readonly todoRepository : Repository<Todo>
    ){}

    async execute(query : getOneTodoQuery) : Promise<Todo | null>{
        const { id } = query;
        const todo_find = await this.todoRepository.findOneBy({id})
        if(!todo_find){
            throw new NotFoundException;
        }
        try {
            return todo_find
        } catch (error) {
            return error.message
        }
    }
}
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { getAllTodosQuery } from "../queries/get-all-todos.query";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Todo } from "src/todos/domain/entities/todo.entity";
import { Repository } from "typeorm";

@Injectable()
@QueryHandler(getAllTodosQuery)
export class getAllTodosHandler implements IQueryHandler<getAllTodosQuery>{
    constructor(
        @InjectRepository(Todo)
        private readonly todoRepository : Repository<Todo>
    ){}

    async execute(query : getAllTodosQuery) : Promise<Todo[]>{
        try {
            return this.todoRepository.find()
        } catch (error) {
            return error.message
        }
    }
}
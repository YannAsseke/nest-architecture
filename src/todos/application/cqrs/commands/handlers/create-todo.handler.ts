import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { createTodoCommand } from "../commands/create-todo.command";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Todo } from "src/todos/domain/entities/todo.entity";
import { Repository } from "typeorm";

@Injectable()
@CommandHandler(createTodoCommand)
export class createTodoHandler implements ICommandHandler<createTodoCommand>{
    constructor(
        @InjectRepository(Todo)
        private readonly todoRepository : Repository<Todo>,
    ){}

    async execute(command : createTodoCommand) : Promise<Todo>{
        const {body} = command
        try {
            return this.todoRepository.save(body)
        } catch (error) {
            return error.message
        }
    }
}
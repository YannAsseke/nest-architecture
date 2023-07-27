import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { createTodoCommand } from "../commands/create-todo.command";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Todo } from "src/todos/domain/entities/todo.entity";
import { Repository } from "typeorm";
import { UpdateTodoCommand } from "../commands/update-todo.command";

@Injectable()
@CommandHandler(UpdateTodoCommand)
export class updateTodoHandler implements ICommandHandler<UpdateTodoCommand>{
    constructor(
        @InjectRepository(Todo)
        private readonly todoRepository : Repository<Todo>,
    ){}

    async execute(command : UpdateTodoCommand) : Promise<Todo | null>{
        const { id } = command;
        const{ body } = command;
        const todo_find = await this.todoRepository.findOneBy({id})
        if(!todo_find){
            throw new NotFoundException;
        }
        try {
            return this.todoRepository.save({...todo_find, ...body})
        } catch (error) {
            return error.message
        }
    }
}
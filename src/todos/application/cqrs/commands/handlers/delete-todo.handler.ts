import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { createTodoCommand } from "../commands/create-todo.command";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Todo } from "src/todos/domain/entities/todo.entity";
import { Repository } from "typeorm";
import { deleteTodoCommand } from "../commands/delete-todo.command";

@Injectable()
@CommandHandler(deleteTodoCommand)
export class deleteTodoHandler implements ICommandHandler<deleteTodoCommand>{
    constructor(
        @InjectRepository(Todo)
        private readonly todoRepository : Repository<Todo>,
    ){}

    async execute(command : deleteTodoCommand) : Promise<boolean>{
        
        const { id } = command
        const todo_find = await this.todoRepository.findOneBy({id})
        if(!todo_find){
            throw new NotFoundException;
        }
        
        try {  
            await this.todoRepository.delete(id)
            return true
        } catch (error) {
            return error.message
        }
    }
}
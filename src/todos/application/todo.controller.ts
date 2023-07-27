import { Controller, Get, Post, Patch, Put, Delete, Body, Param } from '@nestjs/common';
import { TodoServices } from './todo.service';
import { Todo } from '../domain/entities/todo.entity';
import { TodoDto } from '../domain/dtos/todo.dto';
import { TodoUpdateDto } from '../domain/dtos/updatetodo.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { getAllTodosQuery } from './cqrs/queries/queries/get-all-todos.query';
import { getOneTodoQuery } from './cqrs/queries/queries/get-one-todo.query';
import { createTodoCommand } from './cqrs/commands/commands/create-todo.command';
import { UpdateTodoCommand } from './cqrs/commands/commands/update-todo.command';
import { deleteTodoCommand } from './cqrs/commands/commands/delete-todo.command';

@Controller('todos')
export class TodoController {

    constructor(
        private readonly commandBus : CommandBus,
        private readonly queryBus : QueryBus
        ){}

    @Get()
    async getAllTodos() : Promise <Todo[]>{
        const query = new getAllTodosQuery()
        return this.queryBus.execute(query)
    }

    @Get(':id')
    async getOneTodo(@Param('id') id : number) : Promise<Todo | null>{
        const query = new getOneTodoQuery(id)
        return this.queryBus.execute(query)
    }

    @Post()
    async createTodo(@Body() body : TodoDto) : Promise <Todo>{
        const command = new createTodoCommand(body)
        return this.commandBus.execute(command)
    }

    @Patch(':id')
    async updateTodo(@Param('id') id : number, @Body() body : TodoUpdateDto) : Promise<Todo |null>{
        const command = new UpdateTodoCommand(id, body)
        return this.commandBus.execute(command)
    }

    @Delete(':id')
    async deleteTodo(@Param('id') id : number) : Promise<boolean>{
        const command = new deleteTodoCommand(id)
        return this.commandBus.execute(command)
    }

}

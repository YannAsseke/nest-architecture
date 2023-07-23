import { Controller, Get, Post, Patch, Put, Delete, Body, Param } from '@nestjs/common';
import { TodoServices } from './todo.service';
import { Todo } from '../domain/entities/todo.entity';
import { TodoDto } from '../domain/dtos/todo.dto';
import { TodoUpdateDto } from '../domain/dtos/updatetodo.dto';

@Controller('todos')
export class TodoController {

    constructor(
        private todoService : TodoServices
        ){}

    @Get()
    async getAllTodos() : Promise <Todo[]>{
        return this.todoService.getAllTodos()
    }

    @Get(':id')
    async getOneTodo(@Param('id') id : number) : Promise<Todo | null>{
        return this.todoService.getOneTodo(id)
    }

    @Post()
    async createTodo(@Body() body : TodoDto) : Promise <Todo>{
        return this.todoService.createTodo(body)
    }

    @Patch(':id')
    async updateTodo(@Param('id') id : number, @Body() body : TodoUpdateDto) : Promise<Todo |null>{
        return this.todoService.updateTodo(id, body)
    }

    @Delete(':id')
    async deleteTodo(@Param('id') id : number) : Promise<boolean>{
        return this.todoService.deleteTodo(id)
    }

}

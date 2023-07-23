import { Injectable, NotFoundException } from "@nestjs/common";
import { Todo } from "../domain/entities/todo.entity";
import { TodoRepository } from "../domain/repository/todo.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TodoDto } from "../domain/dtos/todo.dto";
import { TodoUpdateDto } from "../domain/dtos/updatetodo.dto";


@Injectable()

export class TodoPostgresRepository implements TodoRepository{

    constructor(
        @InjectRepository(Todo) private readonly todoRepository : Repository<Todo>
    ){}
    


    async getAllTodos(): Promise<Todo[]> {

        try {
            return this.todoRepository.find();
        } catch (error) {
            return error.message
        }
    }

    async getOneTodo(id: number): Promise<Todo> {
        const todo_find = this.todoRepository.findOneBy({id});
        if(!todo_find){
            throw new NotFoundException;
        }

        try {
            return todo_find;  
        } catch (error) {
           return error.message 
        }

    }

    async createTodo(body : TodoDto): Promise<Todo> {
        try {
            return this.todoRepository.save(body);
        } catch (error) {
           return error.message 
        }
    }

    async updateTodo(id: number, body : TodoUpdateDto): Promise<Todo> {
        const todo_find = await this.getOneTodo(id);

        if(!todo_find){
            throw new NotFoundException;
        }

        try {
            return this.todoRepository.save({...todo_find, ...body});
        } catch (error) {
            return error.message
        }
        
    }

    async deleteTodo(id: number): Promise<boolean> {
        const todo_find = await this.getOneTodo(id);

        if(!todo_find){
            throw new NotFoundException;
        }

        try {
            this.todoRepository.delete(id);
            return true;
        } catch (error) {
            return error.message
        }
    }
}
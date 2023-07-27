import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TodoServices } from '../application/todo.service';
import { TodoPostgresRepository } from '../adapters/todo.postgres.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from '../domain/entities/todo.entity';
import { TodoController } from '../application/todo.controller';
import { createTodoHandler } from '../application/cqrs/commands/handlers/create-todo.handler';
import { updateTodoHandler } from '../application/cqrs/commands/handlers/update-todo.handler';
import { deleteTodoHandler } from '../application/cqrs/commands/handlers/delete-todo.handler';
import { getAllTodosHandler } from '../application/cqrs/queries/handlers/get-all-todos.handler';
import { getOneTodoHandler } from '../application/cqrs/queries/handlers/get-one-todo.handler';
import { CqrsModule } from '@nestjs/cqrs';

@Module({

    imports : [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env', }),
        TypeOrmModule.forFeature([Todo]),
        CqrsModule
        // JwtModule.register({
        //     global : true,
        //     secret : process.env.JWT_SECRET,
        //     signOptions : {expiresIn : "1d"}
        // }),
        
    ],
    controllers: [TodoController],
    providers: [
        TodoServices,
        TodoPostgresRepository, 
        createTodoHandler, 
        updateTodoHandler, 
        deleteTodoHandler, 
        getAllTodosHandler, 
        getOneTodoHandler
    ]
})
export class TodoModule {}

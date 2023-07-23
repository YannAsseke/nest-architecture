import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TodoServices } from '../application/todo.service';
import { TodoPostgresRepository } from '../adapters/todo.postgres.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from '../domain/entities/todo.entity';
import { TodoController } from '../application/todo.controller';

@Module({

    imports : [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env', }),
        TypeOrmModule.forFeature([Todo]),
        // JwtModule.register({
        //     global : true,
        //     secret : process.env.JWT_SECRET,
        //     signOptions : {expiresIn : "1d"}
        // }),
        
    ],
    controllers: [TodoController],
    providers: [TodoServices, TodoPostgresRepository]
})
export class TodoModule {}

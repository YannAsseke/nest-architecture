import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../interfaces/controllers/user.controller';
import { UserService } from '../domain/application/user.service';
import { UserPostgresRepository } from './repository/user.postgres.repository';
import { User } from '../domain/entities/user.entity';
import { CreateUserHandler } from '../interfaces/commands/handlers/create-user.handler';
import { UpdateUserHandler } from '../interfaces/commands/handlers/update-user.handler';
import { DeleteUserHandler } from '../interfaces/commands/handlers/delete-user.handler';
import { GetAllUsersHandler } from '../interfaces/queries/handlers/get-all-users.handler';
import { GetOneUserHandler } from '../interfaces/queries/handlers/get-one-user.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { UserMapper } from './mappers/user.mapper';
import { UserPersistance } from './persistances/entities/user.persistance.entity';
import { UserRepositoryPort } from '../domain/ports/user.repository.port';

const createUserProvider = {
    provide: CreateUserHandler,
    useFactory: (userRepositoryPort : UserRepositoryPort) => {
      return new CreateUserHandler(userRepositoryPort)
    },
    inject : [UserPostgresRepository]
};

const updateUserProvider = {
    provide: UpdateUserHandler,
    useFactory: (userRepositoryPort : UserRepositoryPort) => {
      return new UpdateUserHandler(userRepositoryPort)
    },
    inject : [UserPostgresRepository]
};

const deleteUserProvider = {
    provide: DeleteUserHandler,
    useFactory: (userRepositoryPort : UserRepositoryPort) => {
      return new DeleteUserHandler(userRepositoryPort)
    },
    inject : [UserPostgresRepository]
};

const getAllUsersProvider = {
  provide: GetAllUsersHandler,
  useFactory: (userRepositoryPort : UserRepositoryPort) => {
    return new GetAllUsersHandler(userRepositoryPort)
  },
  inject : [UserPostgresRepository]
};

const getOneUserProvider = {
  provide: GetOneUserHandler,
  useFactory: (userRepositoryPort : UserRepositoryPort) => {
    return new GetOneUserHandler(userRepositoryPort)
  },
  inject : [UserPostgresRepository]
};

@Module({

    imports : [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env', }),
        TypeOrmModule.forFeature([UserPersistance]),
        CqrsModule
        // JwtModule.register({
        //     global : true,
        //     secret : process.env.JWT_SECRET,
        //     signOptions : {expiresIn : "1d"}
        // }),
        
    ],
    controllers: [UserController],
    providers: [
        createUserProvider,
        updateUserProvider,
        deleteUserProvider,
        getAllUsersProvider,
        getOneUserProvider,
        UserPostgresRepository
    ]
})
export class UserModule {}

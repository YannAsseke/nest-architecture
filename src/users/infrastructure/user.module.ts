import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../application/user.controller';
import { UserService } from '../application/user.service';
import { UserPostgresRepository } from '../adapters/user.postgres.repository';
import { User } from '../domain/entities/user.entity';

@Module({

    imports : [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env', }),
        TypeOrmModule.forFeature([User]),
        // JwtModule.register({
        //     global : true,
        //     secret : process.env.JWT_SECRET,
        //     signOptions : {expiresIn : "1d"}
        // }),
        
    ],
    controllers: [UserController],
    providers: [UserService, UserPostgresRepository]
})
export class UserModule {}

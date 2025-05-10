import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.enitity'; 

@Module({
  imports: [TypeOrmModule.forFeature([User])], //creates repository for User entity
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}

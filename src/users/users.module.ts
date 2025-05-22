import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.enitity'; 
import { AuthService } from './auth.service'; // Import AuthService

@Module({
  imports: [TypeOrmModule.forFeature([User])], //creates repository for User entity
  controllers: [UsersController],
  providers: [UsersService, AuthService], // Register AuthService as a provider
})
export class UsersModule {}

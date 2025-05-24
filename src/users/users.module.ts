import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.enitity'; 
import { AuthService } from './auth.service'; // Import AuthService
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([User])], //creates repository for User entity
  controllers: [UsersController],
  providers: [UsersService, 
              AuthService, 
              {
                provide:APP_INTERCEPTOR, 
                useClass: CurrentUserInterceptor
              }], // Register AuthService as a provider
})
export class UsersModule {}

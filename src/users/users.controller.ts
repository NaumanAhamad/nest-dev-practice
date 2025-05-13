import { Controller, Post, Get, Delete, Body, Param, Query, Patch, NotFoundException } from '@nestjs/common';
import { createUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
    constructor(private usersService: UsersService) {}
    @Post('signup')
    createUser(@Body() body: createUserDto) {
       this.usersService.create(body.email, body.password);   
    }

    @Get('/:id')
    async findUser(@Param('id') id: string){
        console.log('Handler is running');
        const user = await this.usersService.findOne(parseInt(id));
        if(!user){
            throw new NotFoundException('User not found');
        }
        return user;
    }

    @Get()
    async findUsers(@Query('email') email: string){
        const users = await this.usersService.findAll(email);
        if(!users){
            throw new NotFoundException('User not found');
        }
        return users;
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string){
        return this.usersService.remove(parseInt(id));
    }

    @Patch('/:id')
    upadateUser(@Param('id') id: string, @Body() body: UpdateUserDto){
        this.usersService.update(parseInt(id), body);
    }
}

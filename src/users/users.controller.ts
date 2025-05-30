import { 
    Controller,
    Post, 
    Get, 
    Delete, 
    Body, 
    Param, 
    Query, 
    Patch, 
    NotFoundException,
    Session,
    // UseInterceptors
    UseGuards
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorators';
// import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { User } from './user.enitity';
import { AuthGuard } from 'src/guards/auth.guard';


@Controller('auth')
@Serialize(UserDto)
// @UseInterceptors(CurrentUserInterceptor)
export class UsersController {
    constructor(private usersService: UsersService, private authService: AuthService) {}
    
    
    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
       const user = await this.authService.signUp(body.email, body.password); 
       session.userId = user.id;
       return user;
    }


    @Get('/whoami')
    @UseGuards(AuthGuard)
    WhoAmI(@CurrentUser() user: User) {
        // console.log('Current user:', user);
        return user
    }

    @Post('/signout')
    signOut(@Session() session:any){
        session.userId = null;
    }

    @Post('/signin')
    async signIn(@Body() body: CreateUserDto, @Session() session: any) {
        const { email, password } = body;
        const user = await this.authService.signIn(email, password);
        if(!user) {
            throw new NotFoundException('User not found');
        }
        session.userId = user.id;
        return user;
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


    // @Get('/colors/:color')
    // getColor(@Param('color') color: string, @Session() session: any) {
    //     session.color = color;
    // }

    // @Get('/colors')
    // getColorSession(@Session() session: any) {
    //     return session.color;
    // }
}

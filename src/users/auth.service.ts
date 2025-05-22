import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt} from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {  
    constructor(private usersService: UsersService) {}

    async signUp(email: string, password: string) {
        //see if email is in use
        const users = await this.usersService.findAll(email);
        if(users.length) {
            throw new BadGatewayException('Email in use');
        }
        //Hash user password
        //Gernerate a salt
        const salt = randomBytes(8).toString('hex');
        //create salt and hash
        const hash = await scrypt(password, salt, 32) as Buffer;
        //join the hashed password and salt
        const result = salt + '.' + hash.toString('hex');
        //create a new user
        const user = await this.usersService.create(email, result);
        //return the user
        return user;
    }

    async signIn(email: string, password: string) {
        //find the user by email
        const [user] = await this.usersService.findAll(email);
        if(!user) {
            throw new NotFoundException('Enter valid email and password');
        }
        //split the password into salt and hash
        const [storedSalt, storedHash]= user.password.split('.');
        //combine the salt and password hash 
        const newHash = await scrypt(password, storedSalt, 32) as Buffer;
        //compare the combined salt hash password with the stored password and salt
        if(storedHash !== newHash.toString('hex')) {
            throw new BadRequestException('Enter valid email and password');
        }
        //return the user
        return user;
    }

}
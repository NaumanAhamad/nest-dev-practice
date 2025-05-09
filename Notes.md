Request   ->     -------
                | SERVER |
Resoponse <-     --------

1. SERVER ->  Validate data in the request -> Make sure the user is authenticated -> Route he request a particular funcion -> Run some business logic -> Access a database.


2. Tools in Nest to help with the above operations
-----------------------------------------------
a. PIPE       -> Validate data in the request
b. GUARD      -> Make sure the user is authenticated
c. CONTROLLER -> Route he request a particular funcion
d. SERVICE    -> Run some business logic
e. REPOSITORY -> Access a database

3. Parts of Nest
----------------
a. ** Controllers   -> Handles Incoming requests 
b. Service          -> Handles Data access and business logic
c. ** Modules       -> Groups together code
d. Pipes            -> Validates incoming data
e. Filters          -> Handles errors that occur during request handling
f. Guards           -> Handles authentication
g. Interceptors     -> Adds extra logic to incoming requests or outgoing response
h. Repositories     -> Handles data stored in a DB

4. File Naming conventions in NEST
-----------------------------------
ex: 
class AppController{} -> file name -> app.controllers.ts
class AppModule{}     -> file name -> app.module.ts

5. Creating project using Nest cli command
------------------------------------------
nest new <projectName>

Note::Remove tags <> berfore Creating

6. Creating Module files under the nest project
----------------------------------------
nest generate module <fileName> 
Note::Remove tags <> berfore Creating

7. Creating controller files under the module
---------------------------------------------
nest generate controller <Module FolderName><Controller Name>/messages --flat

--flat -> represents the Dont createa an extra folder inside the messages folder.

Note::Remove tags <> berfore Creating

8. Handling request
-------------------
EX:
Request 1               Route                       option1
List all messages    GET /messages                  @controller()
                                                    export class Messages Controller{
                                                        @Get('/messages')
                                                        listMessages()
                                                    }

Request 2               Route                       option2
create a messages    POST /messages                 @controller()
                                                    export class Messages Controller{
                                                        @Post('/messages')
                                                        postMessage()
                                                    }

Request 3                       Route               option3
get a particular message    POST /messages          @controller()
                                                    export class Messages Controller{
                                                        @get('/messages/:id')
                                                        getMessage()
                                                    }

9. Validation PIPE for post request
-----------------------------------
Setting up automatic validation for PIPES
a. Tell Nest to use global validation
b. Create a class that describes the different porperties that the request body should have 
Data Trnasfer Object (Dto)
c. Add validation rules
d. Apply that class to the request handler

(Data Transfer Object)Dtos: -> the main goal of dto is to carry information or data between two places

10. Service
-----------
It's a class
Place to put a business logic
Uses one or more repositories to find store data
EX:
findOne(id: string)
findAll()
create(message: string)

11. Repositories
-----------------
It's a class
place to put storage-related logic
Usually ends up being a TypeORM entity, a Mongoose Schema, or similar
findOne(id: string)
findAll()
create(message:string)

12. NotFound Execption
-----------------------
EX:
import { NotFoundException } from '@nestjs/common';
@Get('/:id')
    async getMessage(@Param('id') id: string) {
        const message = await this.messagesService.findOne(id);
        if(!message) {
            throw new NotFoundException('Message not found');
        }
        return message;
    } 

(VIP) 13. Dependency Injection:
-------------------------------

a. Inversion of controll piplines
             ⬇️
  Classes should not create instance of its dependencies of its own

Example code Not following inversion control
---------------------------------------------
export class MessagesService {
    messageRepo: MessageRepository;
    constructor(){
        //Service is creating its own dependincies
        // Donot do this in real world
        //we have to dpendency injection
        this.messageRepo = new MessageRepository();
    }
}

Best Sollution for the Inversion Controll piplines
--------------------------------------------------
interface Repository{
    findOne(id: string)
    findAll()
    create(content: string)
}

export class MessagesService {
    messageRepo: Repository;
    constructor(rep: Repository){
        this.messageRepo = repo
    }
}

13. Ineversion of cotroll
-------------------------
Nest (Dependency Injector)DI container/Injector

It stores two sets of information 
a. list of classes and their dependencies
b. list of instance that i have created

List of classes and their dependencies
EX: 
  Class                 Dependency 
MessagService           MessageRepo
MessagesRepo         

list of instance that i have created
EX:
MessagesRepo            .MessagesService

14. Sharing Services between modules
------------------------------------
a. Add PowerService(service name) service to the PowerModule(module name)
b. Import the PowerModule(module name) into the CpuModule(module Name)
c. Define the constructor method on CpuService(service name) and add PowerService(service name) to it

EX:
--
PowerModule(module name) File::
import { Module } from '@nestjs/common';
import { PowerService } from './power.service';

@Module({
  providers: [PowerService],
  exports: [PowerService],
})
export class PowerModule {}

CpuModule(module Name) File::
import { Module } from '@nestjs/common';
import { CpuService } from './cpu.service';
import { PowerModule } from '../power/power.module';

@Module({
  providers: [CpuService],
  imports: [PowerModule],
})
export class CpuModule {}

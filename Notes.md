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
Usually ends up being a TypeORM ENTITY, a Mongoose Schema, or similar
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

14. ENTITY Files
----------------
:: An ENTITY is very similar to a model, An ENTITY file defines single kind of resource. 
that we want to store inside the data base.

EX: User ENTITY  tells we want to store user kind of data in the data base, contains different types
of properties 
An User should have probable an email of phone number in the data base.
When using type orm we dont have to create repository for the user and report here in our application.

STEPS TO CREATE ENTITY FILE
---------------------------
1.Create an ENTITY file, and create a class in it that lists all the properties that your ENTITY will have.

2.Connect the ENTITY to its parent module. This create a repository

3.Connect the ENTITY to the root connection (in the app module)

 synchronize: true:  
 ------------------
 -> To do a Migration(Renaming column names, adding new column, etc..) of database.
 Synchronize true only is to do in development enviornment, it will add or remove columns
 and automatically updates the data base.

15. TypeORM Repository API
--------------------------
-> create()     ->      Makes a new instance of an entity, but does not persist it to the DB
-> save()       ->      Adds or updates a record to the DB
-> find()       ->      Runs a query and returns a list of entities
-> findOne()    ->      Run a qurey, returning the first record matching the search criteria (Depreciated do not use use findOneBy() instead)
-> remove()     ->      Remove a record from the DB

NOTE: By calling Save method on the instance after creating the hooks will be triggered or the hooks will not get triggered
Like here

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {}
    create(email: string, password: string) {
        const user = this.repo.create({ email, password });
        return this.repo.save(user);
    }
}

Example Methods to be call to get hooks triggered
-------------------------------------------------

Will be called upon the entity instance.
save()              -> entity instance will be called.
Remove()            -> entity instance will be called.

    VS

Will Not be called upon the entity instance.
insert()            -> entity instance will not be called.
update()            -> entity instance will not be called.
        &
Delete()            -> entity instance will not be called.

Custom Interceptor:
------------------
interceptor is used to intercept the response before giving to the client response.
so in this case we have to create a DTO that intercepts the response sending back to client
base upon their roles assigned to them like ex: user, admin like changes
So in this case it is used to mutate some data basedn on the user defined roles 
to see the exact data what they supposed to see.




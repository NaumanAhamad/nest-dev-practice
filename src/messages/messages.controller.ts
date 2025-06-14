import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('/messages')
export class MessagesController {
    constructor(public messagesService: MessagesService){}

    @Get()
    listMessages() {
        // return [
        //     { id: 1, text: 'Hello World' },
        //     { id: 2, text: 'Hello NestJS' },
        // ];
        return this.messagesService.findAll();
    }

    @Post()
    postMessage(@Body() body: CreateMessageDto) {
        return this.messagesService.create(body.content);
    }

    @Get('/:id')
    async getMessage(@Param('id') id: string) {
        const message = await this.messagesService.findOne(id);
        if(!message) {
            throw new NotFoundException('Message not found');
        }
        return message;
    } 
    
    // @Get('/:id')
    // getMessageWith(@Query('filter') filter: string) {
    //     console.log(filter);
    // }    
}

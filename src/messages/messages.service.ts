import { MessageRepository } from "./ messages.repository";

export class MessagesService {
    messageRepo: MessageRepository;

    constructor(){
        //Service is creating its own dependincies
        // Donot do this in real world
        //we have to dpendency injection
        this.messageRepo = new MessageRepository();
    }

    findOne(id: string) {
        return this.messageRepo.fiondOne(id);
    }

    findAll() {
        return this.messageRepo.findAll();
    }

    create(message: string) {
        return this.messageRepo.create(message);
    }
}
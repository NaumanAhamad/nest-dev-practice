import { Injectable } from "@nestjs/common";
import { MessagesRepository } from "./ messages.repository";

@Injectable()
export class MessagesService {
    constructor(public messageRepo: MessagesRepository) { }

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
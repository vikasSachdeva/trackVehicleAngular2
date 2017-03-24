/* tslint:disable */
import { Injectable } from '@angular/core';
import { Contact } from '../../models/Contact';
import { CalendarEvent } from '../../models/CalendarEvent';
import { Friend } from '../../models/Friend';
import { Conversation } from '../../models/Conversation';
import { Message } from '../../models/Message';
import { Feed } from '../../models/Feed';
import { Comment } from '../../models/Comment';
import { Like } from '../../models/Like';
import { Product } from '../../models/Product';
import { Setting } from '../../models/Setting';
import { Appuser } from '../../models/Appuser';

@Injectable()
export class SDKModels {

  private models: { [name: string]: any } = {
    Contact: Contact,
    CalendarEvent: CalendarEvent,
    Friend: Friend,
    Conversation: Conversation,
    Message: Message,
    Feed: Feed,
    Comment: Comment,
    Like: Like,
    Product: Product,
    Setting: Setting,
    Appuser: Appuser,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }
}

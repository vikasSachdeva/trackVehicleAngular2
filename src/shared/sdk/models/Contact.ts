/* tslint:disable */
import {
  CalendarEvent,
  Friend,
  Feed,
  Setting,
  Appuser
} from '../index';

declare var Object: any;
export interface ContactInterface {
  firstname?: string;
  lastname?: string;
  othernames?: string;
  title?: string;
  picture?: string;
  gender?: string;
  address?: string;
  town?: string;
  country?: string;
  chat_headline?: string;
  postal_code?: string;
  emails?: Array<string>;
  phones?: Array<string>;
  is_active: boolean;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  updated_by: string;
  created_by: string;
  id?: any;
  AppuserId?: any;
  calendarEvents?: Array<CalendarEvent>;
  friends?: Array<Friend>;
  feed?: Array<Feed>;
  settings?: Setting;
  Appuser?: Appuser;
}

export class Contact implements ContactInterface {
  firstname: string;
  lastname: string;
  othernames: string;
  title: string;
  picture: string;
  gender: string;
  address: string;
  town: string;
  country: string;
  chat_headline: string;
  postal_code: string;
  emails: Array<string>;
  phones: Array<string>;
  is_active: boolean;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  updated_by: string;
  created_by: string;
  id: any;
  AppuserId: any;
  calendarEvents: Array<CalendarEvent>;
  friends: Array<Friend>;
  feed: Array<Feed>;
  settings: Setting;
  Appuser: Appuser;
  constructor(data?: ContactInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Contact`.
   */
  public static getModelName() {
    return "Contact";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Contact for dynamic purposes.
  **/
  public static factory(data: ContactInterface): Contact{
    return new Contact(data);
  }  
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Contact',
      plural: 'Contacts',
      properties: {
        firstname: {
          name: 'firstname',
          type: 'string'
        },
        lastname: {
          name: 'lastname',
          type: 'string'
        },
        othernames: {
          name: 'othernames',
          type: 'string'
        },
        title: {
          name: 'title',
          type: 'string'
        },
        picture: {
          name: 'picture',
          type: 'string'
        },
        gender: {
          name: 'gender',
          type: 'string'
        },
        address: {
          name: 'address',
          type: 'string'
        },
        town: {
          name: 'town',
          type: 'string'
        },
        country: {
          name: 'country',
          type: 'string'
        },
        chat_headline: {
          name: 'chat_headline',
          type: 'string'
        },
        postal_code: {
          name: 'postal_code',
          type: 'string'
        },
        emails: {
          name: 'emails',
          type: 'Array&lt;string&gt;'
        },
        phones: {
          name: 'phones',
          type: 'Array&lt;string&gt;'
        },
        is_active: {
          name: 'is_active',
          type: 'boolean',
          default: true
        },
        is_deleted: {
          name: 'is_deleted',
          type: 'boolean',
          default: false
        },
        created_at: {
          name: 'created_at',
          type: 'Date'
        },
        updated_at: {
          name: 'updated_at',
          type: 'Date'
        },
        updated_by: {
          name: 'updated_by',
          type: 'string'
        },
        created_by: {
          name: 'created_by',
          type: 'string'
        },
        id: {
          name: 'id',
          type: 'any'
        },
        AppuserId: {
          name: 'AppuserId',
          type: 'any'
        },
      },
      relations: {
        calendarEvents: {
          name: 'calendarEvents',
          type: 'Array<CalendarEvent>',
          model: 'CalendarEvent'
        },
        friends: {
          name: 'friends',
          type: 'Array<Friend>',
          model: 'Friend'
        },
        feed: {
          name: 'feed',
          type: 'Array<Feed>',
          model: 'Feed'
        },
        settings: {
          name: 'settings',
          type: 'Setting',
          model: 'Setting'
        },
        Appuser: {
          name: 'Appuser',
          type: 'Appuser',
          model: 'Appuser'
        },
      }
    }
  }
}

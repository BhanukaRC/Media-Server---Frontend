import { IUser } from './IUser';

export class User extends IUser{

    constructor(jsonObject:any){
        super();
        this.username = jsonObject.username;
        this.email = jsonObject.email;
        this.password = jsonObject.password;
        this.id = jsonObject._id;
    }

 }
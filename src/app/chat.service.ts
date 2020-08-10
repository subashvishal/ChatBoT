import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { ChatMessage } from '../app/models/chat.message.model';
import { AuthService } from '../app/auth.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  user: any;
  chatMessages: AngularFireList<ChatMessage>;
  chatMessage: ChatMessage;
  userName: any;
  userDetail: any;
  WMes: any;


  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }
      this.getUsers().valueChanges().subscribe((data: any) => {
        this.userName = data[0].displayName;
      });
    });
  }

  getUser() {
    const userId = this.user.uid;
    const path = `/users/${userId}`;
    return this.db.object(path);
  }

  getUsers() {
    const path = '/users';
    return this.db.list(path);
  }

  sendMessage(msg: string) {
    this.WMes = msg;
    const timestamp = this.getTimeStamp();
    const email = this.user.email;
    const usernam = this.user.displayName;
    // const email = 'Subashvishal64@gmail.com'
    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      message: msg,
      timeSent: timestamp,
      userName: this.userName,
      // userName: 'Subash',
      email: email,
    });
    this.userDetail = this.chatMessages;
    console.log('Called sendMessage()!');
  }

  getTimeStamp() {
    const now = new Date();
    const date = now.getFullYear() + '/' +
      (now.getMonth() + 1) + '/' +
      now.getDate();
    const time = now.getHours() + ':' +
      now.getMinutes() + ':' +
      now.getSeconds();

    return (date + ' ' + time);

  }

  getMessages(): AngularFireList<ChatMessage> {
    // query to create our message feed binding
    console.log('calling getMessages()!...');
    return this.db.list('messages', ref => {
      let q = ref.limitToLast(25).orderByKey();
      return q;
    });
  }
}
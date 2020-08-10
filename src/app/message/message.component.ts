import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { ChatMessage } from '../models/chat.message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() chatMessage: ChatMessage;
  userName: string;
  userEmail: string;
  messageContent: string;
  // timeStamp: Date = new Date();
  timeStamp: string;
  isOwnMessage: boolean;
  ownEmail: string;

  constructor(private auth: AuthService) {
    auth.authUser().subscribe(user => {
      this.ownEmail = user.email;
      this.isOwnMessage = this.ownEmail === this.userEmail;
    });
  }

  ngOnInit(chatMessage = this.chatMessage) {
    this.messageContent = this.chatMessage.message;
    this.timeStamp = this.chatMessage.timeSent;
    this.userName = this.chatMessage.userName;
    this.userEmail = this.chatMessage.email;
  }

}

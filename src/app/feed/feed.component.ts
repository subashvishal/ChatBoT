import { Component, OnInit, OnChanges } from '@angular/core';
import { ChatService } from '../chat.service';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ChatMessage } from '../models/chat.message.model';
import { Injectable, Pipe, PipeTransform } from '@angular/core';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges {
  feed: AngularFireList<ChatMessage>;
  feedDetails: Observable<any[]>;

  constructor(private chat: ChatService, private db: AngularFireDatabase,) { }

  ngOnInit() {

    this.feedDetails = this.db.list('messages').valueChanges();
    // console.log(this.feedDetails);
  }

  ngOnChanges() {
    this.feed = this.chat.getMessages();
  }

}

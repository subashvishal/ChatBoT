import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chart-form',
  templateUrl: './chart-form.component.html',
  styleUrls: ['./chart-form.component.css']
})
export class ChartFormComponent implements OnInit {
  message: string;

  constructor(private chat: ChatService) { }

  ngOnInit() {
  }


  send() {
    if (this.message !== '') {
      this.chat.sendMessage(this.message);
      this.message = '';
    }
  }

  handleSubmit(event) {
    if (event.keyCode === 13) {
      this.send();
    }
  }

}

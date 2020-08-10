import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, SimpleChanges } from '@angular/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { timer } from 'rxjs';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit, AfterViewChecked {
  @ViewChild('scroller', { static: false, }) feedContainer: ElementRef<HTMLDivElement>;
  // @ViewChild('scroller', { static: false, })  scroll: any;
  DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollY: true,
    suppressScrollX: false,
};

constructor() { }

ngOnInit() {
  this.scrollToBottom();
}

ngAfterViewChecked() {
  this.scrollToBottom();
}

// scrollToBottom(): void {
  // this.content.scrollToBottom(0);
  // this.feedContainer.nativeElement.scrollTop
    // = this.feedContainer.nativeElement.scrollHeight;
// }

  scrollToBottom(): void {
    try {
      this.feedContainer.nativeElement.scrollTop = this.feedContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  // ngAfterViewChecked() {
  //   this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight;
  // }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes.messages) {
  //     timer(10).subscribe(() => this.scrollIntoView());
  //   }
  // }

  // scrollIntoView() {
  //   if (this.feedContainer) {
  //     const { nativeElement } = this.feedContainer;
  //     nativeElement.scrollTop = nativeElement.scrollHeight;
  //   }
  // }
}

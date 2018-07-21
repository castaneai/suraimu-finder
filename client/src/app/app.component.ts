import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  filter, debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { EmojiService } from './emoji.service';
import { Emoji } from './emoji'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  emojis: Observable<Emoji[]>;
  private searchKeywords = new Subject<string>();

  constructor(private emojiService: EmojiService) { }

  search(keyword: string) {
    this.searchKeywords.next(keyword);
  }

  ngOnInit() {
    this.emojis = this.searchKeywords
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        filter(k => k.length > 1),
        switchMap(k => this.emojiService.searchEmoji(k))
      );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Emoji } from './emoji';

@Injectable()
export class EmojiService {
    constructor(private httpClient: HttpClient) { }

    searchEmoji(keyword: string): Promise<Emoji[]> {
        return this.httpClient
            .get<Emoji[]>(`/find?q=${keyword}`)
            .toPromise();
    }
}
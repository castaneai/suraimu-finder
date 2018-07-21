import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Emoji } from './emoji';
import { environment } from '../environments/environment';

@Injectable()
export class EmojiService {

    private mockResponse = [{ "thumbnail_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Noto_Emoji_KitKat_1f450.svg/48px-Noto_Emoji_KitKat_1f450.svg.png", "keywords": ["👐", "open", "hands", "hand"], "description": "open hands (hand, open, open hands)\n", "text": "👐", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Noto_Emoji_KitKat_1f450.svg/512px-Noto_Emoji_KitKat_1f450.svg.png" }, { "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Noto_Emoji_KitKat_1f4c2.svg/512px-Noto_Emoji_KitKat_1f4c2.svg.png", "thumbnail_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Noto_Emoji_KitKat_1f4c2.svg/48px-Noto_Emoji_KitKat_1f4c2.svg.png", "keywords": ["📂", "open", "file", "folder"], "description": "open file folder (file, folder, open, open file folder)\n", "text": "📂" }, { "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Noto_Emoji_KitKat_1f4d6.svg/512px-Noto_Emoji_KitKat_1f4d6.svg.png", "thumbnail_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Noto_Emoji_KitKat_1f4d6.svg/48px-Noto_Emoji_KitKat_1f4d6.svg.png", "keywords": ["📖", "open", "book"], "description": "open book (book, open, open book)\n", "text": "📖" }, { "description": "open mailbox with raised flag (mail, mailbox, open, open mailbox with raised flag, postbox)\n", "text": "📬", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Noto_Emoji_KitKat_1f4ec.svg/512px-Noto_Emoji_KitKat_1f4ec.svg.png", "thumbnail_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Noto_Emoji_KitKat_1f4ec.svg/48px-Noto_Emoji_KitKat_1f4ec.svg.png", "keywords": ["📬", "open", "mailbox", "with", "raised", "flag", "mail", "postbox"] }, { "thumbnail_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Noto_Emoji_KitKat_1f4ed.svg/48px-Noto_Emoji_KitKat_1f4ed.svg.png", "keywords": ["📭", "open", "mailbox", "with", "lowered", "flag", "mail", "postbox"], "description": "open mailbox with lowered flag (lowered, mail, mailbox, open, open mailbox with lowered flag, postbox)\n", "text": "📭", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Noto_Emoji_KitKat_1f4ed.svg/512px-Noto_Emoji_KitKat_1f4ed.svg.png" }, { "keywords": ["🔓", "unlocked", "lock", "open", "unlock"], "description": "unlocked (lock, open, unlock, unlocked)\n", "text": "🔓", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Noto_Emoji_KitKat_1f513.svg/512px-Noto_Emoji_KitKat_1f513.svg.png", "thumbnail_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Noto_Emoji_KitKat_1f513.svg/48px-Noto_Emoji_KitKat_1f513.svg.png" }, { "thumbnail_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Noto_Emoji_KitKat_1f603.svg/48px-Noto_Emoji_KitKat_1f603.svg.png", "keywords": ["😃", "grinning", "face", "with", "big", "eyes", "mouth", "open", "smile"], "description": "grinning face with big eyes (face, grinning face with big eyes, mouth, open, smile)\n", "text": "😃", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Noto_Emoji_KitKat_1f603.svg/512px-Noto_Emoji_KitKat_1f603.svg.png" }, { "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Noto_Emoji_KitKat_1f604.svg/512px-Noto_Emoji_KitKat_1f604.svg.png", "thumbnail_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Noto_Emoji_KitKat_1f604.svg/48px-Noto_Emoji_KitKat_1f604.svg.png", "keywords": ["😄", "grinning", "face", "with", "smiling", "eyes", "eye", "mouth", "open", "smile"], "description": "grinning face with smiling eyes (eye, face, grinning face with smiling eyes, mouth, open, smile)\n", "text": "😄" }, { "thumbnail_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Noto_Emoji_KitKat_1f605.svg/48px-Noto_Emoji_KitKat_1f605.svg.png", "keywords": ["😅", "grinning", "face", "with", "sweat", "cold", "open", "smile"], "description": "grinning face with sweat (cold, face, grinning face with sweat, open, smile, sweat)\n", "text": "😅", "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Noto_Emoji_KitKat_1f605.svg/512px-Noto_Emoji_KitKat_1f605.svg.png" }, { "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Noto_Emoji_KitKat_1f606.svg/512px-Noto_Emoji_KitKat_1f606.svg.png", "thumbnail_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Noto_Emoji_KitKat_1f606.svg/48px-Noto_Emoji_KitKat_1f606.svg.png", "keywords": ["😆", "grinning", "squinting", "face", "laugh", "mouth", "open", "satisfied", "smile"], "description": "grinning squinting face (face, grinning squinting face, laugh, mouth, open, satisfied, smile)\n", "text": "😆" }, { "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Noto_Emoji_KitKat_1f626.svg/512px-Noto_Emoji_KitKat_1f626.svg.png", "thumbnail_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Noto_Emoji_KitKat_1f626.svg/48px-Noto_Emoji_KitKat_1f626.svg.png", "keywords": ["😦", "frowning", "face", "with", "open", "mouth", "frown"], "description": "frowning face with open mouth (face, frown, frowning face with open mouth, mouth, open)\n", "text": "😦" }, { "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Noto_Emoji_KitKat_1f62e.svg/512px-Noto_Emoji_KitKat_1f62e.svg.png", "thumbnail_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Noto_Emoji_KitKat_1f62e.svg/48px-Noto_Emoji_KitKat_1f62e.svg.png", "keywords": ["😮", "face", "with", "open", "mouth", "sympathy"], "description": "face with open mouth (face, face with open mouth, mouth, open, sympathy)\n", "text": "😮" }, { "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Noto_Emoji_KitKat_1f630.svg/512px-Noto_Emoji_KitKat_1f630.svg.png", "thumbnail_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Noto_Emoji_KitKat_1f630.svg/48px-Noto_Emoji_KitKat_1f630.svg.png", "keywords": ["😰", "anxious", "face", "with", "sweat", "blue", "cold", "mouth", "open", "rushed"], "description": "anxious face with sweat (anxious face with sweat, blue, cold, face, mouth, open, rushed, sweat)\n", "text": "😰" }, { "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Noto_Emoji_KitKat_1f63a.svg/512px-Noto_Emoji_KitKat_1f63a.svg.png", "thumbnail_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Noto_Emoji_KitKat_1f63a.svg/48px-Noto_Emoji_KitKat_1f63a.svg.png", "keywords": ["😺", "grinning", "cat", "face", "mouth", "open", "smile"], "description": "grinning cat face (cat, face, grinning cat face, mouth, open, smile)\n", "text": "😺" }]

    constructor(private httpClient: HttpClient) { }

    searchEmoji(keyword: string): Promise<Emoji[]> {
        // mock response
        if (!environment.production) {
            return new Promise<Emoji[]>((resolve, reject) => resolve(this.mockResponse));
        }
        return this.httpClient
            .get<Emoji[]>(`/find?q=${keyword}`)
            .toPromise();
    }
}
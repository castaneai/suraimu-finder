import { FreshContext, type Handlers } from "$fresh/server.ts"
import { createThothClient } from "jsr:@octo/thoth"

export type Emoji = {
    title: string
    keywords: string[]
    imageUrl: string
}

const kv = await Deno.openKv()
const thoth = createThothClient(kv, 3)

export const handler: Handlers<Emoji[]> = {
    async GET(req: Request, ctx: FreshContext) {
        const query = new URL(req.url).searchParams.get("q")
        const results = ctx.config.dev ? dummyResponse : (query ? await searchEmojis(kv, query) : [])
        return new Response(JSON.stringify(results), {headers: {"content-type": "application/json"}});
    },
}

async function searchEmojis(kv: Deno.Kv, query: string): Promise<Emoji[]> {
    return (await kv.getMany(await searchEmojiKeys(query)))
        .map(r => r.value as Emoji)
}

async function searchEmojiKeys(query: string): Promise<string[][]> {
    return Object.keys(await thoth.search(query)).map(k => ["emojis", k])
}

const dummyResponse = JSON.parse(`[{"title":"😀","keywords":["grinning","face","grin"],"imageUrl":"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Noto_Emoji_KitKat_1f600.svg/512px-Noto_Emoji_KitKat_1f600.svg.png"},{"title":"😁","keywords":["beaming","face","with","smiling","eyes","eye","grin","smile"],"imageUrl":"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Noto_Emoji_KitKat_1f601.svg/512px-Noto_Emoji_KitKat_1f601.svg.png"},{"title":"😂","keywords":["face","with","tears","of","joy","laugh","tear"],"imageUrl":"https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Noto_Emoji_KitKat_1f602.svg/512px-Noto_Emoji_KitKat_1f602.svg.png"}]`)

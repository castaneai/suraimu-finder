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
    let results: Emoji[] = []
    // The maximum number of keys given to kv.getMany is 10
    for (const keys of chunks(await searchEmojiKeys(query), 10)) {
        results = results.concat((await kv.getMany(keys, {consistency: "eventual"})).map(r => r.value as Emoji))
    }
    return results
}

async function searchEmojiKeys(query: string): Promise<string[][]> {
    const emojis = Object.keys(await thoth.search(query))
    return Array.from(new Set(emojis)).map(k => ["emojis", k])
}

function chunks<T>(array: T[], size: number): T[][] {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
      array.slice(i * size, (i + 1) * size),
    )
}

const dummyResponse = JSON.parse(`[{"title":"😀","keywords":["grinning","face","grin"],"imageUrl":"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Noto_Emoji_KitKat_1f600.svg/512px-Noto_Emoji_KitKat_1f600.svg.png"},{"title":"😁","keywords":["beaming","face","with","smiling","eyes","eye","grin","smile"],"imageUrl":"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Noto_Emoji_KitKat_1f601.svg/512px-Noto_Emoji_KitKat_1f601.svg.png"},{"title":"😂","keywords":["face","with","tears","of","joy","laugh","tear"],"imageUrl":"https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Noto_Emoji_KitKat_1f602.svg/512px-Noto_Emoji_KitKat_1f602.svg.png"}]`)

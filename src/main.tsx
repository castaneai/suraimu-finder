import { Hono } from "jsr:@hono/hono"
import { createThothClient } from "jsr:@octo/thoth";
import { Layout, View } from "../src/view.tsx";

const app = new Hono()
const kv = await Deno.openKv()
const thoth = createThothClient(kv, 3)

app.get('/', (c) => c.html(<Layout><View /></Layout>))

app.get('/find', async (c) => {
    const query = c.req.query("q")
    const results = query ?
        (await kv.getMany(await searchEmojiKeys(query))).map(r=> r.value) : []
   return c.json(dummyResponse)
})

Deno.serve(app.fetch)

async function searchEmojiKeys(query: string): Promise<string[][]> {
    return Object.keys(await thoth.search(query)).map(k => ["emojis", k])
}

const dummyResponse = JSON.parse(`[{"title":"😀","keywords":["grinning","face","grin"],"imageUrl":"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Noto_Emoji_KitKat_1f600.svg/512px-Noto_Emoji_KitKat_1f600.svg.png"},{"title":"😁","keywords":["beaming","face","with","smiling","eyes","eye","grin","smile"],"imageUrl":"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Noto_Emoji_KitKat_1f601.svg/512px-Noto_Emoji_KitKat_1f601.svg.png"},{"title":"😂","keywords":["face","with","tears","of","joy","laugh","tear"],"imageUrl":"https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Noto_Emoji_KitKat_1f602.svg/512px-Noto_Emoji_KitKat_1f602.svg.png"}]`)
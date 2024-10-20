import { DOMParser } from "jsr:@b-fuze/deno-dom";
import { createThothClient } from "jsr:@octo/thoth";

type EmojiInfo = {
    title: string,
    imageUrl: string,
    keywords: string[],
}

async function* fetchCategoryMembers(categoryName: string): AsyncGenerator<EmojiInfo> {
    const apiUrl = "https://commons.wikimedia.org/w/api.php"
    const params = new URLSearchParams({
        format: "json",
        action: "query",
        generator: "categorymembers",
        gcmtype: "file",
        gcmtitle: `Category:${categoryName}`,
        gcmlimit: "3",
        prop: "imageinfo",
        iiprop: "url|extmetadata",
        iiextmetadatafilter: "ImageDescription|ObjectName",
        iiurlwidth: "480",
    })
    let cont_params: {[key: string]: string} | null = {}
    do {
        for (const key in cont_params) {
            params.set(key, cont_params[key])
        }
        const url = `${apiUrl}?${params}`
        const resp = await (await fetch(url)).json()
        for (const [key, item] of Object.entries<any>(resp["query"]["pages"])) {
            const imageInfo = item["imageinfo"][0]
            yield {
                title: item["title"],
                imageUrl: imageInfo["thumburl"],
                keywords: extractKeywordsFromApi(imageInfo["extmetadata"]["ImageDescription"]["value"]),
            }
        }
        cont_params = resp["continue"]
    } while (cont_params)
}

function extractKeywordsFromApi(description: string): string[] {
    const matches = /<b>Annotations:<\/b>(.+)/.exec(description)
    if (!matches) return []
    return matches[1].split(",").map(v => v.trim())
}

function extractKeywords(description: string): string[] {
    return Array.from(new Set(description.match(/\w+/g)))
}

function* fetchEmojis(source: string): Generator<EmojiInfo> {
    const doc = new DOMParser().parseFromString(source, "text/html")
    for (const elem of doc.querySelectorAll("table tbody tr:not(:first-child)")) {
        const keywords = extractKeywords(elem.children[2].innerText.trim())
        const emojiAsText = elem.children[3].innerText.trim()
        const src = elem.children[7].querySelector("img")?.attributes.getNamedItem("src")?.value
        if (!src) {
            continue
        }
        yield {
            title: emojiAsText,
            keywords: keywords,
            imageUrl: src.replace("48px-", "512px-"),
        }
    }
}

function* take<T>(gen: Generator<T>, length: number): Generator<T> {
    while (length-- > 0) yield gen.next().value;
}

const databaseId = Deno.env.get("DENO_KV_DATABASE_ID")
const kv = await Deno.openKv(`https://api.deno.com/databases/${databaseId}/connect`)
const thoth = createThothClient(kv, 3)
await thoth.flash()

const source = (new TextDecoder("utf-8")).decode(await Deno.readFile("source.html"))
const gen = fetchEmojis(source)
for (const emoji of take(gen, 3)) {
    console.log(`${emoji.title} (${emoji.keywords.join(' ')})`)
    await thoth.register(emoji.keywords, emoji.title)
    await kv.set(["emojis", emoji.title], emoji)
}
const keys = Object.keys(await thoth.search("face")).map(k => ["emojis", k])
for (const result of await kv.getMany(keys)) {
    console.log(result)
}

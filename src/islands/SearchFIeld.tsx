import { useEffect, useState } from "preact/hooks"
import { useDebounce } from "./useDebounce.ts"
import type { JSX } from "preact/jsx-runtime"
import type { Emoji } from "../routes/find.ts"

export default function SearchField() {
    const [keyword, setKeyword] = useState('')
    const debounced = useDebounce(keyword, 500)
    const [results, setResults] = useState<Emoji[]>([])

    useEffect(() => {
        if (!debounced) return
        const ctr = new AbortController()
        fetch(`/find?q=${encodeURIComponent(debounced)}`, { signal: ctr.signal }).then(async (resp)=> {
            setResults(await resp.json())
        })

        return () => ctr.abort()
    }, [debounced])

    return <div class="search">
        <input type="text" placeholder="キーワードを入力！（例：face）" onInput={(e: JSX.TargetedEvent<HTMLInputElement, Event>) => setKeyword(e.currentTarget.value)}  />
        <ul class="search-result">
            {results.map(emoji => <li key={emoji.title}>
                <a href={emoji.imageUrl} target="_blank">
                    <img src={emoji.imageUrl.replace("512px-", "48px-")} alt={emoji.title} />
                    <p className="desc">{emoji.keywords.join(" ")}</p>
                </a>
            </li>)}
        </ul>
    </div>
}

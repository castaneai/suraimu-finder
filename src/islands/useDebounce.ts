// https://scrapbox.io/takker/useDebounce
import { useState, useEffect } from "preact/hooks"

export const useDebounce = <T>(value: T, interval: number): T => {
    const [debounced, setValue] = useState<T>(value)
    const [_timer, setTimer] = useState<number | undefined>(undefined)

    useEffect(() => setTimer((old) => {
        clearTimeout(old)
        return setTimeout(() => setValue(value), interval)
    }), [value, interval]);

    return debounced
}

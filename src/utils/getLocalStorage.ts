export function getLocalStorage(key: string) {
    const data = localStorage.getItem(key)
    const parseData = data && JSON.parse(data)

    return parseData // possible null
}
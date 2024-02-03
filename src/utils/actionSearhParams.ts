type Param = string | number
type Params = {
    [key: string]: Param | Param[] | null
}

export function actionSearhParams(params: Params, search?: string | URLSearchParams) {
    const newParams = new URLSearchParams(search)
    let notifiedByPage = false

    for (const [ key, value ] of Object.entries(params)) {
        if (key === 'page') {
            notifiedByPage = true
        }

        if (value === null) {
            newParams.delete(key)
        } else if (Array.isArray(value)) {
            newParams.delete(key)
            value.forEach(item => newParams.append(key, item.toString()))
        } else {
            newParams.set(key, value.toString())
        }
    }

    if (!notifiedByPage) {
        newParams.delete('page')
    }

    //console.log(newParams)

    return newParams
}

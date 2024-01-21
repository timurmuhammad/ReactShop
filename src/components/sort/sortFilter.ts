import { SortType, sortDefault } from "../types/sortedType";
import { Product } from "../types/productType";

export function sortFilter(goods: Product[], params: URLSearchParams) {
    const sortKey = params.get('sort') || ''
    const sortValue = SortType[sortKey as keyof typeof SortType] || sortDefault
    
    const sortGoods = goods.sort((a: Product, b: Product) => {
        switch (sortValue) {
            case SortType.expensive:
                return a.id - b.id
            case SortType.cheap:
                return b.id - a.id
            case SortType.rating:
                return a.name.localeCompare(b.name)
            default:
                return 0
        }
    })

    return sortGoods
}
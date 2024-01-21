import { Product } from "../types/productType";

export function searchFilter(goods: Product[], query: string) {
    const filterGoods = goods.filter((item: Product) => (
        item.name.toLowerCase().startsWith(query.toLowerCase())
    ))
    return filterGoods
}
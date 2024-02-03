import { ProductType } from "../types/productType";

export function searchFilter(goods: ProductType[], query: string) {
    const filterGoods = goods.filter((item: ProductType) => (
        item.name.toLowerCase().startsWith(query.toLowerCase())
    ))
    return filterGoods
}
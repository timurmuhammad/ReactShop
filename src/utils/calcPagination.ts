
export function calcPagination(limitPage: number, amountGoods: number, currentPage: number) {
    const amountPages = Math.ceil(amountGoods / limitPage)
    const amountPerPages = limitPage * currentPage
    const missingGoods = amountPages - currentPage === 0 ? amountPerPages - amountGoods : 0
    const goodsCurrentPage = limitPage - missingGoods

    return {
        amountPages,
        amountPerPages,
        missingGoods,
        goodsCurrentPage
    }
}
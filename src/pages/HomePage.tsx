import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'

import './pages.css'
import { Product, Sceleton } from '../components/product/product'
import { ProductType } from '../components/types/productType'
import { Sort } from '../components/sort'
import { Pagination } from '../components/pagination'
import { SizeFilter } from '../components/sizeFilter/index'
import { sortFilter } from '../components/sort/sortFilter'
import { searchFilter } from '../components/search/searchFilter'
import { Footer } from '../components/footer'
import { calcPagination } from '../utils/calcPagination'

type Props = {
    applyValueSearch: string
    setItemsSearch: (value: ProductType[]) => void
}

export const Home: React.FC<Props> = ({ applyValueSearch, setItemsSearch }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [goods, setGoods] = useState<ProductType[]>([])
    const [getJson, setGetJson] = useState([])

    const getJsonRef = useRef(false)
    const [ searchParams, setSearchParams ] = useSearchParams()
    const currentPage = +(searchParams.get('page') || 1)
    const limitPage = 12

    const checkPagination = calcPagination(limitPage, goods.length, currentPage)
    
    //https://653537a0c620ba9358ec45f8.mockapi.io/items
    useEffect(() => {
        setIsLoading(true)
        fetch('https://658eab4a2871a9866e799292.mockapi.io/goods')
        .then((res) => res.json())
        .then((json) => {
            setGetJson(json)
            
            let filter: ProductType[] = []
            const query = searchParams.get('search') || ''

            if (query && query.length > 0) {
                filter = searchFilter(json, query)
            }

            const filterGoods = filter.length > 0 ? filter : json
            const sortGoods = sortFilter(filterGoods, searchParams)
            setGoods(sortGoods)
            setIsLoading(false)
        })
    }, [ searchParams, currentPage ])

    useEffect(() => {
        if (getJsonRef.current) {
            const filterSearch = applyValueSearch && searchFilter(getJson, applyValueSearch)
            setItemsSearch(filterSearch || [])
        }
        getJsonRef.current = true
    }, [ applyValueSearch, getJson, setItemsSearch ])

    return <>
        <div className='home'>
            <div className='filters'>
                <div className="filters__container _container">
                    <SizeFilter
                        params={searchParams}
                        setParams={(params) => setSearchParams(params)}
                    ></SizeFilter>
                    <Sort params={searchParams} setParams={setSearchParams}></Sort>
                </div>
            </div>
            <div className='Products _container'>
                {
                (isLoading) ? [...new Array(checkPagination.goodsCurrentPage)].map((isNull, index) => {
                    return <Sceleton key={index}></Sceleton>
                })
                : (goods.map((product: ProductType, index) => (
                    index < checkPagination.amountPerPages && index >= checkPagination.amountPerPages - limitPage && 
                    <Product
                        name = {product.name}
                        price = {product.id}
                        createdAt = {product.createdAt}
                        id = {product.id}
                        key = {product.id}
                    ></Product>
                )))
                }
            </div>

            {goods.length > 0 && goods.length > limitPage && 
            <Pagination 
                //onChangePage={setCurrentPage} 
                amountPages={checkPagination.amountPages}
                params={searchParams} 
                setParams={setSearchParams}
            ></Pagination>}

            <Footer></Footer>
        </div>
    </>
}

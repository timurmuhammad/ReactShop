import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Products, Sceleton } from '../components/products'
import { Product } from '../components/types/productType'
import { SortType, sortDefault } from '../components/types/sortedType'
import { Sort } from '../components/sort'
import { Pagination } from '../components/pagination'
import { SizeFilter } from '../components/sizeFilter/index'
import './Cart.css'

type Props = {
    applyValueSearch: string
    setItemsSearch: (value: Product[]) => void
}

export const Home: React.FC<Props> = ({ applyValueSearch, setItemsSearch }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [goods, setGoods] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [getJson, setGetJson] = useState([])
    const getJsonRef = useRef(false)

    const [ searchParams, setSearchParams ] = useSearchParams()

    const limitPage = 8

    //https://653537a0c620ba9358ec45f8.mockapi.io/items
    useEffect(() => {
        setIsLoading(true)
        fetch('https://658eab4a2871a9866e799292.mockapi.io/goods')
        .then((res) => res.json())
        .then((json) => {
            setGetJson(json)
            
            let filter = []
            const query = searchParams.get('search') || ''
            const sortKey = searchParams.get('sort') || ''
            const sortValue = SortType[sortKey as keyof typeof SortType] || sortDefault

            if (query && query.length > 0) {
                filter = json.filter((item: Product) => (
                    item.name.toLowerCase().startsWith(query.toLowerCase())
                ))
            }
            const filterGoods = filter.length > 0 ? filter : json

            const sortGoods = filterGoods.sort((a: Product, b: Product) => {
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
            setGoods(sortGoods)
            setIsLoading(false)
        })
    }, [ searchParams, currentPage ])

    useEffect(() => {
        if (getJsonRef.current) {
            const filterSearch = applyValueSearch && getJson.filter((item: Product) => (
            item.name.toLowerCase().startsWith(applyValueSearch.toLowerCase())
            ))
            setItemsSearch(filterSearch || [])
        }
        getJsonRef.current = true
    }, [ applyValueSearch, getJson ])

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
            <div className='Products'>
                {
                (isLoading) ? [...new Array(44)].map((isNull, index) => {
                    return <Sceleton key={index}></Sceleton>
                })
                : (goods.map((product: Product) => (
                    <Products
                        name = {product.name}
                        price = {product.id}
                        createdAt = {product.createdAt}
                        id = {product.id}
                        key = {product.id}
                    ></Products>
                )))
                }
            </div>
            <Pagination 
                value={currentPage} 
                onChangePage={(i: number) => setCurrentPage(i)} 
                limit={limitPage} 
                ammountGoods={goods.length}></Pagination>
        </div>
    </>
}

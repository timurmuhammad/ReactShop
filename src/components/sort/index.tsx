import { useState, useRef, memo } from 'react'

import './sort.css'
import { SortType, sortDefault } from '../types/sortedType'
import { useClickOutside } from '../../hooks/onClickOutside'
import { actionSearhParams } from '../../utils/actionSearhParams'

type Props = {
    params: URLSearchParams
    setParams: (params: URLSearchParams) => void
}

export const Sort: React.FC<Props> = memo(({ params, setParams } ) => { // params => required
    const [open, setOpen] = useState(false)
    const sortRef = useRef(null)

    const locationSearch = new URLSearchParams(window.location.search)
    const sortKey = locationSearch.get('sort')
    const sortValue = sortKey ? SortType[sortKey as keyof typeof SortType] : sortDefault

    useClickOutside(sortRef, () => setOpen(false))

    function onClickListItem(sortType: SortType) {
        const urlSort = Object.keys(SortType).find(key => (
            SortType[key as keyof typeof SortType] === sortType
        ))

        if (urlSort) {
            const newParams = actionSearhParams({ 'sort': urlSort }, locationSearch)
            setParams(newParams)
        }
        setOpen(false)
    }

    return <>
        <div className="sort" ref={sortRef}>
            <div 
                onClick={() => setOpen(!open)} 
                className={
                    open ? 'sort__value _active' : 'sort__value'
                }>
                {sortValue}
            </div>

            <div className={open ? "sort__popup _active" : "sort__popup"}>
                <ul className="sort__list">
                    { Object.values(SortType).map((sortType, index) => (
                            sortType !== sortValue && 
                            <div
                                className='sort__type' 
                                key={index} 
                                onClick={() => open && onClickListItem(sortType)}>
                                {sortType}
                            </div>
                    ))}
                </ul>
            </div>
        </div>
    </>
}, (prevProps, nextProps) => (
    prevProps.params.get('sort') === nextProps.params.get('sort')
))
import { useRef, useState, useCallback, memo } from 'react'
import { Link } from 'react-router-dom'

import './search.css'
import { Product } from '../types/productType'
import { useClickOutside } from '../../utils/onClickOutside'
import { debounce } from '../../utils/debounce'
import { actionSearhParams } from '../../utils/actionSearhParams'

type Props = {
    applyOnSearchValue: (valueSearch: string) => void
    querySearch: Product[]
    params: URLSearchParams
    setParams: (params: URLSearchParams) => void
}

export const Search: React.FC<Props> = memo(({ 
    applyOnSearchValue, 
    querySearch, 
    params, // params => required
    setParams }) => {

    const locationSearch = new URLSearchParams(window.location.search)
    const currentSearch = locationSearch.get('search')

    const [searchValue, setSearchValue] = useState(currentSearch || '')
    const inputRef = useRef<HTMLInputElement>(null)
    const searchRef = useRef(null)
    const [ open, setOpen ] = useState(false)

    useClickOutside(searchRef, () => {
        setOpen(false)
    }, () => {
        setOpen(true)
    }, inputRef)

    function sendingQuery(value: string) {
        const newPrams = actionSearhParams({ 'search': value }, locationSearch)
        setParams(newPrams)
    }

    const appliedQuery = useCallback(
        debounce(applyOnSearchValue, 1000),
        []
    );

    function handleQueryChange(value: string) {
        setSearchValue(value)
        appliedQuery(value)
    }

    return <div className="search" ref={searchRef}>
        <div className='search__body'>
            <input 
                ref={inputRef} 
                value={searchValue} 
                onChange={event => handleQueryChange(event.target.value)} 
                className='search__input' 
                type="text" 
                placeholder="Введіть для пошуку..."
            />
            {searchValue.length > 0 && <div className='search__cleare' onClick={() => {
                setSearchValue('')
                applyOnSearchValue('')
                inputRef.current && inputRef.current.focus()
            }}></div>}
            </div>
        <div className="search__go-icon" onClick={() => {
            if (searchValue.length > 0) {
                sendingQuery(searchValue)
                setOpen(false)
            }
        }}></div>
        
        <div className={open ? "search__list _active" : "search__list"}>
            {querySearch.map((item) => (
                <Link 
                    to={`${item.id}`} 
                    relative='path' 
                    className="search__item" 
                    onClick={() => setOpen(false)} 
                    key={item.id}>{item.name}
                </Link>
            ))}
        </div>
    </div>
}, (prevProps, nextProps) => (
    prevProps.params.get('search') !== nextProps.params.get('search') ||
    JSON.stringify(prevProps.applyOnSearchValue) !== JSON.stringify(nextProps.applyOnSearchValue) ||
    JSON.stringify(prevProps.querySearch) !== JSON.stringify(nextProps.querySearch) ? false : true
))
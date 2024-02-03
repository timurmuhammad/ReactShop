import { useState, useRef, memo } from 'react'

import { sizeType } from '../types/sizeType'
import { useClickOutside } from '../../hooks/onClickOutside'
import {actionSearhParams  } from '../../utils/actionSearhParams'
import './sizeFilter.css'

type Props = {
    params: URLSearchParams    
    setParams: (params: URLSearchParams) => void
}

export const SizeFilter: React.FC<Props> = memo(({ params, setParams }) => { // params => required
    const [ open, setopen ] = useState(false)
    const sizeRef = useRef(null)

    const locationSearch = new URLSearchParams(window.location.search)
    const selected = locationSearch.getAll('sizes')

    useClickOutside(sizeRef, () => setopen(false))

    function onChoose(item: sizeType) {
        const urlSizes = selected.includes(item) 
            ? selected.filter(el => el !== item)
            : [...selected, item];
    
        if (urlSizes) {
            const newParams = actionSearhParams({ 'sizes': urlSizes }, locationSearch);
            setParams(newParams);
        }
    }

    return <div className="size-filter" ref={sizeRef}>
        <div className={open ? "size-filter__inner _active" : "size-filter__inner"}>
            <div className="size-filter__title" onClick={() => {
                !open && setopen(true)
            }}>
                Розмір
                <div className="size-filter__icon" onClick={() => {
                    open && setopen(false)
            }}></div>
            </div>
            <div className="size-filter__values">
                {Object.values(sizeType).map((size, index) => (
                    <div 
                        onClick={() => {
                            open && onChoose(size)
                        }} 
                        key={index} 
                        className={
                            selected.includes(size) 
                            ? "size-filter__item _active" 
                            : "size-filter__item"
                        }>
                        {size}
                    </div>
                ))}
            </div>
        </div>
        <div className="size-filter__selected">
            {selected.map((item, index) => (
                <p className="size-filter__selected-item" key={index}>{item}</p>
            ))}
        </div>
    </div>
}, (prevProps, nextProps) => (
    JSON.stringify(prevProps.params.getAll('sizes')) === JSON.stringify(nextProps.params.getAll('sizes'))
))

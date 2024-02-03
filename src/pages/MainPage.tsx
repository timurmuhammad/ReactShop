//import { Outlet } from "react-router-dom"

import { useRef, useState } from 'react'
import { Footer } from '../components/footer'
import { PeopleCategory } from '../components/types/categoryType'
import { actionSearhParams } from '../utils/actionSearhParams'
import './pages.css'
import { useSearchParams, useNavigate } from 'react-router-dom'

export const Main = () => {
    const [ searchParams, setSearchParams ] = useSearchParams()
    const locationSearch = new URLSearchParams(window.location.search)
    const category = locationSearch.getAll('category')
    const categoryRef = useRef<string[]>()
    const navigate = useNavigate()

    function onChangeCategory(arg?: string[]) {
        categoryRef.current = category
        const selectedCategory = arg || category
        let amountItem = 0

        const foundKey = selectedCategory.reduce((current, accum) => current[accum], PeopleCategory)
        const result = Object.entries(foundKey).map((item) => {
            item[1].name && amountItem++

            return typeof item[1].name && {
                key: item[0],
                value: item[1]
            }
        })
        amountItem === 0 && setTimeout(() => navigate('/home'), 400)

        return result
    }

    return <>
        <div className='top-block'>
            <div className={category.length > 0 ? 'main-banner _active' : 'main-banner'}></div>
    
            {category.length > 0 && <div key={categoryRef.current && '0' + categoryRef.current[categoryRef.current.length - 1]} className={`category _${categoryRef.current && categoryRef.current[categoryRef.current.length - 1]}`}>{onChangeCategory(categoryRef.current).map((item, index) => 
            <div className='category-current__body'>
                {item.value.name && <li key={`category ${index}`} className='category__name'>{`${item.value.name} `}</li>}
                {item.value.name && <img key={`category ${index}`} className='category__image' src={item.value.location}
                    ></img>}
            </div>
            )}</div>}
    
            {category.length > 0 && <div key={'1' + category[category.length - 1]} className={`category-current _${category[category.length - 1]}`}>{onChangeCategory().map((item, index) => 
                <div className='category-current__body'>                
                    {item.value.name && <img key={`category-current ${index}`} className='category__image' src={item.value.location}
                    ></img>}

                    {item.value.name && <li key={`category-current ${index}`} className='category__name' onClick={() => {
                    //setCategory([...category, item.key])
                    const newParams = actionSearhParams({'category': [...category, item.key]}, locationSearch)
                    setSearchParams(newParams)}
                }>{item.value.name}</li>}
                </div>

                
            )}</div>}
        </div>

        <ul className="people-category__wrapper">
            {Object.entries(PeopleCategory).map(([ key, value]) => (
                <li key={key} className={"people-category"} onClick={() => {
                    //setCategory([key])
                    const newParams = actionSearhParams({'category': key})
                    setSearchParams(newParams)
                }}>
                    <img className='people-category__image' src={value.location} />
                    <p className="people-category__name">{value.name}</p>
                </li>
            ))}
        </ul>

        <ul className="Popular-category__wrapper">
            <li className='Popular-category'></li>
            <li className='Popular-category'></li>
            <li className='Popular-category'></li>
            <li className='Popular-category'></li>
            <li className='Popular-category'></li>
            <li className='Popular-category'></li>
        </ul>
    {/* <Outlet /> */}
    <Footer></Footer>
    </>
}

/*const prevItem = categoryRef.current ? categoryRef.current[categoryRef.current.length - 1] : ''
    const currentItem = category[category.length - 1]

    return <>
        <div className='top-block'>
            <div className={category.length > 0 ? 'main-banner _active' : 'main-banner'}></div>
    
            <div 
                key={'category-prev ' + prevItem} 
                className={`category _prev ` + prevItem}>{onChangeCategory(categoryRef.current).map((item, index) => 
                    item.value.name && <li key={`category-prev ${index}`} className='category__name'>{item.value.name}</li>
            )}</div>
    
            <div 
                key={'category-current' + currentItem} 
                className={'category _current ' + currentItem}>{onChangeCategory().map((item, index) => 
                    item.value.name && <li key={`category-current ${index}`} className='category__name' 
                    onClick={() => setCategory([...category, item.key])}>{item.value.name}</li>
            )}</div>
        </div>*/
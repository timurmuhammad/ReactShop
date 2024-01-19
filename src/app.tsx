import { useCallback, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import { Cart } from './pages/Cart'
import { Home } from './pages/Home'
import { Error } from './pages/Error/Error'
import { Main } from './pages/Main'
import { ProductPage } from './pages/Product'

import { Header } from './components/header/header'
import { Product } from './components/types/productType'

import './app.css'

export const App = () => {
    const currentSearch = new URLSearchParams(window.location.search)
    const [ applySearchValue, setApplySearchValue ] = useState(currentSearch.get('search') || '')
    const [listItemSearch, setListItemSearch] = useState<Product[]>([])

    return <>
        <Header 
                applyOnSearchValue={setApplySearchValue}
                querySearch={listItemSearch}
        ></Header>

        <div className="section">
            <Routes>
                <Route path='/'>
                    <Route index element={<Main />}></Route>
                    <Route path='cart' element={<Cart />}></Route>
                    <Route path='home' element={<Home applyValueSearch={applySearchValue} setItemsSearch={setListItemSearch}></Home>}></Route>
                    <Route path='home'>
                        <Route path=':productId' element={<ProductPage />}></Route>
                    </Route>
    
                    <Route path='*' element={<Error />}></Route>
                </Route>
            </Routes>
        </div>

    </>
}



// function sortedChart(statistics) {
//     const entries = Object.entries(statistics)
//     entries.sort((a, b) => b[1] - a[1])
    
//     let sum = 0;

//     for (const key1 of entries) {
//         sum += key1[1];
//     }
//     const newStatistics = {}
//     for (const key2 of entries) {
//         newStatistics[key2[0]] = (360 * key2[1]) / sum
//     }
//     return newStatistics
// }
// const newStatistic = sortedChart(window.pricesGlobal)
// console.log(newStatistic)

// function chart(chartStatistic) {  
//     let degrees = 360
//     const entries = Object.entries(chartStatistic)

//     const canvas = document.getElementById('canvas')
//     const ctx = canvas.getContext('2d');
//     canvas.width = '300'
//     canvas.height = '300'
//     const center = canvas.width / 2

//     for (const entrie of entries) {
//         ctx.beginPath()
//         ctx.strokeStyle = `${entrie[0]}`
//         ctx.lineCap = 'round'
//         ctx.fillStyle = `${entrie[0]}`

//         for (let i = 0; i <= 100; i += 25) {
//             ctx.translate(center, center);
//             ctx.rotate((Math.PI / 180) * ((i * degrees) / 100));

//             (i !== 0) && ctx.lineTo(0, -canvas.width)

//             ctx.moveTo(0, 0);
//             ctx.lineTo(0, -canvas.width);
//             ctx.stroke()
//             ctx.setTransform(1, 0, 0, 1, 0, 0);
//         }

//         degrees -= entrie[1]
//         ctx.fill();
//     }
// }
// chart(newStatistic)


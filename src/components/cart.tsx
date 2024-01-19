import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'

import {removeToCart } from '../redux/slices/cartSlice'
import { Rootstate } from '../redux/store'
import './cart.css'

export const CartOnHeader = () => {
    const items = useSelector((state: Rootstate) => state.cart.goods)
    const dispatch = useDispatch()
    const firstRender = useRef(false)

    useEffect(() => {
        if (firstRender) {
            const json = JSON.stringify(items)
            localStorage.setItem('items', json)
        }
        firstRender.current = true
    }, [ items ])

    return <div className="cart">
        <Link to='/cart' className="cart__icon-body">
            <svg className='cart__icon' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/></svg>
            {(items && items.length > 0) && <b className='cart__amount'>
                {items.length}
            </b>}
        </Link>
        {items && items.length > 0 ?
        <>
            <div className="cart__list">
                <ul className="cart__list-body">
                    { items.length > 0 && (
                        items.map(el => {
                            return <li className="Cart__order" key={el.product.id}>{el.product.id}
                                <div 
                                    className='delete' 
                                    onClick={() => dispatch(removeToCart(el.product.id))}>
                                </div>
                            </li>
                        })
                    )}
                </ul>
                <div className="cart__total-order">
                    Итого: {items.reduce((sum, order) => (
                        sum + order.product.price * order.amountProduct
                    ), 0)}
                </div>
            </div>
        </>
        : <div className="cart__list">
            <div className="cart__list-body">Корзина пуста</div>
        </div>
        }
    </div>
}

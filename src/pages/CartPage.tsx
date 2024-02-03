import { useSelector, useDispatch } from "react-redux"
import { increment, decrement, removeToCart } from '../redux/slices/cartSlice'
import { Rootstate } from '../redux/store'
import './pages.css'

export const Cart = () => {
    const orders = useSelector((state: Rootstate) => state.cart.goods)
    const dispatch = useDispatch()
    return <div className="cart1">
        <ul className="cart1__list">
            {orders.map(order => {
                return <li className="cart__order1" key={order.product.id}>
                    {order.product.name}
                    <div className="cart__amount1">
                        <span className="cart__counter" 
                        style={{
                            color: order.amountProduct <= 1 ? "#fff" : undefined,
                        }}
                        onClick={() => dispatch(decrement(order.product.id))}>-</span>
                        <span className="cart__number1">{order.amountProduct}</span>
                        <span className="cart__counter" onClick={() => dispatch(increment(order.product.id))}>+</span>
                    </div>
                    <div className='delete1' onClick={() => dispatch(removeToCart(order.product.id))}></div>
                </li>
            })}
        </ul>
        <div className="cart__total-order1">
                    Итого: {orders.reduce((sum, order) => sum + order.product.price * order.amountProduct, 0)}
                </div>
    </div>
}
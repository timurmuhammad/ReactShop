import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/slices/cartSlice'
import './products.css'
import { Product } from './types/productType'
import { Link } from 'react-router-dom'

export const Products: React.FC<Product> = ({ name, price, createdAt, id }) => {

    const dispatch = useDispatch()

    return <Link to={`${id}`} className="Product">
        <h2 className='Product__title'>
            {name}
        </h2>
        <p className='Product__price' onClick={(event) => {
            event. preventDefault()
            return dispatch(addToCart({name, price, createdAt, id}))
        }}
            style={{
                backgroundColor: "green",
            }}
        >
            {`Price: ${price} `}
            {price === 0 && '* '}
        </p>
        <p className='Product__description'>
            {createdAt}
        </p>
    </Link>
}

export const Sceleton = () => {
    return <div className="sceleton">
        
    </div>
}

// export const Cart = () => {
//     return <div className="cart">
//         1
//     </div>
// }

/*import './header.css'

function colorPrice(price) {
    if (price < 1000) {
        return 'red'
    } else if (price < 2000) {
        return 'orange'
    }
    else if (price < 5000) {
        return 'green'
    }
    return 'blue'
}
window.pricesGlobal = {};

export const Header = ({ title, price, description, }) => {
    if (!window.pricesGlobal[colorPrice(price)]) {
        window.pricesGlobal[colorPrice(price)] = price
    } else {
        window.pricesGlobal[colorPrice(price)] += price
    }


    return <div className="Product">
        <h2 className='Product__title'>
            {title}
        </h2>
        <p className='Product__price'
            style={{
                backgroundColor: colorPrice(price),
            }}
        >
            {`Price: ${price} `}
            {price === 0 && '* '}
        </p>
        <p className='Product__description'>
            {description}
        </p>
    </div>
}
console.log(window.pricesGlobal)

function truncedOverflow(element) {
    const elementStyle = getComputedStyle(element)
    if (elementStyle.overflow === 'hidden') {
        const lineHeight = parseInt(elementStyle.lineHeight)
        const height = parseInt(elementStyle.height)
        const paddingTop = parseInt(elementStyle.paddingTop)
        const paddingBottom = parseInt(elementStyle.paddingBottom)

        const amountOfLines = (elementStyle.boxSizing === 'border-box') 
        ? +((height - (paddingTop + paddingBottom)) / lineHeight).toFixed(1) 
        : +(height / lineHeight).toFixed(1)

        const overflow = (amountOfLines - amountOfLines.toFixed()) * lineHeight + paddingBottom
        console.log(elementStyle.boxSizing)
        console.log(height)
        console.log(amountOfLines)
        console.log(overflow)

        const newElement = document.createElement('div')
        newElement.classList.add('after')
        element.append(newElement)

        element.style.position = 'relative';
        newElement.style.cssText = `
            width: 100%;
            height: ${overflow}px;
            position: absolute;
            bottom: 0;
            left: 0;
        `

        let currentElement = element
        let currentStyle = getComputedStyle(currentElement)

        for (let i = 0; i <= 10; i++) {
            if (i === 10) {
                newElement.style.backgroundColor = '#fff'
            }


            if (currentStyle.backgroundColor !== 'rgba(0, 0, 0, 0)') {
                newElement.style.backgroundColor = currentStyle.backgroundColor
                break
            }
            currentElement = currentElement.parentElement
            currentStyle = getComputedStyle(currentElement)
        }
    }
}


const element = document.querySelectorAll('.Product__description')
for (const e of element) {
    truncedOverflow(e)
}

*/
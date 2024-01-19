import './error.css'
import { Link } from 'react-router-dom'

export const Error = () => (
    <div className="error">
        <div className='error__container _container'>
            <h1 className="error__title">Помилка 404</h1>
            <p className="error__not-found">Сторінку не знайдено</p>
            <p className="error__details">Неправильно набрано адресу або такої сторінки на сайті більше не існує.</p>
            <Link to='..' className="error__button">Перейти на головну сторінку</Link>
        </div>
    </div>
)
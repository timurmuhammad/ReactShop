import { Link, useSearchParams } from 'react-router-dom'

import { CartOnHeader } from '../cart'
import { Search } from '../search'
import { Product } from '../types/productType'
import './header.css'

type Props = {
    applyOnSearchValue: (valueSearch: string) => void
    querySearch: Product[]
}

export const Header: React.FC<Props> = ({ applyOnSearchValue, querySearch }) => {
    const [searchParams, setSearchParams ] = useSearchParams()

    return <div className="header">
        <div className='header__container _container'>
            <Link to='/home' className='logo'>Shop</Link>
            <Search 
                applyOnSearchValue={applyOnSearchValue}
                querySearch={querySearch}
                params={searchParams}
                setParams={setSearchParams}
            ></Search>
            <CartOnHeader></CartOnHeader>
        </div>
    </div>
}
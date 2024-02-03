import { memo } from 'react';

import './pagination.css'
import { actionSearhParams } from '../../utils/actionSearhParams';

type Props = {
    amountPages: number
    params: URLSearchParams
    setParams: (params: URLSearchParams) => void
}

export const Pagination: React.FC<Props> = memo(({ amountPages, params, setParams }) => {
    const locationSearch = new URLSearchParams(window.location.search)
    const getCurrentPage = +(locationSearch.get('page') || 1) 

    const onClickPage = (currentPage: number) => {
        const newParams = actionSearhParams({ 'page': currentPage }, locationSearch)
        setParams(newParams)
    }

    return <div className="pagination">
        {
            [...new Array(amountPages)].map((isNull, index) => {
                return <div className={index + 1 === getCurrentPage 
                ? 'pagination__item _active' : 'pagination__item'} 
                onClick={() => {
                    onClickPage(index + 1)
                }} key={index}>
                    {index + 1}
                </div>
            })
        }
    </div>
}, (prevProps, nextProps) => (
    prevProps.params.get('page') !== nextProps.params.get('page') ||
    prevProps.amountPages !== nextProps.amountPages ? false : true
))
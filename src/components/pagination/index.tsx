import './pagination.css'

type Props = {
    value: number;
    onChangePage: (value: number) => void;
    limit: number;
    ammountGoods: number;
}

export const Pagination: React.FC<Props> = ({ value, onChangePage, limit, ammountGoods }) => {
    const ammountPages = Math.ceil(ammountGoods / limit)

    const onClickPage = (currentPage: number) => {
        onChangePage(currentPage)
    }

    return <div className="pagination">
        {
            [...new Array(ammountPages)].map((isNull, index) => {
                return <div className={index + 1 === value 
                ? 'pagination__item _active' : 'pagination__item'} 
                onClick={() => onClickPage(index + 1)} key={index}>
                    {index + 1}
                </div>
            })
        }
    </div>
}
export enum SortType {
    expensive = 'Спочатку дешеві',
    cheap = 'Спочатку дорогі',
    new = 'Новинки',
    old = 'Давні товари',
    rating = 'За рейтингом',
    discounts = 'Спочатку зі знижками',
    reviews = 'Де більше відгуків',
}

export const sortDefault = SortType.rating
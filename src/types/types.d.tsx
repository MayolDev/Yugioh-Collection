

export type Card = {

    id : number,
    name : string,
    type : string,
    desc : string,
    atk : number | null,
    def : number | null,
    level : number | undefined,
    race : string,
    attribute : string | undefined,
    card_images : CardImage[],
    card_prices : CardPrice[],
    cantidad : number | 0
}

export type CardImage = {
    image_url : string,
    image_url_small : string
}

export type CardPrice = {
    cardmarket_price : string,
    tcgplayer_price : string,
    ebay_price : string,
    amazon_price : string,
}

export type Cards = {
    cards : Card[]
}

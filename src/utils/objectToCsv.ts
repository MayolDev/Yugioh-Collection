export interface CardExport {
    [key: string]: string | number | null | undefined | string[] | number[] | CardExport[] | CardExport;
    id: number;
    name: string;
    type: string;
    desc: string;
    atk: number | null;
    race: string;
    def: number | null;
    level: number | undefined;
    attribute: string | undefined;
    card_images: string;
    card_prices: string;
    cantidad: number;
  }

export function arrayObjToCsv(cards : Array<CardExport>) {
    
    const replacer = (_: string, value: string | number | null | undefined) => value === null ? '' : value // specify how you want to handle null values here
    const header = Object.keys(cards[0]) 
    const csv = cards.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
    csv.unshift(header.join(','))

    const csvArray = csv.join('\r\n')
    console.log('csv', csvArray)

    const a = document.createElement("a");
    const file = new Blob([csvArray], {type: 'text/csv'});
    a.href = URL.createObjectURL(file);
    a.target = '_blank';
    a.download = 'myFile.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
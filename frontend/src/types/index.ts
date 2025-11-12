export class ArticleLine{
    id: string;
    name: string;
    details?: string;
    quantity: number;
    price: number;
    total: number;

    constructor(){
        this.id = '';
        this.name = '';
        this.details = '';
        this.quantity = 0;
        this.price = 0;
        this.total = 0;
    }
}
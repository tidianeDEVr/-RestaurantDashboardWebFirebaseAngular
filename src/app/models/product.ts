export interface Product {
    id?:string,
    libelle:string,
    addedAt: Date,
    price: number,
    archived: boolean,
    components: []
}

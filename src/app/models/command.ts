import { Timestamp } from "@angular/fire/firestore";

export interface Command{
    id?: string,
    amount: number,
    client: string,
    commandedAt: Timestamp,
    menus: string,
    payed: boolean,
    quantity: string,
    ready: boolean,
}
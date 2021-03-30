import { IBase, IShoppinglist } from '.';

export interface IItem extends IBase{
    itemName: string,
    subscribers: string[],
    shoppinglists: IShoppinglist[],
    userId: string,
}

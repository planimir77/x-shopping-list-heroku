import { IUser, IBase, IItem } from '.';

export interface IShoppinglist extends IBase {
    [x: string]: any;
    shoppinglistName: string,
    favorite: boolean,
    subscribers: IUser[],
    items: IItem[],
    userId: string,
}

import { IBase, IShoppinglist } from '.';

export interface IUser extends IBase {
    shoppinglists: IShoppinglist[];
    email: string;
    username: string;
    password: string;
}

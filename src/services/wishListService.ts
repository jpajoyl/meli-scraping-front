import { IAddWishList, IWishListItem } from "../models/wishListModel";
import api from "./api";

export async function getWishList() {
    return await api.get<IWishListItem[]>('api/wishlist/')
}

export async function addToWishList(data: IAddWishList) {
    return await api.post(`api/wishlist/`, data);
}

export async function deleteWishList(id: number) {
    return await api.delete(`api/wishlist/${id}/`);
}
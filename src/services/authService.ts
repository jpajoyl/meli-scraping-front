import axios from "axios";
import { ILoginFormData, IRegisterFormData, IUpdateFormData, IUser } from "../models/authModel";
import api from "./api";
import { API_URL } from "../config/AppConfig";


export async function registerUser(formData: IRegisterFormData) {
    return await axios.post(`${API_URL}api/register/`, formData);
}

export async function login(formData: ILoginFormData) {
    return await axios.post(`${API_URL}api/login/`, formData);
}

export async function getUsers() {
    return await api.get<IUser[]>('api/users/')
}

export async function disableUser(id: number) {
    return await api.patch(`api/users/${id}/disable/`)
}

export async function updateUser(id: number, formData: IUpdateFormData) {
    const data = formData.password ? formData : {
        username: formData.username,
        email: formData.email,
        name: formData.name,
        last_name: formData.last_name,
        phone: formData.phone,
        gender: formData.gender,
        role: formData.role
    }
    return await api.put<IUser>(`api/users/${id}/`, data)
}
export async function getProductList(product: string) {
    return await axios.get(`${API_URL}search/?query=${product}`);
}
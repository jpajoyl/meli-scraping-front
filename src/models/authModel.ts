import { GenderChoices, RoleChoices } from "../enums/AuthEnum";


export interface IRegisterFormData {
    username: string | undefined;
    password: string | undefined;
    email: string | undefined;
    name: string | undefined;
    last_name: string | undefined;
    phone: string | undefined;
    gender: string | undefined;
}

export interface IUpdateFormData {
    username: string | undefined;
    password: string | undefined;
    email: string | undefined;
    name: string | undefined;
    last_name: string | undefined;
    phone: string | undefined;
    gender: string | undefined;
    role: keyof typeof RoleChoices;
}

export interface ILoginFormData {
    username: string;
    password: string;
}

export interface IUser {
    u: any;
    id: 1;
    username: string;
    email: string;
    name: string;
    last_name: string;
    phone: string;
    gender: keyof typeof GenderChoices;
    role: keyof typeof RoleChoices;
    state: boolean
}
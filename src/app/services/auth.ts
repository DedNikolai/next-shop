import { User } from "@prisma/client";
import { ApiRoutes } from "./constants";
import { axiosInstance } from "./instance";

export async function getCurrentUser(): Promise<User> {
    const {data} = await axiosInstance.get<User>(`${ApiRoutes.USER}/me`);

    return data;
}

export async function updateCurrentUser(user: {email: string, fullName: string}): Promise<User> {
    const {data} = await axiosInstance.put(`${ApiRoutes.USER}/me`, user);
    return data;
}
'use server';

import { HttpError } from '@/types/http';
import { Session } from '@/types/models';
import fetch from 'node-fetch';

export const login = async (email: string, password: string): Promise<[HttpError|null,Session|null]> => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiUrl = `${baseUrl}/api/auth/sign-in`;
    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const error = await response.json() as HttpError;
        return [error,null];
    }

    const data = await response.json() as Session;
    
    return [null,data];
}

export const register = async (email: string, password: string, full_name: string): Promise<[HttpError|null,Session|null]> => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiUrl = `${baseUrl}/api/auth/sign-up`;
    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, full_name }),
    });

    if (!response.ok) {
        const error = await response.json() as HttpError;
        return [error,null]
    }

    const data = await response.json() as Session;
    
    return [null,data];
}
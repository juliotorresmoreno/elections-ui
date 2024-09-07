'use client';

import { useState } from 'react';
import { HttpError } from '@/types/http';
import { Credentials, Session, User } from '@/types/models';
import { useAppStore } from '@/lib/hooks';
import authSlice from '@/features/auth';

export const useLogin = () => {
  const [error, setError] = useState<HttpError<Credentials> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const store = useAppStore();

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const apiUrl = `${baseUrl}/api/auth/sign-in`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = (await response.json()) as HttpError<Credentials>;
        setError(errorData);
        store.dispatch(authSlice.actions.clearSession());
      } else {
        const sessionData = (await response.json()) as Session;
        store.dispatch(authSlice.actions.setSession(sessionData.user));
        store.dispatch(authSlice.actions.setToken(sessionData.token));
        setError(null);
      }
    } catch (err) {
      setError({
        message: 'An unexpected error occurred',
        statusCode: 500,
      });
        store.dispatch(authSlice.actions.clearSession());
    } finally {
      setIsLoading(false);
    }
  };

  return { login, error, isLoading };
};

export const useRegister = () => {
  const [error, setError] = useState<HttpError<User & Credentials> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const store = useAppStore();

  const register = async (email: string, password: string, full_name: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const apiUrl = `${baseUrl}/api/auth/sign-up`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, full_name }),
      });

      if (!response.ok) {
        const errorData = (await response.json()) as HttpError<User & Credentials>;
        setError(errorData);
      } else {
        const sessionData = (await response.json()) as Session;
        store.dispatch(authSlice.actions.setSession(sessionData.user));
        store.dispatch(authSlice.actions.setToken(sessionData.token));
        setError(null);
      }
    } catch (err) {
      setError({
        message: 'An unexpected error occurred',
        statusCode: 500,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { register, error, isLoading };
};
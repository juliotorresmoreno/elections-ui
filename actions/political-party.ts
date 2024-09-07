'use client';

import { useState, useCallback } from 'react';
import { HttpError } from "@/types/http";
import { PoliticalParty } from "@/types/models";
import { useAppSelector, useAppStore } from '@/lib/hooks';
import authSlice from '@/features/auth';

export const useFindPoliticalParties = () => {
  const [error, setError] = useState<HttpError | null>(null);
  const [data, setData] = useState<Array<PoliticalParty>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = useAppSelector((state) => state.auth.token);
  const store = useAppStore();

  const find = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const apiUrl = `${baseUrl}/api/political-parties`;
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        store.dispatch(authSlice.actions.clearSession());
      }

      if (!response.ok) {
        const errorData = (await response.json()) as HttpError;
        setError(errorData);
        setData([]);
      } else {
        const data = (await response.json()) as Array<PoliticalParty>;
        setData(data);
        setError(null);
      }
    } catch (err) {
      setError({
        message: 'An unexpected error occurred',
        statusCode: 500,
      });
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { find, error, data, isLoading };
};

export const useFindOnePoliticalParty = () => {
  const [error, setError] = useState<HttpError | null>(null);
  const [data, setData] = useState<PoliticalParty | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const token = useAppSelector((state) => state.auth.token);
  const store = useAppStore();

  const findOne = useCallback(async (id: number): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const apiUrl = `${baseUrl}/api/political-parties/${id}`;
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        store.dispatch(authSlice.actions.clearSession());
      }

      if (!response.ok) {
        const errorData = (await response.json()) as HttpError;
        setError(errorData);
        setData(null);
      } else {
        const party = (await response.json()) as PoliticalParty;
        setData(party);
        setError(null);
      }
    } catch (err) {
      setError({
        message: 'An unexpected error occurred',
        statusCode: 500,
      });
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [token, store]);

  return { findOne, error, data, isLoading };
};

export const useCreatePoliticalParty = () => {
  const [error, setError] = useState<HttpError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const token = useAppSelector((state) => state.auth.token);
  const store = useAppStore();

  const create = useCallback(async (party: Omit<PoliticalParty, 'id'>): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const apiUrl = `${baseUrl}/api/political-parties`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(party),
      });

      if (response.status === 401) {
        store.dispatch(authSlice.actions.clearSession());
      }

      if (!response.ok) {
        const errorData = (await response.json()) as HttpError;
        setError(errorData);
      } else {
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
  }, [token, store]);

  return { create, error, isLoading };
};

export const useUpdatePoliticalParty = () => {
  const [error, setError] = useState<HttpError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const token = useAppSelector((state) => state.auth.token);
  const store = useAppStore();

  const update = useCallback(async (id: number, updates: Partial<PoliticalParty>): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const apiUrl = `${baseUrl}/api/political-parties/${id}`;
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });

      if (response.status === 401) {
        store.dispatch(authSlice.actions.clearSession());
      }

      if (!response.ok) {
        const errorData = (await response.json()) as HttpError;
        setError(errorData);
      } else {
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
  }, [token, store]);

  return { update, error, isLoading };
};

export const useRemovePoliticalParty = () => {
  const [error, setError] = useState<HttpError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const token = useAppSelector((state) => state.auth.token);
  const store = useAppStore();

  const remove = useCallback(async (id: number): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const apiUrl = `${baseUrl}/api/political-parties/${id}`;
      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        store.dispatch(authSlice.actions.clearSession());
      }

      if (!response.ok) {
        const errorData = (await response.json()) as HttpError;
        setError(errorData);
      } else {
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
  }, [token, store]);

  return { remove, error, isLoading };
};
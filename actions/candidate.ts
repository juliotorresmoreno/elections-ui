'use client';

import { useState, useCallback } from 'react';
import { HttpError } from "@/types/http";
import { Candidate } from "@/types/models";
import { useAppSelector, useAppStore } from '@/lib/hooks';
import authSlice from '@/features/auth';

export const useFindCandidates = () => {
  const [error, setError] = useState<HttpError | null>(null);
  const [data, setData] = useState<Array<Candidate>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = useAppSelector((state) => state.auth.token);
  const store = useAppStore();

  const find = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const apiUrl = `${baseUrl}/api/candidates`;
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
        const data = (await response.json()) as Array<Candidate>;
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
  }, [token, store]);

  return { find, error, data, isLoading };
};

export const useFindOneCandidate = () => {
  const [error, setError] = useState<HttpError | null>(null);
  const [data, setData] = useState<Candidate | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const token = useAppSelector((state) => state.auth.token);
  const store = useAppStore();

  const findOne = useCallback(async (id: number): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const apiUrl = `${baseUrl}/api/candidates/${id}`;
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
        const candidate = (await response.json()) as Candidate;
        setData(candidate);
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

export const useCreateCandidate = () => {
  const [error, setError] = useState<HttpError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const token = useAppSelector((state) => state.auth.token);
  const store = useAppStore();

  const create = useCallback(async (candidate: Omit<Candidate, 'id'>): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const apiUrl = `${baseUrl}/api/candidates`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(candidate),
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

export const useUpdateCandidate = () => {
  const [error, setError] = useState<HttpError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const token = useAppSelector((state) => state.auth.token);
  const store = useAppStore();

  const update = useCallback(async (id: number, updates: Partial<Candidate>): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const apiUrl = `${baseUrl}/api/candidates/${id}`;
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

export const useRemoveCandidate = () => {
  const [error, setError] = useState<HttpError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const token = useAppSelector((state) => state.auth.token);
  const store = useAppStore();

  const remove = useCallback(async (id: number): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const apiUrl = `${baseUrl}/api/candidates/${id}`;
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

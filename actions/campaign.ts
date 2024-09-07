'use client';

import { useState, useCallback } from 'react';
import { HttpError } from "@/types/http";
import { Campaign } from "@/types/models";
import { useAppSelector, useAppStore } from '@/lib/hooks';
import authSlice from '@/features/auth';

// Hook para encontrar campañas
export const useFindCampaigns = () => {
  const [error, setError] = useState<HttpError | null>(null);
  const [data, setData] = useState<Array<Campaign>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = useAppSelector((state) => state.auth.token);
  const store = useAppStore();

  const find = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const apiUrl = `${baseUrl}/api/campaigns`;
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
        const data = (await response.json()) as Array<Campaign>;
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

// Hook para encontrar una campaña específica
export const useFindOneCampaign = () => {
  const [error, setError] = useState<HttpError | null>(null);
  const [data, setData] = useState<Campaign | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const token = useAppSelector((state) => state.auth.token);
  const store = useAppStore();

  const findOne = useCallback(async (id: number): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const apiUrl = `${baseUrl}/api/campaigns/${id}`;
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
        const campaign = (await response.json()) as Campaign;
        setData(campaign);
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

// Hook para crear una campaña
export const useCreateCampaign = () => {
  const [error, setError] = useState<HttpError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const token = useAppSelector((state) => state.auth.token);
  const store = useAppStore();

  const create = useCallback(async (campaign: Omit<Campaign, 'id'>): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const apiUrl = `${baseUrl}/api/campaigns`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(campaign),
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

// Hook para actualizar una campaña
export const useUpdateCampaign = () => {
  const [error, setError] = useState<HttpError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const token = useAppSelector((state) => state.auth.token);
  const store = useAppStore();

  const update = useCallback(async (id: number, updates: Partial<Campaign>): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const apiUrl = `${baseUrl}/api/campaigns/${id}`;
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

// Hook para eliminar una campaña
export const useRemoveCampaign = () => {
  const [error, setError] = useState<HttpError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const token = useAppSelector((state) => state.auth.token);
  const store = useAppStore();

  const remove = useCallback(async (id: number): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const apiUrl = `${baseUrl}/api/campaigns/${id}`;
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

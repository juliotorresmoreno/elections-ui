

export type HttpError<T = {}> = Partial<Record<keyof T, string>> & {
    error?: string;
    statusCode?: number;
    message?: string;
};

import 'dotenv/config';
type RequestOptions = Omit<RequestInit, 'headers'> & {
  headers?: Record<string, string>;
};

export const createApiClient = (baseUrl?: string) => {
  if (!baseUrl) throw new Error('Invalid BaseUrl');

  const request = async <T>(
    path: string,
    token: string | undefined,
    options: RequestOptions = {},
  ): Promise<T> => {
    const response = await fetch(`${baseUrl}${path}`, {
      ...options,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API error ${response.status}: ${await response.text()}`);
    }

    return response.json() as Promise<T>;
  };

  return {
    get: <T>(path: string, token?: string, options?: RequestOptions) =>
      request<T>(path, token, { ...options, method: 'GET' }),

    post: <T>(
      path: string,
      token?: string,
      body?: unknown,
      options?: RequestOptions,
    ) =>
      request<T>(path, token, {
        ...options,
        method: 'POST',
        body: JSON.stringify(body),
      }),

    put: <T>(
      path: string,
      token?: string,
      body?: unknown,
      options?: RequestOptions,
    ) =>
      request<T>(path, token, {
        ...options,
        method: 'PUT',
        body: JSON.stringify(body),
      }),

    patch: <T>(
      path: string,
      token?: string,
      body?: unknown,
      options?: RequestOptions,
    ) =>
      request<T>(path, token, {
        ...options,
        method: 'PATCH',
        body: JSON.stringify(body),
      }),

    delete: <T>(path: string, token?: string, options?: RequestOptions) =>
      request<T>(path, token, { ...options, method: 'DELETE' }),
  };
};

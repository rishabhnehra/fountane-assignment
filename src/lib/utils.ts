import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

let auth: {
  access_token: string;
  token_type: string;
  expires_in: number;
} | null;

export const getToken = async () => {
  if (!auth) {
    const res = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: 'afdfa234b1a741328981e787f37f1a2a',
        client_secret: 'a3e0243b21da4fa3b9a418db1c8d2e27',
      }),
    });

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
    }

    auth = await res.json();
  }

  return auth;
};

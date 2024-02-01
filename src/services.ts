import { getToken } from './lib/utils';

export const searchAlbums = async (search: string) => {
  const token = await getToken();
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token.access_token}`);

  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${search}&type=album`,
    {
      headers,
    },
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

export const getAlbums = async () => {
  const token = await getToken();
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token.access_token}`);

  const res = await fetch(
    `https://api.spotify.com/v1/browse/new-releases?country=IN`,
    {
      headers,
    },
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

export const getComments = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/${id}`);
  const data = await res.json();

  return data;
};

export const getAlbum = async (id: string) => {
  const token = await getToken();
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token.access_token}`);

  const res = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
    headers,
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

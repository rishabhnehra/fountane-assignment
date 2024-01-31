import { Album } from '@/components/ui/album';
import { getToken } from '@/lib/utils';

export const dynamic = 'force-dynamic';

const getAlbums = async () => {
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

export default async function Home() {
  const data = await getAlbums();

  return (
    <main>
      <div className="m-8 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-8 grid-wra">
        {data?.albums.items.map((album) => {
          return (
            <Album
              key={album.id}
              id={album.id}
              image={album.images[0]}
              name={album.name}
            />
          );
        })}
      </div>
    </main>
  );
}

import { Album } from '@/components/ui/album';
import { Button } from '@/components/ui/button';
import { Comments } from '@/components/ui/comments';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getToken } from '@/lib/utils';
import { Metadata } from 'next';

const getAlbum = async (id: string) => {
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

export const metadata: Metadata = {
  title: 'Album',
};

export default async function AlbumDetail({
  params,
}: {
  params: { id: string };
}) {
  const data = await getAlbum(params.id);

  return (
    <div className="flex h-[calc(100vh-4.6rem)]">
      <div className="flex flex-col items-center gap-4 border-r-2 flex-none basis-2/4">
        <div className="mt-4">
          <Album
            image={{ ...data.images[0], width: 300, height: 300 }}
            name={data.name}
            id={data.id}
          />
        </div>

        <h2 className="text-xl font-bold">{data.name}</h2>
        <p className="text-slate-400 font-semibold">
          {new Date(data.release_date).getFullYear()}
        </p>

        <p className="font-semibold text-slate-400">
          Artists:{' '}
          {data.artists.map((artist) => (
            <span className="text-black" key={artist.id}>
              {artist.name}
              {'  '}
            </span>
          ))}
        </p>

        <div className="mx-4">
          <Tracks data={data.tracks.items} />
        </div>
      </div>
      <div className="flex flex-col gap-4 border-r-2 flex-none basis-2/4">
        <h3 className="m-4 text-2xl font-bold">Comments</h3>
        <div className="flex flex-col gap-4 mx-4">
          <Comments
            comments={[
              {
                id: 1,
                message: 'Hello',
              },
              {
                id: 2,
                message: 'World',
              },
              {
                id: 3,
                message: '!!!',
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

const Tracks = (props: { data: any[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">#</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Duration</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.data.map((track, index) => (
          <TableRow key={track.id}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{track.name}</TableCell>
            <TableCell>{track.duration_ms}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

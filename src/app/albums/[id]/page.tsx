import { Album } from '@/components/ui/album';
import { Comments } from '@/components/ui/comments';
import { Metadata } from 'next';
import { getAlbum, getComments } from '@/services';
import { Tracks } from '@/components/ui/tracks';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Album',
};

export default async function AlbumDetail({
  params,
}: {
  params: { id: string };
}) {
  const data = await getAlbum(params.id);
  const comments = await getComments(params.id);

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
          <Comments id={params.id} comments={comments} />
        </div>
      </div>
    </div>
  );
}

import { LoadingAlbum } from '@/components/ui/album';
import { LoadingTracks } from '@/components/ui/tracks';

export default function loading() {
  return (
    <div className="flex h-[calc(100vh-4.6rem)]">
      <div className="flex flex-col items-center gap-4 border-r-2 flex-none basis-2/4">
        <div className="mt-4">
          <LoadingAlbum />
        </div>

        <h2 className="text-xl font-bold animate-pulse" />
        <p className="text-slate-400 font-semibold animate-pulse" />

        <p className="font-semibold text-slate-400">
          Artists:{' '}
          {Array(5)
            .fill(0)
            .map((artist) => (
              <span className="text-black animate-pulse" key={artist.id}>
                {artist.name}
                {'  '}
              </span>
            ))}
        </p>

        <div className="mx-4">
          <LoadingTracks />
        </div>
      </div>
      <div className="flex flex-col gap-4 border-r-2 flex-none basis-2/4">
        <h3 className="m-4 text-2xl font-bold">Comments</h3>
      </div>
    </div>
  );
}

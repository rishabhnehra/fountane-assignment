import { Album } from '@/components/ui/album';
import { GridContainer } from '@/components/ui/grid-container';
import { getAlbums, searchAlbums } from '@/services';

export const dynamic = 'force-dynamic';

export default async function Home({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  let data = [];

  if (searchParams?.search) {
    data = await searchAlbums(searchParams.search);
  } else {
    data = await getAlbums();
  }

  return (
    <main>
      <GridContainer>
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
      </GridContainer>
    </main>
  );
}

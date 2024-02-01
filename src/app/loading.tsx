import { LoadingAlbum } from '@/components/ui/album';
import { GridContainer } from '@/components/ui/grid-container';

export default function loading() {
  return (
    <GridContainer>
      {Array(20)
        .fill(0)
        .map((_, index) => (
          <LoadingAlbum key={index} />
        ))}
    </GridContainer>
  );
}

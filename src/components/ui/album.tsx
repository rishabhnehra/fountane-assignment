import Image from 'next/image';
import Link from 'next/link';

export const Album = (props: {
  image: { url: string; width?: number; height?: number };
  name: string;
  id: string;
}) => {
  return (
    <>
      <a href={`/albums/${props.id}`}>
        <Image
          className="shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-xl"
          src={props.image.url}
          width={props.image.width || 200}
          height={props.image.height || 300}
          alt={props.name}
        />
      </a>
    </>
  );
};

export const LoadingAlbum = () => (
  <div className="animate-pulse  w-[260px] h-[260px] bg-slate-200 shadow-lg hover:shadow-2xl transition-shadow duration-1000 rounded-xl" />
);

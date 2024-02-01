import { PropsWithChildren } from 'react';

export const GridContainer = (props: PropsWithChildren) => (
  <div
    className="m-8 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-8 grid-wrap"
    {...props}
  />
);

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table';

export const Tracks = (props: { data: any[] }) => {
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

export const LoadingTracks = () => {
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
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <TableRow
              key={index}
              className="animate-pulse bg-slate-200 h-2 w-8"
            />
          ))}
      </TableBody>
    </Table>
  );
};

import { getCommentsFromTrackId, trackComments } from './comments';

export function GET(_: Request, { params }: { params: { id: string } }) {
  const data = getCommentsFromTrackId(params.id);
  return Response.json(data);
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  const res = await request.json();
  const comments = trackComments.get(params.id);

  if (comments) {
    trackComments.set(params.id, [...comments, res]);
  }

  return Response.json(getCommentsFromTrackId(params.id));
}

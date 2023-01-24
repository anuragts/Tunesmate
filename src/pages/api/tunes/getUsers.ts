import type { NextApiRequest, NextApiResponse } from "next";
import mylist from "@/services/mylist";
import allusers from "@/services/allusers";
import { getToken } from "next-auth/jwt";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req });
  const access = token?.accessToken as string;
  const me = await mylist(access, token);
  const users = await allusers(token);

  const meTopArtists = me?.topArtists.map((artist) => artist.name);
  const meTopTracks = me?.topTracks.map((track) => track.name);
  const usersTopTracks = users[0]?.topTracks.map((track) => track.name);
  let uniqueTracks = new Set(meTopTracks?.concat(usersTopTracks));
  let commonTracks = 0;
  //   let uniqueTracks = new Set(meTopTracks?.concat(...usersTopTracks))
  meTopTracks?.forEach((track) => {
    if (usersTopTracks?.includes(track)) {
      commonTracks++;
    }
  });
  const matchPercentage = (commonTracks / uniqueTracks.size  + 1) * 100;
  return res.status(200).json({percent : matchPercentage , common : commonTracks});
};

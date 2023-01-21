import { getToken } from "next-auth/jwt";
import getTracks from '../../../services/tracks'
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req });
  const access = token?.accessToken as string;
  const topTracks = await getTracks(access)  
  return res.status(200).json(topTracks);
};

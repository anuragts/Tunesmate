import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import adddb from "@/services/adddb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req });
  const access = token?.accessToken as string;
  const r = await adddb(access, token);

  return res.status(200).json(r);
  }

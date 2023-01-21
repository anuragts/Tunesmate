// get user details using spotify api
import { getToken } from "next-auth/jwt";
import user from "../../../services/user";
import { NextApiRequest, NextApiResponse } from "next";


export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req });
  const access = token?.accessToken as string;
  const userDetails = await user(access);
  return res.status(200).json(userDetails);
};

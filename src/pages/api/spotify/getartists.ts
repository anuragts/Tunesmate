import { NextApiRequest , NextApiResponse} from "next";
import { getToken } from "next-auth/jwt";
import artists from "@/services/artists";
export default async ( req:NextApiRequest , res:NextApiResponse) => {
    const token = await getToken({ req });
    const access = token?.accessToken as string;
    const response = await artists(access);
    return res.status(200).json(response);
    // return res.status(200).json({
        
    // });
}
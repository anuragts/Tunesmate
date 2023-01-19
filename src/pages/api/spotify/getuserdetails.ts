import { getToken } from 'next-auth/jwt';
// get user details using spotify api

import { NextApiRequest, NextApiResponse } from "next";

// get token from nextauth

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const token = getToken;

    const response = "hello";
}
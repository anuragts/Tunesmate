// get user details using spotify api
import { getToken } from "next-auth/jwt";

import { NextApiRequest, NextApiResponse } from "next";


export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req });
  const access = token?.accessToken as string;

  const response = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
     res 
    .status(200)
    .json({
      name: data.display_name,
      email: data.email,
      image: data.images[0].url,
      followers: data.followers.total,
      url: data.external_urls.spotify,
    });
  //   res.status(200).json(data);
};

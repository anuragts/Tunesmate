import { NextApiRequest , NextApiResponse} from 'next';
import { getToken } from "next-auth/jwt"

export default async (req:NextApiRequest, res:NextApiResponse) => {
  // If you don't have NEXTAUTH_SECRET set, you will have to pass your secret as `secret` to `getToken`
  const token = await getToken({ req }) 
  if (token) {
    // Signed in
    // console.log( JSON.stringify(token, null, 2))
    res.status(200)
    return res.json(token.accessToken )
  } else {
    // Not Signed in
    res.status(401)
  }
  res.end()
}
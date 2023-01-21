export default async (access: string) => {
  const response = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return {
    name: data.display_name,
    email: data.email,
    image: data.images[0].url,
    followers: data.followers.total,
    url: data.external_urls.spotify,
  };
};

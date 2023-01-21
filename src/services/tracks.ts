export default async (access:string) => {
   const response = await fetch("https://api.spotify.com/v1/me/top/tracks", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  //   res.status(200).json(data);
  const fdata: any = data.items.filter(function (item: any) {
    return {
      name: item.name,
      url: item.external_urls.spotify,
      artist: item.artists[0].name,
      image_url: item.album.images[0].url,
    };
  });
  let topTracks: any[] = []
  for (let i = 0; i < data.items.length; i++) {
    topTracks.push({
      name: fdata[i].name,
      url: data.items[i].external_urls.spotify,
      artist: data.items[i].album.artists[0].name,
      image_url: data.items[i].album.images[0].url,
    });
    
  }
  return topTracks
}

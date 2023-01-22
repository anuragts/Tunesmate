export default async (access:string) => {
    const response = await fetch("https://api.spotify.com/v1/me/top/artists", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      let artists: any[] = []
      for (let i = 0 ; i < data.items.length; i++){
          artists.push({
            name : data.items[i].name,
            url : data.items[i].external_urls.spotify,
            image_url : data.items[i].images[0].url,
            popularity : data.items[i].popularity,
            genres : data.items[i].genres[0],
            followers : data.items[i].followers.total
          })

          
        }
        return artists;

}
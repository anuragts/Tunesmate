export default async (access:string) => {
    const response = await fetch("https://api.spotify.com/v1/me/top/artists", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      return data;
}
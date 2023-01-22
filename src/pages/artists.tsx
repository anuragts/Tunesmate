import { useState, useEffect } from "react";

const top = () => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch("/api/spotify/getartists", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      setData(json);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
        <div className="text-center text-3xl font-semibold my-10">My top Artists</div>
        {loading ? (
          <div className="text-center text-2xl font-semibold">Loading...</div>
        ) : (
          <div>
            <div className="flex flex-row flex-wrap justify-center">

            {data?.map((artist: any,index:number) => (
              <div className="mt-5" key={index+1}>
                <div className="text-2xl">
                {index + 1}.
                </div>
                <div className="text-white p-4 rounded-lg shadow-md">
                  <img
                    src={artist.image_url}
                    className="w-[30%] rounded-lg"
                    alt={artist.name}
                  />
                  <div className="pt-4">
                    <div className="text-lg font-medium">{artist.name}</div>
                    <div className="text-sm text-gray-400 mb-5"> <span className="font-semibold">Genres - </span>{artist.genres}</div>
                    <div className="text-sm mb-5"><span className="font-semibold">Popularity -</span>  {artist.popularity}/100</div>
                    <div className="text-sm mb-5"><span className="font-semibold">Followers -</span>  {artist.followers}</div>
                    <div className="pt-2">
                      <a
                        href={artist.url}
                        className="px-4 mx-5 py-3 text-sm text-black bg-green-500 rounded-full"
                      >
                        Listen on Spotify
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))} </div>
          </div>
        )}
      </div>
    </>
  );
};

export default top;

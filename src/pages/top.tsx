import { useState, useEffect } from "react";

const top = () => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch("/api/spotify/gettracks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      //   const filteredData = json.items?.map((item: any) => {
      //     return {
      //       name: item.name,
      //       url: item.url,
      //       artist: item.artist,
      //       image_url: item.image_url,
      //     };
      //   });
      setData(json);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
        <div className="text-center text-3xl font-semibold my-10">My top tracks</div>
        {loading ? (
          <div className="text-center text-2xl font-semibold">Loading...</div>
        ) : (
          <div>
            <div className="flex flex-row flex-wrap justify-center">

            {data?.map((track: any,index:number) => (
              <div className="mt-5" key={index+1}>
                <div className="text-2xl">
                {index + 1}.
                </div>
                <div className="text-white p-4 rounded-lg shadow-md">
                  <img
                    src={track.image_url}
                    className="w-[30%] rounded-lg"
                    alt={track.name}
                  />
                  <div className="pt-4">
                    <div className="text-lg font-medium">{track.name}</div>
                    <div className="text-sm text-gray-400 mb-5">{track.artist}</div>
                    <div className="pt-2">
                      <a
                        href={track.url}
                        className="px-4   mx-5 py-3 text-sm text-black bg-green-500 rounded-full"
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

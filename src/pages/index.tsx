import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { signOut, useSession } from "next-auth/react";
import Header from "./components/Header";
import Link from "next/link";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session, status } = useSession();
  useEffect(() => {
    const fetchData = async () => {
      await fetch("/api/spotify/dbstuff", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    };
    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Tunesmate</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <Header />
          <button
            onClick={() => {
              signOut();
            }}
          >
            Logout
          </button>
        </div>
        <div>
          <div className="bg-green-300 text-black text-center w-[20vw] my-10 py-5 px-5 text-xl font-semibold rounded-full">
            <Link href={"/top"}>My top Tracks</Link>
          </div>

          <div className="bg-blue-300 text-black text-center w-[20vw] my-10 py-5 px-5 text-xl font-semibold rounded-full">
            <Link href={"/artists"}> My top Artists</Link>
          </div>
        </div>
      </main>
    </>
  );
}

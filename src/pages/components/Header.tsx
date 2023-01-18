import { useSession } from "next-auth/react";
const Header = () => {
  const { data: session } = useSession();
  return (
    <>
      <div className="flex flex-grow justify-items-end">
        <div>Tunesmate</div>
        <div className="flex  items-center  space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 bg-green-800">
        <img className="rounded-full w-10 h-10" src={session?.user?.image as string} alt="" />
        <h2>{session?.user?.name as string}</h2>
        </div>
      </div>
    </>
  );
};

export default Header;

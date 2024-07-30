import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className=" flex h-screen flex-col items-center justify-center bg-hero bg-cover bg-center text-indigo-50">
      <h1 className="text-3xl font-bold uppercase sm:text-5xl">VHMS</h1>
      <h2 className="text-xl font-medium sm:text-4xl">
        Manage Your Houses and Vehicles
      </h2>
      <Link
        to="/login"
        className="text-md mt-6 rounded-md border border-transparent px-4 py-2 hover:border-slate-50 hover:shadow-md hover:shadow-black/80  active:bg-black/60  sm:text-2xl"
      >
        Login
      </Link>
    </div>
  );
}

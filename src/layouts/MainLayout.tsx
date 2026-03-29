import { Link, NavLink, Outlet } from "react-router-dom";
import Header from "../components/Header";
import logo from "../assets/logo.svg";
import useNote from "../hooks/useNote";

const MainLayout = () => {
    const { datas } = useNote();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col ">
            {/* NAVBAR */}
            <nav className="w-full bg-white shadow-sm py-4 mb-5">
                <div className="max-w-5xl mx-auto flex items-center justify-between px-4">
                    {/* Logo + Title */}
                    <div className="flex items-center gap-3">
                        <Header image={{ src: logo, alt: "note" }}>
                            Transfer Note
                        </Header>
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-3">
                        <Link
                            to="/add-page"
                            className="text-gray-700 hover:text-blue-600 sm:text-sm font-small transition">
                            Add Line
                        </Link>

                        <Link
                            to="/summary"
                            className="text-gray-700 hover:text-blue-600 sm:text-sm font-small transition">
                            Summary
                        </Link>
                    </div>
                </div>
            </nav>
            <ul className="flex flex-wrap px-2 justify-start gap-2">
                <li key={"home"}>
                    <NavLink
                        className={({ isActive }) =>
                            !isActive
                                ? "px-4 py-2 rounded-md bg-stone-200 font-bold"
                                : "px-4 py-2 rounded-md bg-blue-600 font-bold text-white"
                        }
                        to={`/`}>
                        Home
                    </NavLink>
                </li>
                {datas.map((data) => (
                    <li key={data.id}>
                        <NavLink
                            className={({ isActive }) =>
                                !isActive
                                    ? "px-4 py-2 rounded-md bg-stone-200 font-bold"
                                    : "px-4 py-2 rounded-md bg-blue-600 font-bold text-white"
                            }
                            to={`/pages/${data.id}`}>
                            {data.name}
                        </NavLink>
                    </li>
                ))}
            </ul>

            {/* CONTENT */}
            <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;

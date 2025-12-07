import { Link, Outlet } from "react-router-dom";
import Header from "../components/Header";
import logo from "../assets/logo.svg";

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* NAVBAR */}
            <nav className="w-full bg-white shadow-sm py-4">
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
                            className="text-gray-700 hover:text-blue-600 sm:text-sm font-small transition"
                        >
                            Add Page
                        </Link>

                        <Link
                            to="/summary"
                            className="text-gray-700 hover:text-blue-600 sm:text-sm font-small transition"
                        >
                            Summary
                        </Link>
                    </div>
                </div>
            </nav>

            {/* CONTENT */}
            <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;

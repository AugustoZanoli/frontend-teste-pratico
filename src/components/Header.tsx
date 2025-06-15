import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="flex items-center justify-between px-8 py-5 border-b border-indigo-600 ">
            <div className="text-2xl font-extrabold text-white tracking-wide">
                Gerenciador de Investimentos
            </div>
            <nav className="flex gap-8 items-center">
                <Link
                    to="/"
                    className="text-white hover:underline hover:underline-offset-4 transition"
                >
                    Home
                </Link>
                <Link
                    to="/investimentos"
                    className="text-white hover:underline hover:underline-offset-4 transition"
                >
                    Investimentos
                </Link>
            </nav>
        </header>
    );
};

export default Header;

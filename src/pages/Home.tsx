import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-700 to-indigo-900">
            <Header />

            <section className="flex flex-col items-center justify-center text-center px-6 py-24 max-w-4xl mx-auto">
                <h1 className="text-5xl font-extrabold text-white mb-6 leading-tight">
                    Gerencie seus <span className="text-yellow-400">investimentos</span> de forma inteligente
                </h1>
                <p className="text-lg text-indigo-200 mb-12 max-w-xl">
                    Uma plataforma simples, moderna e intuitiva para gerenciar seus investimentos.
                </p>
                <div className="flex flex-col sm:flex-row gap-6">
                    <Link to="/investimentos">
                        <button className="bg-yellow-400 text-indigo-900 font-semibold px-8 py-3 rounded-md hover:bg-yellow-300 transition shadow-lg">
                            Comece Agora
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;

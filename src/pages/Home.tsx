import React from "react";
import Header from "../components/Header";
import Botao from "../components/Botao";

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
                    <Botao texto="Começe agora" rota="/investimentos"/>
                </div>
            </section>
        </div>
    );
};

export default Home;

import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Botao from "../components/Botao";
import NovoInvestimentoModal from "./NovoInvestimento";
import Toast from "../components/Toast";
import EditarInvestimentoModal from "./AtualizarInvestimento";

type Investimento = {
    id: number;
    nome: string;
    tipo: string;
    valor: number;
    data: string;
};

export default function Investimentos() {
    const [investimentos, setInvestimentos] = useState<Investimento[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [showModalInsercao, setShowModalInsercao] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [showModalEdicao, setShowModalEdicao] = useState(false);
    const [investimentoSelecionado, setInvestimentoSelecionado] = useState<Investimento | null>(null);



    const listar_investimentos = () => {
        setLoading(true);
        axios
            .get("http://localhost:8000/backend/public/api/investimentos")
            .then((res) => {
                const lista = res.data.investimentos;
                setInvestimentos(lista);

                const soma = lista.reduce(
                    (acc: number, item: Investimento) => acc + item.valor,
                    0
                );
                setTotal(soma);
            })
            .finally(() => setLoading(false));
    };

    const deletar_investimento = (id: number) => {
        setDeletingId(id);
        axios
            .delete("http://localhost:8000/backend/public/api/investimentos", {
                params: { id },
            })
            .then(() => {
                listar_investimentos();
                setToastMessage("Deletar");
                setShowToast(true);
                setTimeout(() => setShowToast(false), 2000);

            })
            .catch((err) => {
                console.error("Erro ao deletar:", err);
            })
            .finally(() => setDeletingId(null));

    };

    useEffect(() => {
        listar_investimentos();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-700 to-indigo-900">
            <Header />

            <div className="p-6 max-w-screen-2xl mx-auto">
                <div className="bg-indigo-800 rounded-md p-6 mb-8 text-white shadow-md flex flex-col sm:flex-row justify-between">
                    <div className="flex flex-col sm:flex-col justify-between items-start">
                        <h1 className="text-3xl font-extrabold tracking-tight">
                            Meus Investimentos
                        </h1>
                        <p className="text-lg font-semibold mt-4 sm:mt-0">
                            Total investido:{" "}
                            <span className="text-yellow-300">
                                R$ {total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                            </span>
                        </p>
                    </div>
                    <div>
                        <Botao texto="Novo Investimento" onClick={() => setShowModalInsercao(true)} />
                    </div>
                </div>

                <div className="bg-white rounded-md shadow overflow-x-auto">
                    {loading ? (
                        <div className="p-6 text-center text-indigo-600 font-semibold">
                            Carregando investimentos...
                        </div>
                    ) : investimentos.length === 0 ? (
                        <div className="p-6 text-center text-gray-600">
                            Nenhum investimento cadastrado.
                        </div>
                    ) : (
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b bg-gray-100 text-gray-700">
                                    <th className="text-center py-3 px-4">Nome</th>
                                    <th className="text-center py-3 px-4">Tipo</th>
                                    <th className="text-center py-3 px-4">Valor</th>
                                    <th className="text-center py-3 px-4">Data</th>
                                    <th className="text-center py-3 px-4">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {investimentos.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="border-b hover:bg-purple-50 transition-colors"
                                    >
                                        <td className="py-3 px-4 text-center">{item.nome}</td>
                                        <td className="py-3 px-4 text-center">
                                            <span className="px-3 py-1 rounded bg-purple-100 text-purple-700 font-medium text-xs">
                                                {item.tipo}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-center text-green-600 font-medium">
                                            R$ {item.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            {new Date(item.data).toLocaleDateString("pt-BR")}
                                        </td>
                                        <td className="py-3 px-4 text-center space-x-2 flex flex-row justify-center">
                                            <button
                                                onClick={() => {
                                                    setInvestimentoSelecionado(item);
                                                    setShowModalEdicao(true);
                                                }}
                                                className="px-3 py-1 border border-purple-600 rounded text-purple-700 hover:bg-purple-200 transition">
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => deletar_investimento(item.id)}
                                                disabled={deletingId === item.id}
                                                className={`px-3 py-1 border border-red-600 rounded text-red-600 transition ${deletingId === item.id
                                                    ? "opacity-50 cursor-not-allowed"
                                                    : "hover:bg-red-100"
                                                    }`}
                                            >
                                                {deletingId === item.id ? "Deletando..." : "Deletar"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            {showModalInsercao && (
                <NovoInvestimentoModal
                    onClose={() => setShowModalInsercao(false)}
                    onSuccess={() => {
                        listar_investimentos();
                        setToastMessage("Inserir");
                        setShowToast(true);
                        setTimeout(() => setShowToast(false), 2000);
                    }}
                />
            )}
            {showToast && (
                <Toast message={toastMessage} onClose={() => setShowToast(false)} />
            )}
            {showModalEdicao && investimentoSelecionado && (
                <EditarInvestimentoModal
                    investimento={investimentoSelecionado}
                    onClose={() => setShowModalEdicao(false)}
                    onSuccess={() => {
                        listar_investimentos();
                        setShowModalEdicao(false);
                        setToastMessage("Atualizar");
                        setShowToast(true);
                        setTimeout(() => setShowToast(false), 2000);
                    }}
                />
            )}




        </div>

    );
}

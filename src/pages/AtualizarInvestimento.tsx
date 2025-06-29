import { useState } from "react";
import axios from "axios";
import Toast from "../components/Toast";

type Props = {
    onClose: () => void;
    onSuccess: () => void;
    investimento: {
        id: number;
        nome: string;
        tipo: string;
        valor: number;
        data: string;
    };
};

export default function EditarInvestimentoModal({ onClose, onSuccess, investimento }: Props) {
    const [nome, setNome] = useState(investimento.nome);
    const [tipo, setTipo] = useState(investimento.tipo);
    const [valor, setValor] = useState<number | string>(investimento.valor);
    const [data, setData] = useState(investimento.data);
    const [validacoes, setValidacoes] = useState<{ [key: string]: string }>({});
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const tipo_investimento = [
        { tipo: "Ação" },
        { tipo: "Título" },
        { tipo: "Fundo" },
    ];

    const validar = () => {
        const erros: { [key: string]: string } = {};

        if (!nome.trim()) erros.nome = "Nome é obrigatório.";
        if (!tipo) erros.tipo = "Selecione um tipo.";
        if (valor === "" || Number(valor) <= 0)
            erros.valor = "Valor deve ser maior que zero.";
        if (!data) {
            erros.data = "Data é obrigatória.";
        } else {
            const dataSelecionada = new Date(data);
            const hoje = new Date();
            hoje.setHours(0, 0, 0, 0);
            if (dataSelecionada > hoje) {
                erros.data = "Data não pode ser futura.";
            }
        }

        setValidacoes(erros);
        return Object.keys(erros).length === 0;
    };

    const salvar = () => {
        if (!validar()) return;

        axios
            .put("http://localhost:8000/backend/public/api/investimentos", {
                id: investimento.id,
                nome,
                tipo,
                valor: Number(valor),
                data,
            })
            .then(() => {
                onSuccess();
                setTimeout(() => {
                    onClose();
                });
            })
            .catch(() => {
                setToastMessage("Erro");
                setShowToast(true);
                setTimeout(() => setShowToast(false), 2000);
            })
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
            <div className="bg-white rounded-md p-6 w-full max-w-md shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Editar Investimento</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-start">Nome</label>
                        <input
                            type="text"
                            className={`w-full border rounded px-3 py-2 ${validacoes.nome ? "border-red-500" : ""
                                }`}
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                        {validacoes.nome && (
                            <p className="text-red-500 text-xs mt-1">{validacoes.nome}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-start">Tipo</label>
                        <select
                            className={`w-full border rounded px-3 py-2 ${validacoes.tipo ? "border-red-500" : ""
                                }`}
                            value={tipo}
                            onChange={(e) => setTipo(e.target.value)}
                        >
                            <option value="">Selecione o tipo</option>
                            {tipo_investimento.map((item) => (
                                <option key={item.tipo} value={item.tipo}>
                                    {item.tipo}
                                </option>
                            ))}
                        </select>
                        {validacoes.tipo && (
                            <p className="text-red-500 text-xs mt-1">{validacoes.tipo}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-start">Valor</label>
                        <input
                            type="number"
                            className={`w-full border rounded px-3 py-2 ${validacoes.valor ? "border-red-500" : ""
                                }`}
                            value={valor}
                            onChange={(e) => setValor(e.target.value)}
                        />
                        {validacoes.valor && (
                            <p className="text-red-500 text-xs mt-1">{validacoes.valor}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-start">Data</label>
                        <input
                            type="date"
                            className={`w-full border rounded px-3 py-2 ${validacoes.data ? "border-red-500" : ""
                                }`}
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                        />
                        {validacoes.data && (
                            <p className="text-red-500 text-xs mt-1">{validacoes.data}</p>
                        )}
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={salvar}
                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                        Salvar
                    </button>
                </div>
            </div>
            {showToast && (
                <Toast message={toastMessage} onClose={() => setShowToast(false)} />
            )}
        </div>
    );
}

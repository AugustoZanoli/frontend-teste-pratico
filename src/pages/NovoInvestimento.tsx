import { useState } from "react";
import axios from "axios";

type Props = {
    onClose: () => void;
    onSuccess: () => void;
};

export default function NovoInvestimentoModal({ onClose, onSuccess }: Props) {
    const [nome, setNome] = useState("");
    const [tipo, setTipo] = useState("");
    const [valor, setValor] = useState<number | string>("");
    const [data, setData] = useState("");

    const tipo_investimento = [
        { tipo: 'Ação' },
        { tipo: 'Título' },
        { tipo: 'Fundo' },

    ]

    const salvar = () => {
        if (!nome || !tipo || !valor || !data) {
            alert("Preencha todos os campos.");
            return;
        }

        axios
            .post("http://localhost:8000/backend/public/api/investimentos", {
                nome,
                tipo,
                valor: Number(valor),
                data,
            })
            .then(() => {
                onSuccess();
                onClose();
            })
            .catch(() => {
                alert("Erro ao cadastrar investimento.");
            });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
            <div className="bg-white rounded-md p-6 w-full max-w-md shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Novo Investimento</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-start">Nome</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-start">Tipo</label>
                        <select
                            className="w-full border rounded px-3 py-2"
                            value={tipo}
                            onChange={(e) => setTipo(e.target.value)}
                        >
                            <option value="" disabled>
                                Selecione o tipo
                            </option>
                            {tipo_investimento.map((item) => (
                                <option key={item.tipo} value={item.tipo}>
                                    {item.tipo}
                                </option>
                            ))}
                        </select>
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-start">Valor</label>
                        <input
                            type="number"
                            className="w-full border rounded px-3 py-2"
                            value={valor}
                            onChange={(e) => setValor(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-start">Data</label>
                        <input
                            type="date"
                            className="w-full border rounded px-3 py-2"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                        />
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
        </div>
    );
}

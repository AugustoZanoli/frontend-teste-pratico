import { useEffect, useState } from "react";
import axios from "axios";

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

  // Função para listar todos os investimentos
  const listar_investimentos = () => {
    axios.get("http://localhost:8000/backend/public/api/investimentos").then((res) => {
      const lista = res.data.investimentos;
      setInvestimentos(lista);

      const soma = lista.reduce(
        (acc: number, item: Investimento) => acc + item.valor,
        0
      );
      setTotal(soma);
    });
  }

  // Função para deletar o investimento, recebendo o id do objeto
  const deletar_investimento = (id: number) => {
  axios
    .delete("http://localhost:8000/backend/public/api/investimentos", {
      params: { id },
    })
    .then(() => {
      listar_investimentos();
    })
    .catch((err) => {
      console.error("Erro ao deletar:", err);
    });
};


  useEffect(() => {
    listar_investimentos();
  }, []);

  return (


    <div className="min-h-screen bg-white p-6">
      <div className="bg-purple-700 rounded-md p-6 mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <h1 className="text-3xl font-extrabold text-white mb-4 sm:mb-0">
          Meus Investimentos
        </h1>
        <p className="text-white text-lg font-semibold">
          Total investido:{" "}
          <span className="text-yellow-300">
            R$ {total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </span>
        </p>
      </div>

      <div className="bg-white rounded-md shadow p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="text-center py-3 px-2">Nome</th>
              <th className="text-center py-3 px-2">Tipo</th>
              <th className="text-center py-3 px-2">Valor</th>
              <th className="text-center py-3 px-2">Data</th>
              <th className="text-center py-3 px-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {investimentos.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-200 hover:bg-purple-50 transition-colors"
              >
                <td className="py-3 px-2">{item.nome}</td>
                <td className="py-3 px-2">
                  <span className="px-3 py-1 rounded bg-purple-100 text-purple-700 font-semibold text-sm">
                    {item.tipo}
                  </span>
                </td>
                <td className="py-3 px-2 text-green-600 font-medium">
                  R$ {item.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </td>
                <td className="py-3 px-2">
                  {new Date(item.data).toLocaleDateString("pt-BR")}
                </td>
                <td className="py-3 px-2 space-x-2">
                  <button className="px-3 py-1 border border-purple-600 rounded text-purple-700 hover:bg-purple-200 transition">
                    Editar
                  </button>
                  <button className="px-3 py-1 border border-red-600 rounded text-red-600 hover:bg-red-100 transition"
                  onClick={() => deletar_investimento(item.id)}>
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

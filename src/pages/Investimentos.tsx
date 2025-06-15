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

  useEffect(() => {
    axios.get("http://localhost:8000/backend/public/api/investimentos").then((res) => {
      const lista = res.data.investimentos;
      setInvestimentos(lista);

      const soma = lista.reduce(
        (acc: number, item: Investimento) => acc + item.valor,
        0
      );
      setTotal(soma);
    });
  }, []);

  return (
    <div className="p-6 bg-white-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Meus Investimentos</h1>
          <p className="text-left py-2">
            Total investido:{" "}
            <span className="text-green-600 font-semibold">
              R$ {total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
          </p>
        </div>
        
      </div>

      <div className="bg-white p-4 rounded shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Nome</th>
              <th className="text-left py-2">Tipo</th>
              <th className="text-left py-2">Valor</th>
              <th className="text-left py-2">Data</th>
              <th className="text-left py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {investimentos.map((item) => (
              <tr key={item.id} className="border-b hover:bg-slate-100">
                <td className="py-2">{item.nome}</td>
                <td className="py-2">
                  <span className="px-2 py-1 rounded bg-slate-100">
                    {item.tipo}
                  </span>
                </td>
                <td className="py-2 text-green-600 font-medium">
                  R$ {item.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </td>
                <td className="py-2">
                  {new Date(item.data).toLocaleDateString("pt-BR")}
                </td>
                <td className="py-2 space-x-2">
                  <button className="px-3 py-1 border rounded hover:bg-slate-200">
                    Editar
                  </button>
                  <button className="px-3 py-1 border rounded text-red-600 hover:bg-red-100">
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

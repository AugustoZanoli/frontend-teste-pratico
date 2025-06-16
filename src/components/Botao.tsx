import { Link } from "react-router-dom";

type BotaoProps = {
  texto: string;
  rota: string;
};

const Botao: React.FC<BotaoProps> = ({ texto, rota }) => {
  return (
    <Link to={rota}>
      <button className="bg-yellow-400 text-indigo-900 font-semibold px-8 py-3 rounded-md hover:bg-yellow-300 transition shadow-lg">
        {texto}
      </button>
    </Link>
  );
};

export default Botao;

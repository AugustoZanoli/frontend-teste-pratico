import { Link } from "react-router-dom";

type BotaoProps = {
    texto: string;
    rota?: string;
    onClick?: () => void;
};

const Botao: React.FC<BotaoProps> = ({ texto, rota, onClick }) => {
    const estilo =
        "bg-yellow-400 text-indigo-900 font-semibold px-8 py-3 rounded-md hover:bg-yellow-300 transition shadow-lg";

    if (rota) {
        return (
            <Link to={rota} className={estilo}>
                {texto}
            </Link>
        );
    }

    return (
        <button className={estilo} onClick={onClick}>
            {texto}
        </button>
    );
};

export default Botao;

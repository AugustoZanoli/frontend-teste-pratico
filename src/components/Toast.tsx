type Props = {
    message: string;
    onClose: () => void;
};

export default function Toast({ message, onClose }: Props) {
    if (message === "Inserir") {
        return (
            <div
                className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-md animate-slide-in cursor-pointer"
                onClick={onClose}
            >
                <p>Investimento criado com sucesso!</p>
            </div>
        );
    } else if(message === "Deletar"){
        return (
            <div
                className="fixed bottom-5 right-5 bg-yellow-500 text-white px-4 py-2 rounded shadow-md animate-slide-in cursor-pointer"
                onClick={onClose}
            >
                <p>Investimento deletado com sucesso!</p>
            </div>
        );
    } else if(message === "Atualizar"){
        return (
            <div
                className="fixed bottom-5 right-5 bg-blue-500 text-white px-4 py-2 rounded shadow-md animate-slide-in cursor-pointer"
                onClick={onClose}
            >
                <p>Investimento atualizado com sucesso!</p>
            </div>
        );
    } else {
        return (
            <div
                className="fixed bottom-5 right-5 bg-red-500 text-white px-4 py-2 rounded shadow-md animate-slide-in cursor-pointer"
                onClick={onClose}
            >
                <p>Erro ao executar ação!</p>
            </div>
        );
    }

}

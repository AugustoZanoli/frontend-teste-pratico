import {CircleCheck, CircleX} from "lucide-react";

type Props = {
    message: string;
    onClose: () => void;
};

export default function Toast({ message, onClose }: Props) {
    if (message === "Inserir") {
        return (
            <div
                className="fixed bottom-5 right-5 bg-green-500 text-white px-6 py-6 text-lg rounded shadow-md animate-slide-in cursor-pointer flex flex-row gap-2"
                onClick={onClose}
            >
                <CircleCheck/><p>Investimento criado com sucesso!</p>
            </div>
        );
    } else if(message === "Deletar"){
        return (
            <div
                className="fixed bottom-5 right-5 bg-yellow-500 text-white px-6 py-6 text-lg rounded shadow-md animate-slide-in cursor-pointer flex flex-row gap-2"
                onClick={onClose}
            >
                <CircleCheck/><p>Investimento deletado com sucesso!</p>
            </div>
        );
    } else if(message === "Atualizar"){
        return (
            <div
                className="fixed bottom-5 right-5 bg-blue-500 text-white px-6 py-6 text-lg rounded shadow-md animate-slide-in cursor-pointer flex flex-row gap-2"
                onClick={onClose}
            >
                <CircleCheck/><p>Investimento atualizado com sucesso!</p>
            </div>
        );
    } else {
        return (
            <div
                className="fixed bottom-5 right-5 bg-red-500 text-white px-6 py-6 text-lg rounded shadow-md animate-slide-in cursor-pointer flex flex-row gap-2"
                onClick={onClose}
            >
                <CircleX /><p>Erro ao executar ação!</p>
            </div>
        );
    }

}

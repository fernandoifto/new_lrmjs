import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { api } from '@/api/api';

export interface ITurno {
    id: number;
    descricao: string;
}

export interface IAgendamentoFormData {
    nome: string;
    endereco: string;
    numero: string;
    setor: string;
    cep: string;
    telefone: string;
    datavisita: string;
    turno: string;
}

export const hooksAgendamentoForm = (turnos: ITurno[]) => {
    const router = useRouter();

    const handleCreateAgendamento = async (formData: FormData): Promise<boolean> => {
        const formValues: IAgendamentoFormData = {
            nome: formData.get("nome") as string,
            endereco: formData.get("endereco") as string,
            numero: formData.get("numero") as string,
            setor: formData.get("setor") as string,
            cep: formData.get("cep") as string,
            telefone: formData.get("telefone") as string,
            datavisita: formData.get("datavisita") as string,
            turno: formData.get("turno") as string
        };

        // Validação dos campos obrigatórios
        if (Object.values(formValues).some(value => !value)) {
            toast.error('Preencha todos os campos!');
            return false;
        }

        // Validação do turno selecionado
        const selectedTurno = turnos[parseInt(formValues.turno)];
        if (!selectedTurno) {
            toast.error('Turno inválido!');
            return false;
        }

        try {
            const response = await api.post("/agendamento", {
                ...formValues,
                id_turno: selectedTurno.id,
                id_user: null
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 201) {
                toast.success('Agendamento criado com sucesso!');
                router.push('/');
                return true;
            }
            return false;
        } catch (error) {
            console.error('Erro ao criar agendamento:', error);
            toast.error('Erro ao criar agendamento. Por favor, tente novamente.');
            return false;
        }
    };

    return { handleCreateAgendamento };
};

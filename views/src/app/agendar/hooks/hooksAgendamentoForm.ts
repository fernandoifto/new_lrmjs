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
    const handleCreateAgendamento = async (formData: FormData, resetForm: () => void): Promise<boolean> => {
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

        // Remove máscaras antes de enviar (garante apenas números)
        const cleanPhone = formValues.telefone.replace(/\D/g, '');
        const cleanCEP = formValues.cep.replace(/\D/g, '');

        try {
            // Criar FormData para enviar arquivos
            const formDataToSend = new FormData();
            formDataToSend.append('nome', formValues.nome);
            formDataToSend.append('endereco', formValues.endereco);
            formDataToSend.append('numero', formValues.numero);
            formDataToSend.append('setor', formValues.setor);
            formDataToSend.append('cep', cleanCEP);
            formDataToSend.append('telefone', cleanPhone);
            formDataToSend.append('datavisita', formValues.datavisita);
            const googleMapsUrl = formData.get('google_maps_url') as string;
            if (googleMapsUrl) {
                formDataToSend.append('google_maps_url', googleMapsUrl);
            }
            formDataToSend.append('id_turno', selectedTurno.id.toString());
            formDataToSend.append('id_user', 'null');

            // Adicionar fotos se houver
            const fotos = formData.getAll('fotos');
            fotos.forEach((foto) => {
                if (foto instanceof File) {
                    formDataToSend.append('fotos', foto);
                }
            });

            // Não definir Content-Type manualmente - axios define automaticamente para FormData
            const response = await api.post("/agendamento", formDataToSend);

            if (response.status === 201) {
                toast.success('Agendamento criado com sucesso!');
                resetForm();
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

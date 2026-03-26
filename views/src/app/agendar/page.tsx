import { AgendarForm } from './forms';
import { api } from "@/api/api";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../home/components/header';
import HeaderRight from '../home/components/headerRight';

export const dynamic = 'force-dynamic';

export default async function Agendar() {
    const response = await api.get('/turnos', {
        params: { page: 1, pageSize: 100 },
    });

    return (
        <>
            <Header>
                <HeaderRight />
            </Header>
            <AgendarForm turnos={response.data.data} />
        </>
    );
}
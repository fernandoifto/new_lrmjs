import { AgendarForm } from './forms';
import { api } from "@/api/api";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../home/components/header';
import HeaderRight from '../home/components/headerRight';

export default async function Agendar() {
    const response = await api.get('/turnos');

    //console.log(response.data);

    return (
        <>
            <Header>
                <HeaderRight />
            </Header>
            <AgendarForm turnos={response.data} />
        </>
    );
}
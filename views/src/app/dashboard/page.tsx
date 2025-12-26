
import { api } from "@/api/api";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../home/components/header';
import Footer from '../home/components/footer';

export default async function Dashboard() {
    const response = await api.get('/turnos');

    //console.log(response.data);

    return (
        <>
            <Header />
            <h1>Dashboard</h1>
            <Footer />
        </>
    );
}
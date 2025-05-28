import styles from './styles.module.css';
import Link from 'next/link';

export default function Donate() {
    return (
        <>
            <section className={`${styles.donation} py-5`}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <img
                                src="/doacao.png"
                                alt="Doação de Medicamentos"
                                className="img-fluid mb-4 mb-lg-0"
                                style={{ maxHeight: '350px' }}
                            />
                        </div>
                        <div className="col-lg-6">
                            <h2 className="mb-4">Doe Medicamentos Não Utilizados</h2>
                            <p className="lead">Medicamentos dentro do prazo de validade e em boas condições podem fazer a diferença na vida de quem precisa.</p>
                            <ul className="list-unstyled">
                                <li className="mb-2"><i className="fas fa-check-circle text-success me-2"></i> Ajude quem não tem condições de comprar medicamentos</li>
                                <li className="mb-2"><i className="fas fa-check-circle text-success me-2"></i> Reduza o desperdício de medicamentos em boas condições</li>
                                <li className="mb-2"><i className="fas fa-check-circle text-success me-2"></i> Participe de campanhas de arrecadação</li>
                            </ul>
                            <button className="btn btn-light mt-3"><Link className={`${styles.btnAgendar}`} href="/agendar">Agende sua doação ou descarte</Link></button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
import styles from './styles.module.css';

export default function Risk() {
    return (
        <>
            {/* Seção de riscos do descarte incorreto */}
            <section className={`${styles.section} ${styles.firstSection} py-5`} >
                <div className="container">
                    <h3 className="text-center mb-5">Riscos do Descarte Incorreto</h3>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body text-center">
                                    <div className={`${styles.iconContainer} mb-3`}>
                                        <img src="/agua.png" alt="Água" width={100} height={100} className={styles.selectionLogo} />
                                    </div>
                                    <h4>Contaminação da Água</h4>
                                    <p>Medicamentos descartados incorretamente podem contaminar rios, lagos e lençóis freáticos, afetando o ecossistema e a qualidade da água potável.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body text-center">
                                    <div className={`${styles.iconContainer} mb-3`}>
                                        <img src="/saude.png" alt="Saúde" width={100} height={100} className={styles.selectionLogo} />
                                    </div>
                                    <h4>Riscos à Saúde</h4>
                                    <p>O consumo acidental de medicamentos vencidos ou o contato com substâncias ativas podem causar intoxicações e outros problemas de saúde.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body text-center">
                                    <div className={`${styles.iconContainer} mb-3`}>
                                        <img src="/ambiente.png" alt="Ambiente" width={100} height={100} className={styles.selectionLogo} />
                                    </div>
                                    <h4>Impacto Ambiental</h4>
                                    <p>O acúmulo de resíduos farmacêuticos no meio ambiente pode afetar a fauna, a flora e desequilibrar ecossistemas inteiros.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
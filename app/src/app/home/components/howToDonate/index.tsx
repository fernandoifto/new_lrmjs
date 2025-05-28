import styles from './styles.module.css';

export default function HowToDonate() {
    return (
        <>
            {/* How to Dispose Section */}
            <section className={`${styles.section} py-5`} id="como-descartar">
                <div className="container" >
                    <h2 className="text-center mb-5">Como realizar uma doação ou descarte correto </h2>
                    <div className="row g-4">
                        <div className="col-md-3 text-center">
                            <div className={`${styles.step} mx-auto`}>
                                <span className={styles.stepNumber}>1</span>
                                <h5 className="mt-3">Separe</h5>
                                <p>Separe os medicamentos vencidos ou em desuso</p>
                            </div>
                        </div>
                        <div className="col-md-3 text-center">
                            <div className={`${styles.step} mx-auto`}>
                                <span className={styles.stepNumber}>2</span>
                                <h5 className="mt-3">Agende</h5>
                                <button className="btn btn-light mt-3">Agende sua doação ou descarte</button>
                            </div>
                        </div>
                        <div className="col-md-3 text-center">
                            <div className={`${styles.step} mx-auto`}>
                                <span className={styles.stepNumber}>3</span>
                                <h5 className="mt-3">Aguarde</h5>
                                <p>Aguarde um agente da prefeitura para coletar os medicamentos</p>
                            </div>
                        </div>
                        <div className="col-md-3 text-center">
                            <div className={`${styles.step} mx-auto`}>
                                <span className={styles.stepNumber}>4</span>
                                <h5 className="mt-3">Compartilhe</h5>
                                <p>Incentive amigos e familiares a fazerem o mesmo</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

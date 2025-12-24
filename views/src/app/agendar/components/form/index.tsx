"use client";
import styles from './styles.module.css';

export default function Form() {
    return (
        <form className={styles.form}>
            {/* Cartão de Dados Pessoais */}
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <div className={styles.cardIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-4.987-3.744A7.966 7.966 0 0 0 12 20c1.97 0 3.773-.712 5.167-1.892A6.979 6.979 0 0 0 12.16 16a6.981 6.981 0 0 0-5.147 2.256zM5.616 16.82A8.975 8.975 0 0 1 12.16 14a8.972 8.972 0 0 1 6.362 2.634 8 8 0 1 0-12.906.187zM12 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="currentColor" />
                        </svg>
                    </div>
                    <h3>Contato e endereço</h3>
                </div>
                <div className={styles.cardBody}>
                    <div className={styles.inputRow}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="nome">
                                <span>Nome Completo</span>
                                <input type="text" id="nome" required placeholder="Seu nome completo" />
                            </label>
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="fone">
                                <span>Telefone/WhatsApp</span>
                                <input type="tel" id="telefone" required placeholder="(XX) XXXXX-XXXX" />
                            </label>
                        </div>
                    </div>
                    <div className={styles.inputRow}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="endereco">
                                <span>Endereço</span>
                                <input type="text" id="endereco" required placeholder="Rua, Avenida, etc" />
                            </label>
                        </div>
                        <div className={styles.inputGroupSmall}>
                            <label htmlFor="numero">
                                <span>Número</span>
                                <input type="text" id="numero" required placeholder="Nº" />
                            </label>
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="bairro">
                                <span>Bairro/Setor</span>
                                <input type="text" id="Setor" required placeholder="Seu bairro ou setor" />
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cartão de Detalhes da Coleta */}
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <div className={styles.cardIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M17 3h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1h2v2h6V1h2v2zm3 8H4v8h16v-8zm-5-6H9v2H7V5H4v4h16V5h-3v2h-2V5zm-9 8h2v2H6v-2zm5 0h2v2h-2v-2zm5 0h2v2h-2v-2z" fill="currentColor" />
                        </svg>
                    </div>
                    <h3>Melhor dia e horário para coleta</h3>
                </div>
                <div className={styles.cardBody}>
                    <div className={styles.inputRow}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="turno">
                                <span>Turno</span>
                                <select id="turno" name="turno" required>
                                    <option value="">Selecione</option>
                                    <option value="manha">Manhã</option>
                                    <option value="tarde">Tarde</option>
                                </select>
                            </label>
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="melhorData">
                                <span>Melhor Data</span>
                                <textarea id="datavisita" placeholder="Qual melhores dias da semana ou do mês para a coleta?" required rows={2} />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.formFooter}>
                <button type="submit" className={styles.btnSubmit}>Confirmar Agendamento</button>
            </div>
        </form>
    );
}
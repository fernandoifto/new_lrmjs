'use client';

import { useEffect, useState, useRef } from 'react';
import { api } from '@/api/api';
import { useRouter, AppRouterInstance } from 'next/navigation';
import { toast } from 'react-toastify';
import { getCookieClient } from '@/lib/cookieClient';
import Header from '../../home/components/header';
import Menu from '../../components/menu';
import WithPermission from '@/components/withPermission';
import { hooksAgendamentoForm, ITurno } from '@/app/agendar/hooks/hooksAgendamentoForm';
import { maskPhone, maskCEP } from '@/app/agendar/utils/masks';
import { FaCamera, FaTimes, FaUpload, FaMapMarkerAlt } from 'react-icons/fa';
import styles from './page.module.css';
import formStyles from '@/app/agendar/forms/style/styles.module.css';

interface ITurno {
    id: number;
    descricao: string;
}

export default function NovoAgendamentoPage() {
    const router = useRouter();
    const [turnos, setTurnos] = useState<ITurno[]>([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        loadTurnos();
    }, []);

    const loadTurnos = async () => {
        try {
            const token = getCookieClient();

            if (!token) {
                toast.error('Você precisa estar logado para acessar esta página');
                router.push('/login');
                return;
            }

            const response = await api.get('/turnos');
            setTurnos(response.data);
        } catch (error: any) {
            console.error('Erro ao carregar turnos:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error('Erro ao carregar turnos');
            }
        } finally {
            setLoading(false);
        }
    };

    if (!mounted) {
        return null;
    }

    return (
        <WithPermission requiredPermission="agendamentos.criar">
            <Header />
            <Menu />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.header}>
                            <h1>Novo Agendamento</h1>
                            <p>Preencha os dados abaixo para criar um novo agendamento</p>
                        </div>

                        {loading ? (
                            <div className={styles.loadingContainer}>
                                <p>Carregando dados...</p>
                            </div>
                        ) : (
                            <NovoAgendamentoForm turnos={turnos} router={router} />
                        )}
                    </div>
                </div>
            </main>
        </WithPermission>
    );
}

function NovoAgendamentoForm({ turnos, router }: { turnos: ITurno[]; router: AppRouterInstance }) {
    const formRef = useRef<HTMLFormElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { handleCreateAgendamento } = hooksAgendamentoForm(turnos);
    const [phoneValue, setPhoneValue] = useState('');
    const [cepValue, setCepValue] = useState('');
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [googleMapsUrl, setGoogleMapsUrl] = useState('');
    const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const resetForm = () => {
        if (formRef.current) {
            formRef.current.reset();
            setPhoneValue('');
            setCepValue('');
            setSelectedFiles([]);
            setPreviews([]);
            setGoogleMapsUrl('');
            setLocationStatus('idle');
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const masked = maskPhone(e.target.value);
        setPhoneValue(masked);
    };

    const handleCEPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const masked = maskCEP(e.target.value);
        setCepValue(masked);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        
        // Limitar a 10 fotos
        if (selectedFiles.length + files.length > 10) {
            toast.error('Você pode enviar no máximo 10 fotos');
            return;
        }

        // Validar tipos de arquivo
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        const invalidFiles = files.filter(file => !validTypes.includes(file.type));
        if (invalidFiles.length > 0) {
            toast.error('Apenas arquivos de imagem são permitidos (JPEG, PNG, GIF, WEBP)');
            return;
        }

        // Validar tamanho (5MB por arquivo)
        const oversizedFiles = files.filter(file => file.size > 5 * 1024 * 1024);
        if (oversizedFiles.length > 0) {
            toast.error('Cada foto deve ter no máximo 5MB');
            return;
        }

        const newFiles = [...selectedFiles, ...files];
        setSelectedFiles(newFiles);

        // Criar previews
        const previewPromises = files.map(file => {
            return new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (e.target?.result) {
                        resolve(e.target.result as string);
                    }
                };
                reader.readAsDataURL(file);
            });
        });

        Promise.all(previewPromises).then(newPreviews => {
            setPreviews([...previews, ...newPreviews]);
        });
    };

    const removeFile = (index: number) => {
        const newFiles = selectedFiles.filter((_, i) => i !== index);
        const newPreviews = previews.filter((_, i) => i !== index);
        setSelectedFiles(newFiles);
        setPreviews(newPreviews);
    };

    const handleGetLocation = () => {
        if (!navigator.geolocation) {
            toast.error('Geolocalização não é suportada pelo seu navegador');
            setLocationStatus('error');
            return;
        }

        setLocationStatus('loading');
        toast.info('Obtendo localização...');

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                // Criar URL do Google Maps com as coordenadas
                const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
                setGoogleMapsUrl(mapsUrl);
                setLocationStatus('success');
                toast.success('Localização obtida com sucesso!');
            },
            (error) => {
                console.error('Erro ao obter localização:', error);
                let errorMessage = 'Erro ao obter localização';
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = 'Permissão de localização negada. Por favor, permita o acesso à localização.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = 'Informações de localização indisponíveis.';
                        break;
                    case error.TIMEOUT:
                        errorMessage = 'Tempo esgotado ao obter localização.';
                        break;
                }
                toast.error(errorMessage);
                setLocationStatus('error');
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.set('telefone', phoneValue.replace(/\D/g, ''));
        formData.set('cep', cepValue.replace(/\D/g, ''));
        
        // Remover fotos do FormData (se houver) para evitar duplicação
        formData.delete('fotos');
        
        // Adicionar fotos ao FormData manualmente
        selectedFiles.forEach((file) => {
            formData.append('fotos', file);
        });

        // Adicionar Google Maps URL se houver
        if (googleMapsUrl) {
            formData.set('google_maps_url', googleMapsUrl);
        }
        
        const success = await handleCreateAgendamento(formData, resetForm);
        if (success) {
            setTimeout(() => {
                router.push('/agendamentos/list');
            }, 1500);
        }
    };

    return (
        <form 
            ref={formRef}
            className={formStyles.form} 
            onSubmit={handleSubmit}
            encType="multipart/form-data"
        >
            {/* Cartão de Dados Pessoais */}
            <div className={formStyles.card}>
                <div className={formStyles.cardHeader}>
                    <div className={formStyles.cardIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-4.987-3.744A7.966 7.966 0 0 0 12 20c1.97 0 3.773-.712 5.167-1.892A6.979 6.979 0 0 0 12.16 16a6.981 6.981 0 0 0-5.147 2.256zM5.616 16.82A8.975 8.975 0 0 1 12.16 14a8.972 8.972 0 0 1 6.362 2.634 8 8 0 1 0-12.906.187zM12 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="currentColor" />
                        </svg>
                    </div>
                    <h3>Contato e endereço</h3>
                </div>
                <div className={formStyles.cardBody}>
                    <div className={formStyles.inputRow}>
                        <div className={formStyles.inputGroup}>
                            <label htmlFor="nome">
                                <span>Nome Completo</span>
                                <input type="text" id="nome" required placeholder="Seu nome completo" name="nome" />
                            </label>
                        </div>
                        <div className={formStyles.inputGroup}>
                            <label htmlFor="telefone">
                                <span>Telefone/WhatsApp</span>
                                <input 
                                    type="tel" 
                                    id="telefone" 
                                    required 
                                    placeholder="(XX) XXXXX-XXXX" 
                                    name="telefone" 
                                    value={phoneValue}
                                    onChange={handlePhoneChange}
                                    maxLength={15}
                                />
                            </label>
                        </div>
                    </div>
                    <div className={formStyles.inputRow}>
                        <div className={formStyles.inputGroup}>
                            <label htmlFor="endereco">
                                <span>Endereço</span>
                                <input type="text" id="endereco" required placeholder="Rua, Avenida, etc" name="endereco" />
                            </label>
                        </div>
                        <div className={formStyles.inputGroupSmall}>
                            <label htmlFor="numero">
                                <span>Número</span>
                                <input type="text" id="numero" required placeholder="Nº" name="numero" />
                            </label>
                        </div>
                        <div className={formStyles.inputGroup}>
                            <label htmlFor="setor">
                                <span>Bairro/Setor</span>
                                <input type="text" id="setor" required placeholder="Seu bairro ou setor" name="setor" />
                            </label>
                        </div>
                        <div className={formStyles.inputGroupSmall}>
                            <label htmlFor="cep">
                                <span>CEP</span>
                                <input 
                                    type="text" 
                                    id="cep" 
                                    required 
                                    placeholder="XXXXX-XXX" 
                                    name="cep" 
                                    value={cepValue}
                                    onChange={handleCEPChange}
                                    maxLength={9}
                                />
                            </label>
                        </div>
                    </div>
                    <div className={formStyles.inputGroup}>
                        <label htmlFor="google_maps_url">
                            <span>Localização</span>
                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                                <input 
                                    type="url" 
                                    id="google_maps_url" 
                                    placeholder="Link do Google Maps ou coordenadas GPS" 
                                    name="google_maps_url"
                                    value={googleMapsUrl}
                                    onChange={(e) => setGoogleMapsUrl(e.target.value)}
                                    style={{ flex: 1 }}
                                />
                                <button
                                    type="button"
                                    onClick={handleGetLocation}
                                    disabled={locationStatus === 'loading'}
                                    style={{
                                        padding: '0.75rem 1rem',
                                        backgroundColor: locationStatus === 'success' ? '#28a745' : 'var(--cor-primaria)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: locationStatus === 'loading' ? 'not-allowed' : 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        whiteSpace: 'nowrap',
                                        opacity: locationStatus === 'loading' ? 0.6 : 1
                                    }}
                                    title="Obter localização GPS"
                                >
                                    <FaMapMarkerAlt size={16} />
                                    {locationStatus === 'loading' ? 'Obtendo...' : 'GPS'}
                                </button>
                            </div>
                            <small style={{ display: 'block', marginTop: '0.5rem', color: '#666', fontSize: '0.85rem' }}>
                                Clique em "GPS" para obter sua localização automaticamente ou cole o link do Google Maps manualmente
                            </small>
                        </label>
                    </div>
                </div>
            </div>

            {/* Cartão de Fotos dos Medicamentos */}
            <div className={formStyles.card}>
                <div className={formStyles.cardHeader}>
                    <div className={formStyles.cardIcon}>
                        <FaCamera size={20} />
                    </div>
                    <h3>Fotos dos Medicamentos (Opcional)</h3>
                </div>
                <div className={formStyles.cardBody}>
                    <div className={formStyles.uploadSection}>
                        <p className={formStyles.uploadDescription}>
                            Envie fotos dos medicamentos que serão coletados. Você pode enviar até 10 fotos.
                        </p>
                        <div className={formStyles.uploadButtonsContainer}>
                            <input
                                ref={fileInputRef}
                                type="file"
                                id="fotos"
                                name="fotos"
                                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                                multiple
                                onChange={handleFileChange}
                                className={formStyles.fileInput}
                            />
                            <label htmlFor="fotos" className={formStyles.fileInputLabel}>
                                <FaUpload size={18} />
                                <span>Selecionar Fotos</span>
                            </label>
                            {selectedFiles.length > 0 && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSelectedFiles([]);
                                        setPreviews([]);
                                        if (fileInputRef.current) {
                                            fileInputRef.current.value = '';
                                        }
                                    }}
                                    className={formStyles.clearButton}
                                    title="Limpar todas as fotos"
                                >
                                    <FaTimes size={16} />
                                    <span>Limpar Fotos</span>
                                </button>
                            )}
                        </div>
                        
                        {previews.length > 0 && (
                            <div className={formStyles.previewsContainer}>
                                <p className={formStyles.previewsTitle}>
                                    {previews.length} foto{previews.length > 1 ? 's' : ''} selecionada{previews.length > 1 ? 's' : ''}
                                </p>
                                <div className={formStyles.previewsGrid}>
                                    {previews.map((preview, index) => (
                                        <div key={index} className={formStyles.previewItem}>
                                            <img src={preview} alt={`Preview ${index + 1}`} />
                                            <button
                                                type="button"
                                                onClick={() => removeFile(index)}
                                                className={formStyles.removeButton}
                                                title="Remover foto"
                                            >
                                                <FaTimes size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Cartão de Detalhes da Coleta */}
            <div className={formStyles.card}>
                <div className={formStyles.cardHeader}>
                    <div className={formStyles.cardIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M17 3h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1h2v2h6V1h2v2zm3 8H4v8h16v-8zm-5-6H9v2H7V5H4v4h16V5h-3v2h-2V5zm-9 8h2v2H6v-2zm5 0h2v2h-2v-2zm5 0h2v2h-2v-2z" fill="currentColor" />
                        </svg>
                    </div>
                    <h3>Melhor dia e horário para coleta</h3>
                </div>
                <div className={formStyles.cardBody}>
                    <div className={formStyles.inputRow}>
                        <div className={formStyles.inputGroup}>
                            <label htmlFor="turno">
                                <span>Turno</span>
                                <select id="turno" name="turno" required>
                                    {turnos.map((turno, index) => (
                                        <option key={turno.id} value={index}>
                                            {turno.descricao}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <div className={formStyles.inputGroup}>
                            <label htmlFor="datavisita">
                                <span>Melhor Data</span>
                                <textarea id="datavisita" placeholder="Qual melhores dias da semana ou do mês para a coleta?" required rows={2} name="datavisita" />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className={formStyles.formFooter}>
                <button type="submit" className={formStyles.btnSubmit}>Confirmar Agendamento</button>
            </div>
        </form>
    );
}


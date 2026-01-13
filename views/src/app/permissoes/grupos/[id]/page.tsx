'use client';

import { useEffect, useState } from 'react';
import { api } from '@/api/api';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { getCookieClient } from '@/lib/cookieClient';
import Header from '../../../home/components/header';
import Menu from '../../../components/menu';
import WithPermission from '@/components/withPermission';
import { usePermissions } from '@/hooks/usePermissions';
import styles from './page.module.css';
import Link from 'next/link';

interface Grupo {
    id: number;
    nome: string;
    descricao?: string;
    rolePermissoes: {
        id: number;
        permissao: {
            id: number;
            nome: string;
            descricao?: string;
            pagina?: string;
            acao?: string;
        };
    }[];
}

interface Permissao {
    id: number;
    nome: string;
    descricao?: string;
    pagina?: string;
    acao?: string;
}

export default function GrupoPermissoesPage() {
    const router = useRouter();
    const params = useParams();
    const { isAdmin } = usePermissions();
    const [grupo, setGrupo] = useState<Grupo | null>(null);
    const [permissoes, setPermissoes] = useState<Permissao[]>([]);
    const [selectedPermissoes, setSelectedPermissoes] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const token = getCookieClient();
        if (!token) {
            toast.error('Você precisa estar logado para acessar esta página');
            router.push('/login');
            return;
        }
        if (params.id) {
            loadData(Number(params.id));
        }
    }, [router, params.id]);

    const loadData = async (grupoId: number) => {
        try {
            setLoading(true);
            const token = getCookieClient();
            if (!token) return;

            const [grupoRes, permissoesRes] = await Promise.all([
                api.get(`/role/${grupoId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                api.get('/permissoes', {
                    headers: { Authorization: `Bearer ${token}` }
                })
            ]);

            setGrupo(grupoRes.data);
            setPermissoes(permissoesRes.data);
            
            // Marcar permissões já atribuídas
            const permissoesIds = grupoRes.data.rolePermissoes.map((rp: any) => rp.permissao.id);
            setSelectedPermissoes(permissoesIds);
        } catch (error: any) {
            console.error('Erro ao carregar dados:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error('Erro ao carregar dados');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleTogglePermissao = (permissaoId: number) => {
        setSelectedPermissoes(prev => {
            if (prev.includes(permissaoId)) {
                return prev.filter(id => id !== permissaoId);
            } else {
                return [...prev, permissaoId];
            }
        });
    };

    const handleSelectAll = () => {
        const allPermissoesIds = permissoes.map(p => p.id);
        setSelectedPermissoes(allPermissoesIds);
    };

    const handleDeselectAll = () => {
        setSelectedPermissoes([]);
    };

    const handleSave = async () => {
        if (!grupo) return;

        try {
            setSaving(true);
            const token = getCookieClient();
            if (!token) return;

            await api.put(`/role/${grupo.id}/permissoes`, {
                permissoes_ids: selectedPermissoes
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast.success('Permissões atualizadas com sucesso!');
            loadData(grupo.id);
        } catch (error: any) {
            console.error('Erro ao salvar permissões:', error);
            if (error.response?.status === 401) {
                toast.error('Sessão expirada. Faça login novamente.');
                router.push('/login');
            } else {
                toast.error('Erro ao salvar permissões');
            }
        } finally {
            setSaving(false);
        }
    };

    // Agrupar permissões por página
    const permissoesPorPagina = permissoes.reduce((acc, permissao) => {
        const pagina = permissao.pagina || 'Outras';
        if (!acc[pagina]) {
            acc[pagina] = [];
        }
        acc[pagina].push(permissao);
        return acc;
    }, {} as Record<string, Permissao[]>);

    return (
        <WithPermission requiredPermission="admin">
            <Header />
            <Menu />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.header}>
                            <Link href="/permissoes/grupos/list" className={styles.btnBack}>
                                ← Voltar
                            </Link>
                            {grupo && isAdmin && (
                                <>
                                    <Link 
                                        href={`/permissoes/grupos/${grupo.id}/editar`}
                                        className={styles.btnEdit}
                                    >
                                        Editar Grupo
                                    </Link>
                                    <button
                                        onClick={handleSave}
                                        className={styles.btnSave}
                                        disabled={saving}
                                    >
                                        {saving ? 'Salvando...' : 'Salvar Permissões'}
                                    </button>
                                </>
                            )}
                        </div>

                        {loading ? (
                            <div className={styles.loadingContainer}>
                                <p>Carregando...</p>
                            </div>
                        ) : !grupo ? (
                            <div className={styles.errorContainer}>
                                <p>Grupo não encontrado</p>
                            </div>
                        ) : (
                            <div className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <div>
                                        <h1>{grupo.nome}</h1>
                                        {grupo.descricao && <p className={styles.description}>{grupo.descricao}</p>}
                                    </div>
                                </div>

                                <div className={styles.cardBody}>
                                    <div className={styles.permissionsHeader}>
                                        <h3>Selecione as permissões para este grupo:</h3>
                                        <div className={styles.selectButtons}>
                                            <button
                                                type="button"
                                                onClick={handleSelectAll}
                                                className={styles.btnSelectAll}
                                            >
                                                Marcar Tudo
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleDeselectAll}
                                                className={styles.btnDeselectAll}
                                            >
                                                Desmarcar Tudo
                                            </button>
                                        </div>
                                    </div>
                                    
                                    {Object.keys(permissoesPorPagina).length === 0 ? (
                                        <div className={styles.emptyState}>
                                            <p>Nenhuma permissão cadastrada. Crie permissões primeiro.</p>
                                        </div>
                                    ) : (
                                        <div className={styles.permissoesGrid}>
                                            {Object.entries(permissoesPorPagina).map(([pagina, permissoesPagina]) => (
                                                <div key={pagina} className={styles.paginaGroup}>
                                                    <h4 className={styles.paginaTitle}>{pagina}</h4>
                                                    <div className={styles.permissoesList}>
                                                        {permissoesPagina.map((permissao) => (
                                                            <label
                                                                key={permissao.id}
                                                                className={`${styles.permissaoItem} ${selectedPermissoes.includes(permissao.id) ? styles.selected : ''}`}
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    checked={selectedPermissoes.includes(permissao.id)}
                                                                    onChange={() => handleTogglePermissao(permissao.id)}
                                                                />
                                                                <div className={styles.permissaoContent}>
                                                                    <span className={styles.permissaoNome}>{permissao.nome}</span>
                                                                    {permissao.descricao && (
                                                                        <span className={styles.permissaoDescricao}>{permissao.descricao}</span>
                                                                    )}
                                                                </div>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </WithPermission>
    );
}

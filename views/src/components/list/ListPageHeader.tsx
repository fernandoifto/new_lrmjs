'use client';

import { ReactNode } from 'react';
import styles from './ListPage.module.css';

type Props = {
    icon: ReactNode;
    title: string;
    subtitle?: string;
    actions?: ReactNode;
};

export function ListPageHeader({ icon, title, subtitle, actions }: Props) {
    return (
        <div className={styles.pageHeader}>
            <div className={styles.headerContent}>
                <div className={styles.headerIcon}>{icon}</div>
                <div>
                    <h1>{title}</h1>
                    {subtitle ? <p>{subtitle}</p> : null}
                </div>
            </div>
            {actions ? <div className={styles.headerActions}>{actions}</div> : null}
        </div>
    );
}

'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function RedirectContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        const qs = params.toString();
        router.replace(qs ? `/agendamentos?${qs}` : '/agendamentos');
    }, [router, searchParams]);

        return null;
    }

export default function AgendamentosListRedirectPage() {
    return (
        <Suspense fallback={null}>
            <RedirectContent />
        </Suspense>
    );
}

export function formatPhone(phone: string) {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11) return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    if (cleaned.length === 10) return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    return phone;
}

/** Link universal: app no celular, WhatsApp Desktop/Web no computador. */
export function whatsappUrl(phone: string): string | null {
    const digits = phone.replace(/\D/g, '');
    if (!digits) return null;
    const withCountry = digits.startsWith('55') ? digits : `55${digits}`;
    return `https://wa.me/${withCountry}`;
}

/**
 * Funções de máscara para campos do formulário
 */

/**
 * Aplica máscara de telefone brasileiro
 * Formatos: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
 */
export function maskPhone(value: string): string {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    // Limita a 11 dígitos (com DDD + 9 dígitos)
    const limitedNumbers = numbers.slice(0, 11);
    
    // Aplica a máscara
    if (limitedNumbers.length <= 2) {
        return limitedNumbers ? `(${limitedNumbers}` : '';
    } else if (limitedNumbers.length <= 7) {
        return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2)}`;
    } else if (limitedNumbers.length <= 10) {
        // Telefone fixo: (XX) XXXX-XXXX
        return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2, 6)}-${limitedNumbers.slice(6)}`;
    } else {
        // Celular: (XX) XXXXX-XXXX
        return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2, 7)}-${limitedNumbers.slice(7)}`;
    }
}

/**
 * Aplica máscara de CEP brasileiro
 * Formato: XXXXX-XXX
 */
export function maskCEP(value: string): string {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    // Limita a 8 dígitos
    const limitedNumbers = numbers.slice(0, 8);
    
    // Aplica a máscara
    if (limitedNumbers.length <= 5) {
        return limitedNumbers;
    } else {
        return `${limitedNumbers.slice(0, 5)}-${limitedNumbers.slice(5)}`;
    }
}

/**
 * Remove máscara de telefone, retornando apenas números
 */
export function unmaskPhone(value: string): string {
    return value.replace(/\D/g, '');
}

/**
 * Remove máscara de CEP, retornando apenas números
 */
export function unmaskCEP(value: string): string {
    return value.replace(/\D/g, '');
}

/**
 * Aplica máscara de CPF brasileiro
 * Formato: XXX.XXX.XXX-XX
 */
export function maskCPF(value: string): string {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    // Limita a 11 dígitos
    const limitedNumbers = numbers.slice(0, 11);
    
    // Aplica a máscara
    if (limitedNumbers.length <= 3) {
        return limitedNumbers;
    } else if (limitedNumbers.length <= 6) {
        return `${limitedNumbers.slice(0, 3)}.${limitedNumbers.slice(3)}`;
    } else if (limitedNumbers.length <= 9) {
        return `${limitedNumbers.slice(0, 3)}.${limitedNumbers.slice(3, 6)}.${limitedNumbers.slice(6)}`;
    } else {
        return `${limitedNumbers.slice(0, 3)}.${limitedNumbers.slice(3, 6)}.${limitedNumbers.slice(6, 9)}-${limitedNumbers.slice(9)}`;
    }
}


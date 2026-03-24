/**
 * Executado antes de qualquer módulo de teste — define segredos e ambiente.
 */
process.env.JWT_SECRET =
    process.env.JWT_SECRET || "test-jest-secret-key-must-be-long-enough-for-hs256";
process.env.NODE_ENV = "test";
// Evita carregar whatsapp-web.js durante import da árvore de rotas nos testes
process.env.USE_WHATSAPP_BUSINESS_API = process.env.USE_WHATSAPP_BUSINESS_API || "true";
process.env.WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN || "test-access-token";
process.env.WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID || "000000000000000";

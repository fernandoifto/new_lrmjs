"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthTokenFromRequest = getAuthTokenFromRequest;
const SESSION_COOKIE = "session";
/**
 * Lê JWT do header Authorization (Bearer) ou do cookie `session` (ex.: httpOnly no browser).
 */
function getAuthTokenFromRequest(request) {
    var _a;
    const auth = request.headers.authorization;
    if (auth && auth.startsWith("Bearer ")) {
        const t = auth.slice("Bearer ".length).trim();
        if (t)
            return t;
    }
    const fromParser = (_a = request.cookies) === null || _a === void 0 ? void 0 : _a[SESSION_COOKIE];
    if (fromParser && String(fromParser).trim()) {
        return String(fromParser).trim();
    }
    const cookieHeader = request.headers.cookie;
    if (!cookieHeader)
        return null;
    const parts = cookieHeader.split(";").map((p) => p.trim());
    for (const p of parts) {
        if (p.startsWith(`${SESSION_COOKIE}=`)) {
            const value = p.slice(SESSION_COOKIE.length + 1);
            try {
                return decodeURIComponent(value);
            }
            catch (_b) {
                return value;
            }
        }
    }
    return null;
}

export function setAuth(code) {
    localStorage.setItem("login_code", code);
}

export function clearAuth() {
    return localStorage.clear();
} 

export function getAuth() {
    return localStorage.getItem("login_code");
} 

export function isLogin() {
    var code = getAuth();
    if (code) return true;
    return false;
}
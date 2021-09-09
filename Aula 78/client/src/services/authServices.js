import jwtDecode from "jwt-decode";

const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwicm9sZSI6InN0dWRlbnQiLCJpYXQiOjE1MTYyMzkwMjJ9.0vrXzaPDApVSrC4cKj96uX1-gQ5Vs6k0daV0iegWpcU";
const REFRESH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";

function getRoleFromAccessToken(accessToken) {
    const { role } = jwtDecode(accessToken);

    return role;
}

function login(email, password) {
    return new Promise((resolve, reject) => {        
        setTimeout(() => {
            if (email === "a@a" && password === "123")  {
                resolve({ 
                    accessToken: ACCESS_TOKEN,
                    refreshToken: REFRESH_TOKEN
                });
            } else {
                reject(new Error("E-mail ou senha inválidos"));
            }
        }, 3000);
    });
}

function verifyToken(accessToken) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (accessToken !== ACCESS_TOKEN) {
                reject(new Error("Invalid access-token"));
            }

            console.log("Token válido");
            resolve();
        }, 100);
    });
}

function refreshToken(refreshToken) {
    console.log(refreshToken);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (refreshToken !== REFRESH_TOKEN) {
                reject(new Error("Refresh Token invalid!"));
            } else {
                resolve({
                    newAccessToken: ACCESS_TOKEN,
                    newRefreshToken: REFRESH_TOKEN
                });
            }
        }, 100);
    });
}

const authServices = {
    login,
    getRoleFromAccessToken,
    verifyToken,
    refreshToken
}

export default authServices;

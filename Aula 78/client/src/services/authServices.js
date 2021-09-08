const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwicm9sZSI6InN0dWRlbnQiLCJpYXQiOjE1MTYyMzkwMjJ9.0vrXzaPDApVSrC4cKj96uX1-gQ5Vs6k0daV0iegWpcU";

function login(email, password) {
    return new Promise((resolve, reject) => {        
        setTimeout(() => {
            if (email === "a@a" && password === "123")  {
                resolve({ accessToken: ACCESS_TOKEN });
            } else {
                reject(new Error("E-mail ou senha inválidos"));
            }
        }, 3000);
    });
}

export default {
    login
}

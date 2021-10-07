# Tipos de testes
## Testes Unitários
Testar pequenas partes do código (métodos ou funções)
```javascript
function somar(n1, n2) {
    return n1 + n2;
}

test("2 + 2 deve ser 4", () => {
    const resultado = somar(2, 2);
    expect(resultado).toBe(4);
});
```
## Testes de Integração
Testar a integração de diferentes unidades (Testar uma rota)  
Routes -> Controllers -> Services -> Models

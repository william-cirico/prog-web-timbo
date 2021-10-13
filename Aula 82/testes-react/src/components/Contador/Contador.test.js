import { Contador } from ".";
import { render, fireEvent } from "@testing-library/react";

let getByRole;

beforeEach(() => {
    const componente = render(<Contador />);
    getByRole = componente.getByRole;
});

describe("Elementos renderizam corretamente", () => {
    test("Título renderiza corretamente", () => {
        getByRole('heading', { name: /contador/i });
    });
    
    test("Contador começa em 0", () => {
        getByRole('heading', { name: /0/i });
    });
    
    test("O valor do Input começa em 1", () => {
        const input = getByRole('spinbutton');
        expect(input.value).toBe("1");
    });
    
    test("Botão de adicionar renderiza corretamente", () => {
        getByRole('button', { name: "-" });
    });
    
    test("Botão de subtrair renderiza corretamente", () => {
        getByRole('button', { name: "+" });
    });

    test("Contador não possui classe inicialmente", () => {
        const contador = getByRole('heading', { name: /0/i });

        expect(contador.className).toBe("");
    });
});

describe("Eventos dos elementos funcionam corretamente", () => {
    test("Deve ser possível mudar o valor do input", () => {
        const input = getByRole('spinbutton');

        fireEvent.change(input, {
            target: {
                value: "5"
            }
        });

        expect(input.value).toBe("5");
    });

    test("Clique no botão de adicionar incrementa o contador", () => {
        const button = getByRole('button', { name: "+" });
        const contador = getByRole('heading', { name: /0/i });

        fireEvent.click(button);

        expect(contador.textContent).toBe("1");
    });

    test("Clique no botão de subtrair decrementa o contador", () => {
        const button = getByRole('button', { name: "-" });
        const contador = getByRole('heading', { name: /0/i });

        fireEvent.click(button);

        expect(contador.textContent).toBe("-1");
    });

    test("Mudar o valor do input e clicar no botão de adicionar funciona corretamente", () => {
        const button = getByRole('button', { name: "+" });
        const contador = getByRole('heading', { name: /0/i });
        const input = getByRole('spinbutton');

        fireEvent.change(input, {
            target: {
                value: "5"
            }
        });

        fireEvent.click(button);

        expect(contador.textContent).toBe("5");
    });

    test("Mudar o valor do input e clicar no botão de subtrair funciona corretamente", () => {
        const button = getByRole('button', { name: "-" });
        const contador = getByRole('heading', { name: /0/i });
        const input = getByRole('spinbutton');

        fireEvent.change(input, {
            target: {
                value: "5"
            }
        });

        fireEvent.click(button);

        expect(contador.textContent).toBe("-5");
    });
    
    test("A classe do contador atualiza corretamente", () => {
        const contador = getByRole('heading', { name: /0/i });
        const input = getByRole('spinbutton');
        const buttonIncremento = getByRole('button', { name: "+" });
        const buttonDecremento = getByRole('button', { name: "-" });

        fireEvent.change(input, {
            target: {
                value: "100"
            }
        });
        fireEvent.click(buttonDecremento);

        expect(contador.className).toBe("vermelho");

        fireEvent.change(input, {
            target: {
                value: "200"
            }
        });
        fireEvent.click(buttonIncremento);

        expect(contador.className).toBe("verde");

        fireEvent.change(input, {
            target: {
                value: "50"
            }
        });
        fireEvent.click(buttonDecremento);

        expect(contador.className).toBe("");
    });
});

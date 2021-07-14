// A linha abaixo habilita a checagem de tipos no VSCode
// @ts-check


// @type -> Tipo de uma variável
/**
 * Nome de uma pessoa
 * @type {string}
 */
const nome = "José"

/**
 * Número qualquer
 * @type {number}
 */
const numero = 10

/**
 * Vetor de números
 * @type {Array<number>}
 */
const vetor = [10, 20, 30]

/**
 * Vetor de strings
 * @type {Array<string>}
 */
const vetorString = ["A", "B", "C"]

/**
 * Objeto pessoa
 * @type {{nome: string, idade: number}}
 */
const pessoa = {
    nome: "José",
    idade: 18
}

/**
 * Soma dois números
 * @param {number} n1 - O primeiro número
 * @param {number} n2 - O segundo número
 * @returns {number} A soma entre n1 e n2
*/
function somaDoisNumeros(n1, n2) {
    return n1 + n2
}

/**
 * Retorna a metade do número informado ou false caso o número seja ímpar
 * @param {number} numero
 * @param {number} [paramOpcional] - Um parâmetro opcional qualquer
 * @param {number} [paramOpcionalComDefault=10] - Um parâmetro opcional com um valor default
 * @returns {number|boolean} Metade do número informado ou false
 */
 function divideNumeroPar(numero, paramOpcional, paramOpcionalComDefault = 10) {
    if (numero % 2 == 0) return numero / 2
    return false
}

/** Classe representando um aluno */
export class Aluno {
    /**
     * Cria um aluno
     * @param {number} matricula - A matrícula do aluno
     * @param {string} nome - O nome do aluno
     * @param {number} idade - A idade do aluno
     */
    constructor(matricula, nome, idade) {
        this.matricula = matricula
        this.nome = nome
        this.idade = idade
        /**
         * @type {Array<number>}
         */
        this.notas = []
        this.media = 0
    }

    /** 
     * Função que calcula média 
     * @returns {void}
     */
    calculaMedia() {
        let soma = this.notas.reduce((previous, current) => previous + current)
        this.media = soma / this.notas.length
    }
}

/**
 * Objeto da classe aluno
 * @type {Aluno}
 */
let aluno = new Aluno(123, "José", 20)
aluno.notas = [10, 9, 8]

/**
 * @todo Escrever a documentação
 * @todo Implementar essa função
 */ 
 function clonarCartao() {
    // Implementar
}
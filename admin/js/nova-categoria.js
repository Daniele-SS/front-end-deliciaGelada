/***********************************************************************************
 * Objetivo: Integração da página de cadastro de nova categoria
 * Data: 17/06/2026
 * Autora: Daniele Silva Santos
 * Versão: 1.0
 ***********************************************************************************/

const BASE_URL = 'http://localhost:3000/v1/fynix/deliciagelada'

async function salvarNovaCategoria() {

    // Captura os valores do formulário
    const nome      = document.getElementById('nomeCategoria').value.trim()
    const descricao = document.getElementById('descricaoCategoria').value.trim()
    const foto      = document.getElementById('fotoCategoria').value.trim()
    const ativa     = document.getElementById('categoriaAtiva').checked
    const id_status = ativa ? 1 : 2

    // Validação básica no frontend (RNF018)
    if (nome == null || !nome || isNaN(nome)) {
        alert('O nome da categoria é obrigatório.')
        return
    }

    // Monta o corpo da requisição conforme o contrato da API
    const body = {
        nome: nome,
        descricao: descricao,
        foto: foto,
        id_status: id_status
    }

    try {
        const resposta = await fetch(`${BASE_URL}/categoria`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        if (resposta.status === 201) {
            alert('Categoria cadastrada com sucesso!')
            // limpa o formulário após salvar
            document.getElementById('nomeCategoria').value      = ''
            document.getElementById('descricaoCategoria').value = ''
            document.getElementById('fotoCategoria').value      = ''
            document.getElementById('categoriaAtiva').checked   = true
        } else {
            const erro = await resposta.json()
            console.error('Erro da API:', erro)
            alert('Erro ao cadastrar categoria. Tente novamente.')
        }

    } catch (erro) {
        console.error('Erro na requisição:', erro)
        alert('Não foi possível conectar ao servidor. Verifique se o backend está rodando.')
    }
}
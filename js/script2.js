/**
 * Script de Alimentação Automática de Clientes
 * Origem: leads/leads.json
 */

async function carregarDadosDoJson() {
    const corpoTabela = document.getElementById('lista-corpo');
    
    // Mostra um estado de carregamento simples
    corpoTabela.innerHTML = '<tr><td colspan="5" style="text-align:center">Carregando dados...</td></tr>';

    try {
        const response = await fetch('leads/leads.json');
        
        if (!response.ok) {
            throw new Error('Não foi possível carregar o arquivo JSON.');
        }

        const dados = await response.json();
        corpoTabela.innerHTML = ''; // Limpa o carregando

        // Filtrar e Renderizar
        dados.forEach(item => {
            const info = item.contato;
            const faturamentoValor = parseFloat(info.faturamento);

            // Regra de Negócio: Mínimo 50.000
            if (faturamentoValor >= 50000) {
                const tr = document.createElement('tr');

                // Formata o dinheiro para o padrão brasileiro
                const faturamentoBR = faturamentoValor.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                });

                // Normaliza o nome do plano para a classe CSS (tira espaços e acentos se houver)
                const classePlano = info.plano.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

                tr.innerHTML = `
                    <td data-label="Nome" class="client-name">${info.nome}</td>
                    <td data-label="Telefone">${info.telefone}</td>
                    <td data-label="E-mail">${info.email}</td>
                    <td data-label="Faturamento" class="revenue">${faturamentoBR}</td>
                    <td data-label="Plano">
                        <span class="plan-tag ${classePlano}">${info.plano}</span>
                    </td>
                `;
                corpoTabela.appendChild(tr);
            }
        });

        // Caso nenhum lead passe no filtro de 50k
        if (corpoTabela.innerHTML === '') {
            corpoTabela.innerHTML = '<tr><td colspan="5" style="text-align:center">Nenhum cliente atende aos critérios de faturamento.</td></tr>';
        }

    } catch (erro) {
        console.error('Erro na requisição:', erro);
        corpoTabela.innerHTML = `<tr><td colspan="5" style="text-align:center; color:red;">Erro ao carregar leads. Verifique se o arquivo existe e se você está usando um servidor local (Live Server).</td></tr>`;
    }
}

// Executa a função quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', carregarDadosDoJson);
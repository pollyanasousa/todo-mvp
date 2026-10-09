/* ============================================================
   TodoFilters.js — Filtros Todas / Ativas / Completadas
   Um único listener no container dos botões (event delegation).
   Estado ativo: classe .is-active + aria-pressed (CSS e AT).
   ============================================================ */

/**
 * Liga os botões de filtro.
 * @param {{ aoFiltrar: (filtro: 'todas'|'ativas'|'completadas') => void }} callbacks
 */
export function iniciarTodoFiltros({ aoFiltrar }) {
  const container = document.getElementById('todo-filters');

  container.addEventListener('click', (evento) => {
    const botao = evento.target.closest('.filter-btn');
    if (!botao) return;

    const filtro = botao.dataset.filter;
    if (!filtro) return;

    definirFiltroAtivo(container, botao);
    aoFiltrar(filtro);
  });
}

/**
 * Marca o botão clicado como ativo e desativa os demais.
 * CSS: .filter-btn.is-active / [aria-pressed="true"].
 */
function definirFiltroAtivo(container, botaoAtivo) {
  container.querySelectorAll('.filter-btn').forEach((botao) => {
    const ativo = botao === botaoAtivo;
    botao.classList.toggle('is-active', ativo);
    botao.setAttribute('aria-pressed', String(ativo));
  });
}

/**
 * Atualiza as contagens exibidas dentro de cada chip de filtro.
 * @param {{ todas: number, ativas: number, completadas: number }} contagens
 */
export function atualizarContagensFiltros({ todas, ativas, completadas }) {
  const container = document.getElementById('todo-filters');
  const valores = { todas, ativas, completadas };

  container.querySelectorAll('.filter-count').forEach((el) => {
    const filtro = el.dataset.count;
    if (filtro in valores) el.textContent = String(valores[filtro]);
  });
}

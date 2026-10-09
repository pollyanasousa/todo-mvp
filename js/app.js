/* ============================================================
   app.js — Ponto de entrada (ES6 modules)
   Liga estado (core/state), persistência (core/storage) e
   componentes. Responsável por: contador de ativas, filtros,
   estado vazio e "Limpar completadas".
   ============================================================ */

import * as state from './core/state.js';
import { carregarTodos, salvarTodos } from './core/storage.js';
import { iniciarTodoInput } from './components/TodoInput.js';
import {
  iniciarTodoList,
  renderizarLista,
  inserirItemTodo,
  removerItemComAnimacao,
  removerItensComAnimacao,
} from './components/TodoList.js';
import { iniciarTodoFiltros, atualizarContagensFiltros } from './components/TodoFilters.js';

/** Filtro atualmente selecionado. */
let filtroAtual = 'todas';

/** Referências de elementos da página. */
const elData = document.getElementById('app-date');
const elContador = document.getElementById('active-count');
const elEstadoVazio = document.getElementById('empty-state');
const elTextoVazio = document.getElementById('empty-state-text');
const elLimparCompletadas = document.getElementById('clear-completed');
const elStatTotal = document.getElementById('stat-total');
const elStatPendentes = document.getElementById('stat-pendentes');
const elStatFeitas = document.getElementById('stat-feitas');
const elProgressoValor = document.getElementById('progress-value');
const elProgressoTrilho = document.getElementById('progress-track');
const elProgressoPreenchimento = document.getElementById('progress-fill');

/** Tarefas visíveis sob o filtro atual. */
function visiveis() {
  return state.filterTodos(filtroAtual);
}

/** Exibe a data de hoje formatada em pt-BR no header. */
function atualizarData() {
  const hoje = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date());
  // Capitaliza a primeira letra ("sexta-feira, ..." -> "Sexta-feira, ...")
  elData.textContent = hoje.charAt(0).toUpperCase() + hoje.slice(1);
}

/** Atualiza contador, métricas, progresso, estado vazio e botão "Limpar completadas". */
function atualizarMeta() {
  const total = state.getTodos().length;
  const ativas = state.countActive();
  const feitas = total - ativas;

  // Contador de tarefas ativas (plural correto)
  elContador.textContent = ativas === 1 ? '1 ativa' : `${ativas} ativas`;

  // Cards de contagem: Total / Pendentes / Feitas
  elStatTotal.textContent = String(total);
  elStatPendentes.textContent = String(ativas);
  elStatFeitas.textContent = String(feitas);

  // Card "Progresso do Dia": % de concluídas (0% quando não há tarefas)
  const percentual = total === 0 ? 0 : Math.round((feitas / total) * 100);
  elProgressoValor.textContent = `${percentual}%`;
  elProgressoPreenchimento.style.width = `${percentual}%`;
  elProgressoTrilho.setAttribute('aria-valuenow', String(percentual));

  // Contagens dentro dos chips de filtro (Todas 4 / Ativas 3 / Completadas 1)
  atualizarContagensFiltros({ todas: total, ativas, completadas: feitas });

  // Estado vazio ilustrado (contexto: sem tarefas vs. filtro sem resultados)
  const semResultados = visiveis().length === 0;
  elEstadoVazio.hidden = !semResultados;
  if (semResultados) {
    elTextoVazio.textContent =
      state.getTodos().length === 0
        ? 'Nenhuma tarefa por aqui. Adicione a primeira!'
        : 'Nenhuma tarefa neste filtro.';
  }

  // Botão destrutivo só habilita se houver concluídas
  elLimparCompletadas.disabled = !state.getTodos().some((todo) => todo.completed);
}

/** Renderização completa: lista + metadados. */
function renderizar() {
  renderizarLista(visiveis());
  atualizarMeta();
}

// ---------- Boot: carrega do localStorage e desenha o estado inicial ----------
atualizarData();
state.setTodos(carregarTodos());
renderizar();

// ---------- Input: adicionar (Enter ou botão "+") ----------
iniciarTodoInput({
  aoAdicionar(texto) {
    const nova = state.addTodo(texto);
    if (!nova) return;

    salvarTodos(state.getTodos());

    // Só insere no DOM se passar pelo filtro atual (ex.: filtro "Completadas")
    if (visiveis().includes(nova)) {
      inserirItemTodo(nova); // animação de slide in
    }
    atualizarMeta();
  },
});

// ---------- Lista: alternar e deletar (event delegation no <ul>) ----------
iniciarTodoList({
  aoAlternar(id, li) {
    const todo = state.toggleTodo(id);
    if (!todo) return;

    salvarTodos(state.getTodos());
    // Atualiza in-place (sem re-render) para preservar o check animado
    li.classList.toggle('is-completed', todo.completed);
    atualizarMeta();
  },

  aoDeletar(id, li) {
    // Primeiro o fade out, depois a remoção do estado
    removerItemComAnimacao(li, () => {
      li.remove();
      state.deleteTodo(id);
      salvarTodos(state.getTodos());
      atualizarMeta();
    });
  },
});

// ---------- Filtros ----------
iniciarTodoFiltros({
  aoFiltrar(filtro) {
    filtroAtual = filtro;
    renderizar();
  },
});

// ---------- Footer: "Limpar completadas" ----------
elLimparCompletadas.addEventListener('click', () => {
  const concluidasVisiveis = [
    ...document.querySelectorAll('#todo-list .todo-item.is-completed'),
  ];

  // Anima as concluídas visíveis (se houver) e então limpa o estado
  removerItensComAnimacao(concluidasVisiveis, () => {
    state.clearCompleted();
    salvarTodos(state.getTodos());
    renderizar();
  });
});

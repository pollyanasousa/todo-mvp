/* ============================================================
   TodoList.js — Lista de tarefas
   Event delegation: um único listener por evento no container
   (<ul>), nunca um listener por item.
   Animações: is-entering (slide in) e is-leaving (fade out).
   ============================================================ */

import { criarItemTodo } from './TodoItem.js';

function obterContainer() {
  return document.getElementById('todo-list');
}

/**
 * Renderização completa da lista (load inicial, filtro, limpar).
 * @param {Array} todos
 */
export function renderizarLista(todos) {
  const container = obterContainer();
  container.replaceChildren(...todos.map(criarItemTodo));
}

/**
 * Insere um item novo já com a animação de slide in.
 */
export function inserirItemTodo(todo) {
  const container = obterContainer();
  const li = criarItemTodo(todo);
  li.classList.add('is-entering');
  container.appendChild(li);

  li.addEventListener(
    'animationend',
    (evento) => {
      // Só a animação do próprio <li> interessa (filhos também bubblam)
      if (evento.target === li) li.classList.remove('is-entering');
    },
    { once: true }
  );
}

/**
 * Anima o fade out de um ou mais itens e executa callback ao final.
 * Inclui fallback por timeout caso a animação não dispare.
 * @param {HTMLLIElement[]} itens
 * @param {() => void} aoTerminar
 */
export function removerItensComAnimacao(itens, aoTerminar) {
  if (itens.length === 0) {
    aoTerminar();
    return;
  }

  let restantes = itens.length;
  itens.forEach((li) => {
    let concluido = false;
    const finalizar = () => {
      if (concluido) return;
      concluido = true;
      restantes -= 1;
      if (restantes === 0) aoTerminar();
    };

    li.classList.add('is-leaving');
    li.addEventListener(
      'animationend',
      (evento) => {
        if (evento.target === li) finalizar();
      },
      { once: true }
    );
    // Redundância caso a animação não dispare (ex.: prefers-reduced-motion)
    setTimeout(finalizar, 500);
  });
}

/** Convenience: remove um único item com animação. */
export function removerItemComAnimacao(li, aoTerminar) {
  removerItensComAnimacao([li], aoTerminar);
}

/**
 * Liga os listeners com event delegation no container da lista.
 * @param {{
 *   aoAlternar: (id: string, li: HTMLLIElement) => void,
 *   aoDeletar: (id: string, li: HTMLLIElement) => void
 * }} callbacks
 */
export function iniciarTodoList({ aoAlternar, aoDeletar }) {
  const container = obterContainer();

  // Alternar conclusão (checkbox) — um listener em todo o <ul>
  container.addEventListener('change', (evento) => {
    const alvo = evento.target;
    if (!(alvo instanceof HTMLInputElement) || !alvo.classList.contains('todo-checkbox')) return;

    const li = alvo.closest('.todo-item');
    if (!li) return;
    aoAlternar(li.dataset.id, li);
  });

  // Deletar (botão lixeira) — delegação no mesmo container
  container.addEventListener('click', (evento) => {
    const botao = evento.target.closest('.todo-delete-btn');
    if (!botao) return;

    const li = botao.closest('.todo-item');
    if (!li) return;
    aoDeletar(li.dataset.id, li);
  });
}

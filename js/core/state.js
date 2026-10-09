/* ============================================================
   state.js — Núcleo de estado da lista de tarefas
   Estado: array de { id, text, completed, createdAt }
   Funções: addTodo, toggleTodo, deleteTodo, filterTodos,
   clearCompleted (+ auxiliares de leitura).
   Sem dependências de DOM: puro e testável.
   ============================================================ */

/** Estado interno (fonte da verdade em memória). */
let todos = [];

/** Gera um id único (usa crypto.randomUUID quando disponível). */
function gerarId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 11)}`;
}

/** Retorna uma cópia superficial da referência do array atual. */
export function getTodos() {
  return todos;
}

/** Substitui o estado (usado pelo storage no carregamento inicial). */
export function setTodos(novosTodos) {
  todos = Array.isArray(novosTodos) ? novosTodos : [];
}

/**
 * Adiciona uma tarefa.
 * Validação: texto vazio ou só espaços é rejeitado (retorna null).
 */
export function addTodo(texto) {
  const textoLimpo = String(texto ?? '').trim();
  if (!textoLimpo) return null;

  const nova = {
    id: gerarId(),
    text: textoLimpo,
    completed: false,
    createdAt: Date.now(),
  };
  todos.push(nova);
  return nova;
}

/** Alterna o estado concluído de uma tarefa. Retorna a tarefa ou null. */
export function toggleTodo(id) {
  const todo = todos.find((item) => item.id === id);
  if (!todo) return null;
  todo.completed = !todo.completed;
  return todo;
}

/** Remove uma tarefa pelo id. Retorna true se encontrou. */
export function deleteTodo(id) {
  const indice = todos.findIndex((item) => item.id === id);
  if (indice === -1) return false;
  todos.splice(indice, 1);
  return true;
}

/**
 * Filtra as tarefas.
 * @param {'todas'|'ativas'|'completadas'} filtro
 */
export function filterTodos(filtro) {
  switch (filtro) {
    case 'ativas':
      return todos.filter((item) => !item.completed);
    case 'completadas':
      return todos.filter((item) => item.completed);
    case 'todas':
    default:
      return [...todos];
  }
}

/** Remove todas as tarefas concluídas. Retorna quantas foram removidas. */
export function clearCompleted() {
  const antes = todos.length;
  todos = todos.filter((item) => !item.completed);
  return antes - todos.length;
}

/** Conta as tarefas ativas (não concluídas). */
export function countActive() {
  return todos.filter((item) => !item.completed).length;
}

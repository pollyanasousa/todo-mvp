/* ============================================================
   storage.js — Persistência em localStorage
   Salva/carrega o array de tarefas com validação dos dados,
   para não quebrar o app se o localStorage estiver corrompido.
   ============================================================ */

/** Chave usada no localStorage (nomeada por projeto). */
const CHAVE_STORAGE = 'todo-mvp:todos';

/**
 * Salva o array de tarefas.
 * Falhas (modo privado, cota cheia) são ignoradas sem derrubar o app.
 */
export function salvarTodos(todos) {
  try {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(todos));
  } catch (erro) {
    console.warn('Não foi possível salvar as tarefas:', erro);
  }
}

/**
 * Carrega as tarefas do localStorage.
 * Retorna sempre um array válido ([] em caso de erro ou ausência).
 */
export function carregarTodos() {
  try {
    const bruto = localStorage.getItem(CHAVE_STORAGE);
    if (!bruto) return [];

    const dados = JSON.parse(bruto);
    if (!Array.isArray(dados)) return [];

    return dados.filter(validarTodo).map(normalizarTodo);
  } catch (erro) {
    console.warn('Não foi possível carregar as tarefas:', erro);
    return [];
  }
}

/** Verifica se um item tem o formato mínimo de uma tarefa. */
function validarTodo(item) {
  return (
    item !== null &&
    typeof item === 'object' &&
    typeof item.text === 'string' &&
    item.text.trim() !== ''
  );
}

/** Normaliza os campos para o formato { id, text, completed, createdAt }. */
function normalizarTodo(item) {
  return {
    id: typeof item.id === 'string' && item.id ? item.id : gerarIdFallback(),
    text: item.text.trim(),
    completed: Boolean(item.completed),
    createdAt: typeof item.createdAt === 'number' ? item.createdAt : Date.now(),
  };
}

/** Fallback de id caso o dado carregado não tenha um. */
function gerarIdFallback() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 11)}`;
}

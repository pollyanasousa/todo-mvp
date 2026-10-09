/* ============================================================
   TodoItem.js — Criação de um item da lista (<li>)
   Texto do usuário SEMPRE via textContent: nunca innerHTML,
   para evitar injeção de HTML.
   ============================================================ */

/**
 * Monta um <li> de tarefa a partir do objeto de estado.
 * @param {{ id: string, text: string, completed: boolean, createdAt: number }} todo
 * @returns {HTMLLIElement}
 */
export function criarItemTodo(todo) {
  const li = document.createElement('li');
  li.className = 'todo-item';
  if (todo.completed) li.classList.add('is-completed');
  li.dataset.id = todo.id;

  // Checkbox real (escondida pelo CSS) + <label> como área visual clicável
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'todo-checkbox';
  checkbox.id = `todo-${todo.id}`;
  checkbox.checked = todo.completed;

  const label = document.createElement('label');
  label.className = 'checkbox-visual';
  label.htmlFor = checkbox.id;

  // Nome acessível da checkbox (visível só para leitores de tela)
  const nomeAcessivel = document.createElement('span');
  nomeAcessivel.className = 'visually-hidden';
  nomeAcessivel.textContent = `Marcar tarefa como concluída: ${todo.text}`;
  label.appendChild(nomeAcessivel);

  // Texto da tarefa — textContent garante que HTML digitado é exibido como texto
  const texto = document.createElement('span');
  texto.className = 'todo-text';
  texto.textContent = todo.text;

  // Botão destrutivo de deletar (event delegation no container da lista)
  const botaoDeletar = document.createElement('button');
  botaoDeletar.type = 'button';
  botaoDeletar.className = 'todo-delete-btn';
  botaoDeletar.textContent = '🗑';
  botaoDeletar.setAttribute('aria-label', `Deletar tarefa: ${todo.text}`);

  li.append(checkbox, label, texto, botaoDeletar);
  return li;
}

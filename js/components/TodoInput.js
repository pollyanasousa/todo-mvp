/* ============================================================
   TodoInput.js — Formulário de nova tarefa
   Um único listener de submit no form: o Enter (submit implícito)
   e o botão "+" disparam o mesmo caminho.
   ============================================================ */

/**
 * Inicializa o input de nova tarefa.
 * @param {{ aoAdicionar: (texto: string) => void }} callbacks
 */
export function iniciarTodoInput({ aoAdicionar }) {
  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');

  // Validação de tarefa vazia: só adiciona texto não vazio
  input.addEventListener('input', () => {
    input.removeAttribute('aria-invalid');
  });

  form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const texto = input.value.trim();
    if (!texto) {
      // Estado inválido para leitores de tela + foco de volta no campo
      input.setAttribute('aria-invalid', 'true');
      input.focus();
      return;
    }

    aoAdicionar(texto);
    input.value = '';
    input.focus();
  });
}

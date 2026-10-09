# Minhas Tarefas — Todo MVP

Uma lista de tarefas simples e moderna, feita com HTML, CSS e JavaScript puros (zero frameworks). Este é um MVP desenvolvido com um workflow agêntico completo: prototipagem no Google Stitch, Design System com variáveis CSS e implementação em Vanilla JS modular.

## Enunciado da questão

**Questão 4 — Módulo: Mini-Desafio: MVP Completo de Lista de Tarefas Agêntica**

**Objetivo:** desenvolver um MVP funcional de lista de tarefas usando o workflow agêntico completo (Google Stitch, separação HTML/CSS/JS, Design System com variáveis CSS, Vanilla JS modular e prompts agênticos).

**Etapas:**

1. Prototipagem (Google Stitch)
2. Setup e Design System
3. Implementação da lógica
4. Polish e deploy

## Funcionalidades

- Adicionar tarefa pelo campo de input (tecla Enter ou botão "+"), com validação para texto vazio
- Marcar tarefa como concluída com checkbox customizada e animada
- Deletar tarefa individual pelo botão de lixeira
- Filtros **Todas / Ativas / Completadas**, com contagem em cada chip
- Contador de tarefas ativas no cabeçalho
- Data de hoje formatada no cabeçalho
- Cards de resumo: Total, Pendentes e Feitas
- Card "Progresso do Dia" com barra de porcentagem de tarefas concluídas
- Botão "Limpar completadas" no rodapé
- Estado vazio ilustrado quando não há tarefas
- Animações: tarefa entra deslizando, sai com fade out e check com efeito de mola
- Persistência automática das tarefas no `localStorage`
- Acessibilidade: contraste AA, focus rings, labels semânticos e `aria-pressed` nos filtros
- Layout mobile-first e responsivo

## Estrutura de arquivos

```
index.html
README.md
stitch-spec.json
styles/design-system.css      # Tokens: cores, tipografia, espaçamento, sombras
styles/components.css         # Componentes: input, cards, filtros, footer
styles/animations.css         # Slide in, fade out e check animado
js/core/state.js              # Estado: addTodo, toggleTodo, deleteTodo, filterTodos, clearCompleted
js/core/storage.js            # Persistência em localStorage
js/components/TodoInput.js    # Formulário de nova tarefa
js/components/TodoItem.js     # Criação de um item da lista
js/components/TodoList.js     # Lista com event delegation
js/components/TodoFilters.js  # Filtros e contagens
js/app.js                     # Ponto de entrada (wiring)
```

## Como rodar

O app usa módulos ES6, então não funciona abrindo o `index.html` direto pelo explorador de arquivos (`file://`). Sirva a pasta com um servidor local e abra no navegador:

```bash
npx serve .
```

Depois abra o endereço que o comando mostrar (algo como `http://localhost:3000`).

## Deploy

O app está publicado no GitHub Pages:

**[https://pollyanasousa.github.io/todo-mvp/](https://pollyanasousa.github.io/todo-mvp/)**

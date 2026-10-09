# AGENTS.md

## 1. Projeto
- MVP de **Lista de Tarefas** em **HTML, CSS e JavaScript 100% vanilla** (ES6+ com módulos), **zero frameworks** e zero dependências de runtime.
- **Mobile-first** e responsivo, **acessível (WCAG AA)**, com animações suaves.
- Todo o código (comentários, textos de UI) em **português do Brasil**.

## 2. Estrutura de arquivos (exatamente esta — não criar arquivos fora dela)
```
index.html
README.md
stitch-spec.json
styles/design-system.css
styles/components.css
styles/animations.css
js/core/state.js
js/core/storage.js
js/components/TodoInput.js
js/components/TodoItem.js
js/components/TodoList.js
js/components/TodoFilters.js
js/app.js
```
- CSS dividido em: tokens/design system, componentes e animações.
- JS dividido em: núcleo (estado + persistência), componentes e `app.js` como ponto de entrada (wiring/event delegation).

## 3. Entregas por etapa
### Etapa 1 — Stitch (protótipo)
- Protótipo com: header (título + contador), input de nova tarefa, lista (checkbox + botão deletar), filtros **Todas / Ativas / Completadas**, footer com **"Limpar completadas"**.
- Exportar a especificação do protótipo em **`stitch-spec.json`**.
- Documentar as decisões de design no **`README.md`**.
- Usar o MCP Stitch para gerar telas/variantes/design system em vez de montar markup manualmente.

### Etapa 2 — Design System
- Variáveis CSS: primária **azul vibrante**, fundo **cinza claro**, **sucesso verde**, **destrutivo vermelho**; fonte sans-serif com tamanhos **título / corpo / pequeno**; espaçamento em **múltiplos de 4px**; sombras sutis.
- Componentes: input com ícone e estados `+ ` e `:focus`; item com checkbox customizada e `:hover`; botões de filtro com estado ativo; botão destrutivo.
- Animações: **slide in** ao adicionar, **fade out** ao remover, **check animado**.
- Acessibilidade: focus rings, contraste AA, labels semânticos.

### Etapa 3 — Lógica
- Funcionalidades: adicionar (Enter ou botão), toggle, deletar, filtrar, contador de ativas, limpar completadas, persistência em **localStorage**, validação de tarefa vazia, estado vazio ilustrado.
- Estado: array de `{ id, text, completed, createdAt }` com `addTodo`, `toggleTodo`, `deleteTodo`, `filterTodos`, `clearCompleted`.
- Usar **event delegation** (um listener no container, não um por item).

### Etapa 4 — Polish e Deploy
- Extras **opcionais, só depois do MVP pronto**: edição inline com duplo clique, dark mode, exportar/importar JSON, atalhos de teclado, drag and drop.
- Testar responsivo no DevTools.
- Deploy no **GitHub Pages**.
- `README.md` deve conter: descrição, funcionalidades, **como rodar**, tecnologias, decisões de design e **um print**.

## 4. Como testar
- Servir localmente com **`npx serve .`** — ES modules **não funcionam** abrindo o arquivo direto (`file://`).
- Validar sintaxe dos arquivos JS com **`node --check <arquivo>.js`**.

## 5. Regras do agente (obrigatórias)
- **Nunca ler, mostrar ou commitar `opencode.json`** (contém chave do MCP Stitch).
- Garantir que `.gitignore` contenha `opencode.json` **antes de qualquer `git add`**.
- **Não criar arquivos fora da estrutura** da seção 2.
- **Antes de mudanças grandes**: mostrar o plano e **aguardar confirmação** do usuário.
- **Mudanças pequenas**, com escopo travado, mostrando o **diff curto antes de aplicar**.

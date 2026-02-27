# 📅 Agenda Diária

Aplicação web para gerenciamento de agendamentos diários, permitindo visualização, criação e remoção de compromissos em uma interface organizada e intuitiva.

---

## 🚀 Tecnologias

- Next.js 16 (App Router)
- React
- TypeScript
- Context API + useReducer
- Tailwind CSS

---

## 🧠 Arquitetura

- Gerenciamento centralizado dos agendamentos
- Separação clara entre estado global e estados locais de interface
- Componentes organizados por responsabilidade
- Estrutura preparada para fácil manutenção e evolução

Estrutura organizada por responsabilidade:
- `components/`
- `context/`
- `data/`
- `utils/`
- `types/`

---

## ✅ Funcionalidades

- Lista de horários (08:00 — 18:00)
- Exibição de agendamentos existentes
- Criação via modal com validações básicas
- Remoção de agendamentos
- Integração com dados mockados

---

## ▶ Como rodar o projeto

1. Instale as dependências:

npm install

2. Execute o servidor de desenvolvimento:

npm run dev

3. Acesse no navegador:

http://localhost:3000
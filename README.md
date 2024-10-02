# Luan Fintech Personal Finance

## **Frontend**
- Utilizar Next >= 14
- App Router
- Tailwind
- Next Auth (Para Autenticação)
- Utilizar componentes com [shad](https://ui.shadcn.com/)

## **Backend**
- Express (Hono, Fastify, pode ser outros players...)
- Middleware (Validações de Headers)
- KnexJS
- Migration
- SOLID

## **Objetivo:**
Vamos criar uma plataforma para controle financeiro pessoal.  
Ao finalizar você ja deve estar mais familiarizado com as techs utilizadas aqui no Mission Brasil.

**Requisitos Functionais:**

**Backend**
- [ ] Criar Monorepo com Backend + Frontend (Utilizar Turbopack)
- [ ] Criar Database (Adicionar Modelo no Use Case)
- [ ] Criar Módulos (Modelo do Projeto [api](https://github.com/missionbrasil/api))
- [ ] Criar Testes Unitários para todos os Serviços
- [ ] Adicionar Swagger para Documentação de Rotas
- [ ] Criar Seed -> Conta ADMIN

**Frontend**
- Páginas
  - [ ] Login
  - [ ] Registrar Transações (Crédito/Débito)
  - [ ] Edição de Transações
  - [ ] Solicitações de Crédito
  - [ ] Cadastro de Usuários
- Página Cadastro de Usuários (Mostrar Apenas para ADMIN)
  - [ ] Nome
  - [ ] E-mail
  - [ ] Role (ADMIN, MEMBER)
  - [ ] Encaminhar E-mail para Validar Token
- Página de Cadastrar Senha
  - [ ] Campo de Cadastro de Senha
- Página Transações
  - [ ] Título da Transação
  - [ ] Adicionar Anexo de Extrato
  - [ ] Descrição (Editor de Texto)
  - [ ] Botão para Salvar
  - [ ] Mensagem de Confirmação do Registro
- Página para Solicitação de Análise de Crédito (Mostrar Apenas para ADMIN)
  - [ ] Lista de Solicitações
  - [ ] Botões para Aprovar e Reprovar
- Página de Transações
  - [ ] Exibição com Tabs na Tela Inicial (Receitas | Despesas)
  - [ ] Lista de Transações
  - [ ] Grid com 4 Colunas (Data, Descrição, Valor, Ações)
  - [ ] Ações => Ver Anexo (se tiver), Editar, Remover
  - [ ] Adicionar Confirmações para Realizar as Ações (editar e remover)
  - [ ] Adicionar Campo de Busca utilizando `searchParams`


**Requisitos Não Funcionais**
- [ ] Criar Use Case
- [ ] Criar User Flow
- [ ] Criar User Story
- [ ] Criar Módulo de Autenticação
- [ ] Criar Módulo de Transactions
- [ ] Criar Módulo de Roles
- [ ] Criar Módulo de Credits

**Prestar atenção**
- Documentação
- Tratamento de erros
- Cuidado com itens de segurança
- Arquitetura
- Padrão de Commits
- Desacoplamento e reutilização de componentes
# EventFlow API

API REST para gerenciamento de eventos e venda de ingressos, com autenticação por papéis, controle de estoque e check-in por código único.

## Status do projeto

🚧 Em desenvolvimento

- [x] Estrutura do banco de dados (Prisma + PostgreSQL)
- [x] Autenticação (registro, login, JWT)
- [ ] CRUD de eventos
- [ ] Tipos de ingresso
- [ ] Compra de ingressos (com controle de concorrência)
- [ ] Check-in
- [ ] Dashboard do organizador
- [ ] Testes automatizados

## Stack técnica

- **Linguagem:** TypeScript
- **Runtime:** Node.js
- **Framework web:** Express
- **Banco de dados:** PostgreSQL
- **ORM:** Prisma
- **Autenticação:** JWT + bcrypt
- **Validação:** Zod
- **Containerização:** Docker + Docker Compose

## Funcionalidades

### Usuários
- Cadastro e login com JWT
- Papéis: `ORGANIZADOR` e `PARTICIPANTE`

### Eventos *(em desenvolvimento)*
- Criação e edição de eventos (somente organizador dono)
- Listagem pública com filtros (categoria, cidade, data)
- Cada evento pode ter múltiplos tipos de ingresso

### Ingressos *(em desenvolvimento)*
- Compra com controle seguro de estoque (sem overselling, mesmo com requisições simultâneas)
- Código único gerado por ingresso
- Check-in que impede validação duplicada

## Estrutura de pastas

```
src/
├── controllers/    # recebem a requisição HTTP e chamam os services
├── services/       # regras de negócio
├── repositories/   # acesso ao banco de dados via Prisma
├── middlewares/     # autenticação, validação, tratamento de erros
├── routes/          # definição das rotas
├── schemas/          # validação de entrada (Zod)
├── utils/            # funções auxiliares (ex: cliente Prisma)
├── app.ts            # monta o Express (middlewares + rotas)
└── server.ts          # ponto de entrada, sobe o servidor
```

## Como rodar o projeto

### Pré-requisitos
- Node.js 20+
- Docker Desktop (rodando)

### Passo a passo

```bash
# Clonar o repositório
git clone <url-do-repo>
cd eventflow-api

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env

# Subir o banco de dados PostgreSQL via Docker
docker-compose up -d

# Aplicar as migrations no banco
npx prisma migrate dev

# Iniciar o servidor em modo desenvolvimento
npm run dev
```

O servidor sobe por padrão em `http://localhost:3000`.

### Variáveis de ambiente (`.env`)

```
DATABASE_URL="postgresql://postgres:senha123@localhost:5432/eventflow?schema=public"
JWT_SECRET="sua_chave_secreta"
JWT_REFRESH_SECRET="outra_chave_secreta"
PORT=3000
```

## Endpoints disponíveis

### Autenticação

| Método | Rota | Descrição | Autenticação |
|---|---|---|---|
| POST | `/auth/register` | Cria uma conta | Não |
| POST | `/auth/login` | Autentica e retorna tokens | Não |

**Exemplo de registro:**

```json
POST /auth/register
{
  "nome": "Gabriel",
  "email": "gabriel@teste.com",
  "senha": "123456"
}
```

### Health check

| Método | Rota | Descrição |
|---|---|---|
| GET | `/health` | Verifica se a API está no ar |

## Visualizar o banco de dados

```bash
npx prisma studio
```

Abre uma interface visual (geralmente em `http://localhost:5555`) para consultar e editar os dados das tabelas diretamente.

## Modelagem de dados

- **User** (1) ──< (N) **Event** — um organizador cria vários eventos
- **Event** (1) ──< (N) **TicketType** — um evento tem vários tipos de ingresso
- **TicketType** (1) ──< (N) **Ticket** — cada tipo gera vários ingressos vendidos
- **User** (1) ──< (N) **Ticket** — um participante compra vários ingressos

## Autor

Gabriel — [GabrielOrtiz05](https://github.com/GabrielOrtiz05)

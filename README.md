# Vaga Desenvolvedor FullStack Pleno
Descrição do que foi realizado para a vaga de Desenvolvedor Fullstack Pleno.

---

## Tecnologias Utilizadas
- Angular
- Ionic
- HTML
- SCSS/CSS
- Docker/Docker-compose
- NodeJS
- C#
- ASP .NET Core
- Entity Framework
- SQLite

---

# Requisitos
- Docker
- Docker-compose

## Teste

Opção 1:

```bash
docker-compose up
ou
docker compose up -d
```

---

Opção 2:

```bash
node -v // verifique se a sua versão é a mesma v22.3.0
cd web
npm install
npm run start
o projeto web irá rodar na porta 4200

dotnet -v // verifique se a sua versão é a mesma v8.0.200
cd server/server
dotnet ef database update // cria o banco de dados
dotnet run
```

---

### Requisitos

- Funcionais
```
- [x] se cadastrar na aplicação
- [x] se autenticar na aplicação
- [x] validação do dado no cliente
- [x] cadastrar um cliente
- [x] listar os cliente cadastrados
- [x] editar um cliente
- [x] deletar um cliente e suas faturas
- [x] cadastrar uma fatura
- [x] listar as faturas cadastradas
- [x] editar uma fatura
- [x] deletar uma fatura
```

- Não funcionais
```
- [x] aplicação deve ser responsiva
- [x] validação do dado no servidor
- [x] mensagens de erro explicativas
- [x] logs
- [x] documentação
- [x] testes unitários e outros
```
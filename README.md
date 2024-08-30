# vaga-pl-localize
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

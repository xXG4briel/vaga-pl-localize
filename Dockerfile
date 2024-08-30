# Etapa 1: Construir a aplicação
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copiar o arquivo csproj e restaurar dependências
COPY *.csproj ./
RUN dotnet restore

# Copiar o restante do código e construir a aplicação
COPY . ./
RUN dotnet publish -c Release -o out

# Etapa 2: Criar a imagem de runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out .

# Configurar a porta que o contêiner expõe
EXPOSE 80

# Definir o comando para rodar a aplicação
ENTRYPOINT ["dotnet", "server.dll"]

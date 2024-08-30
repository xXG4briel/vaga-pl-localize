# Utilizar a imagem base do .NET SDK para compilar a aplicação
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de csproj e restaura as dependências
COPY *.csproj ./
RUN dotnet restore

# Copia todos os arquivos da aplicação e compila
COPY . ./
RUN dotnet publish -c Release -o out

# Utiliza a imagem base do ASP.NET Core para executar a aplicação
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out .

# Define a porta na qual a aplicação irá rodar
EXPOSE 80

# Comando para iniciar a aplicação
ENTRYPOINT ["dotnet", "server.dll"]

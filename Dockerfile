# Utilizar a imagem base do .NET SDK para compilar a aplica��o
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Define o diret�rio de trabalho
WORKDIR /app

# Copia os arquivos de csproj e restaura as depend�ncias
COPY *.csproj ./
RUN dotnet restore

# Copia todos os arquivos da aplica��o e compila
COPY . ./
RUN dotnet publish -c Release -o out

# Utiliza a imagem base do ASP.NET Core para executar a aplica��o
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out .

# Define a porta na qual a aplica��o ir� rodar
EXPOSE 80

# Comando para iniciar a aplica��o
ENTRYPOINT ["dotnet", "server.dll"]

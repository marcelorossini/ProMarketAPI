FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

# copy and publish app and libraries
COPY . /source/aspnetapp
WORKDIR /source/aspnetapp
RUN dotnet restore
RUN dotnet publish -c release -o /app --no-restore

# final stage/image
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
WORKDIR /app
COPY --from=build /app .

ENTRYPOINT ["dotnet", "ProMarketAPI.dll"]
# ProMarket
**Backend:** C#(Asp.NET CORE) + SQLite

**Frontend:** React(NextJS) + StyledComponents

  

## Demo hospedado na AWS
**API:** http://marcelo-promarket.duckdns.org:5000

**APP:** http://marcelo-promarket.duckdns.org

## Rotas API
```
 http://*:5000 |----------------------
               |--/company    (GET)
               |--/company/1  (GET)
               |--/company    (POST)
               |--/company/1  (PUT)
               |--/company/1  (DELETE) 
               |----------------------
               |--/contact    (GET)
               |--/contact/1  (GET)
               |--/contact    (POST)
               |--/contact/1  (PUT)
               |--/contact/1  (DELETE)
               |----------------------
               |--/activity   (GET)
               |--/activity/1 (GET)
               |--/activity   (POST)
               |--/activity/1 (PUT)
               |--/activity/1 (DELETE)
               |----------------------
 
```
As rotas aceitam pesquisa no método GetAll(), informe o nome do campo e o valor desejado via queryString, exemplo:
```
http://*:5000/company?state=SP&city=Bauru
```

## Características
- API REST
- Banco de dados SQLite
- Frontend responsivo para controle da API, com CRUDs para o Empresa, Contatos, Atividades e tela principal de pesquisa
- Container Docker para o frontend e backend
- Deploy AWS

## Execução via Docker + DockerCompose
Clonar o repositório:
```
git clone https://github.com/marcelorossini/ProMarketTeste.git
```
Executar o comando na pasta raiz do projeto:
```
sudo docker-compose up
```
Por padrão, a API roda na porta 5000 e o APP na porta 80.

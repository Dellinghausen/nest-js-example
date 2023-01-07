## Description

<b> The Example project to middleware. </b>

## Requirements

- Install [node](https://nodejs.org/en/download/) <b> version 14 </b>
- Install [yarn](https://classic.yarnpkg.com/en/docs/install/#debian-stable)
- Install [docker](https://docs.docker.com/install/)
- Install [docker-compose](https://docs.docker.com/compose/install/)

### Prepare your development environment

Create a copy .env file from .env.example and populate the variables.

Build and install the dependencies:

## Installation

```bash

# Navigate to the root of the project and run on a terminal

$ yarn # installs project dependencies

$ make up # up the docker image from the database

$ make run-migration # installs pending database migrations, it is only necessary the first time
```

## Running the app

```bash
#above all

$ make up

# development
$ yarn start # execute the start script in package.json, start the project

# watch mode
$ yarn start:dev # execute the project in watch mode

# production mode
$ yarn start:prod  # executes the project for production
```

## Design considerations

### General

1. O projeto é composto por três pastas domain, infra e shared. Em domain, temos a pasta auth e controllers.
   A pasta auth é responsável pela autenticação própria desse
   middleware. A priori, todas as rotas são autenticadas,exceto a de login.
2. Os controllers são responsáveis por definir as rotas que são expostas e todos
   os tratamentos dos dados de entrada, delegando, contudo, as chamadas a um provedor
   externo através dos services.

### Dtos

3. Os dtos atuam junto com as libs class-transformer e class-validator, para garantir que somente as propriedades
   definidas no dto sejam populadas. A anotação @Expose ajuda nisso.
4. Em shared temos dois tipos de dtos, request e response.
5. Os request dtos mapeiam que dados são esperados pelo controlador e mapeiam o nome da propriedade respectiva
   no service, ex:

`@Expose({ name: 'customerIdentifier' }) strCpfCnpj: string;`

o serviço espera uma propriedade chamada customerIdentifier que é mapeada para strCpfCnpj, o nome da propriedade
esperada pelo provedor externo.

6. Os responses dtos mapeiam que dados são retornados pelo provedor externo e mapeiam o nome da propriedade respectiva para a resposta da requisição

` @Expose({ name: 'strNumeroConta' }) cardAccount: string;`

O serviço externo retorna strNumeroConta na sua resposta e essa propriedade é exposta com o nome cardAccount na api

### services

7. Os serviços são responsáveis por conectar ao provedor externo, fornecendo os dados recebidos na requisição

endpoint e method são a url e método http correspondente no provedor externo

8. Todos os serviços do provedor externo, recebem o Service genérico via injeção de dependências

Esse serviço genérico encapsula os detalhes gerais das chamadas ao provedor externo, configurado para usar com a lib
[axios](https://github.com/axios/axios)

O serviço acima usa o interceptor do axios nas chamadas ao provedor externo, e obtém/injeta o token de autorização Bearer
antes de chamar o serviço correspondente do provedor externo.

9. Todos os serviços usam o método getData, antes de serializarem suas respostas

Esse método apenas garante que somente as propriedades definias no dto, sejam realmente serializadas
o método plainToClass da lib class-transform, transforma um objeto javascript puro em um objeto dto da classe
definida em dataType.
a opção excludeExtraneousValues garante que nenhuma propriedade adicional seja incluida na resposta

### main.ts

```
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  await app.listen(3020);
}
```

o ValidationPipe do nestjs,garante a validação em nível global. As opção whitelist: true, garante que
nenhuma propriedade que não tenha uma anotação de validação, seja validada e forbidNonWhitelisted: true,
que nenhuma propriedade adicional além das definidas pelo dto seja aceita. O app retorna com erro de validação
se receber propriedades adicionais

### Compodoc (Optional)

```bash
  # install
  yarn add -D @compodoc/compodoc

  # generate
  npx @compodoc/compodoc -p tsconfig.json -s

```

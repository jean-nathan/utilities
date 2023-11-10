## Instale as extensoes no VSCode:

Prettier: Formatador de código personalizavel
ESlint: Identificador de erros de formatacao de código para seguir um padrao.

O Prettier vai agir de acordo com as regras do ESlint que voce definiu.

Após instalar os plugins, acesse configuracoes e busque por on save e habilite Editor: Format On Save para toda vez que salvar o código ser formatado.

-----------------------------------------------------------------------------------------------------------------------------------------------------------------
## Como dar start no projeto com yarn:

rode o comando: yarn init --y

Obs: Ao executar será criado o arquivo package.json

-----------------------------------------------------------------------------------------------------------------------------------------------------------------
## Configurando o .editorconfig:

É um arquivo que fica na raiz onde voce diz para o VSCode que os padroes de configuracoes de arquivos sao aqueles. 

Digamos que voce esteja codando parte no Linux e parte no Windows, ou codando com outro Dev, entao por exemplo o encerrar da linha, ele é diferente pra 
cada sistema op, mas os sistemas suportam uns dos outros, entao voce seta isso no editor config e fica padrao. 

Voce pode instalar a extensao (plugin) EditorConfig para gerar um arquivo e modifica-lo ao seu favor.

## Modelo para uso:

[*]
indent_style = space
indent_size = 2 ## quant de tabs
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = false
insert_final_newline = false

-----------------------------------------------------------------------------------------------------------------------------------------------------------------
## Configurando o TypeScript:

Com typescript voce vai conseguir utilizar classes, parthers, solid, entre outros..
Ou seja, ele vai te dar diversas funcionalidades e inclusive tipagem.

Rode o comando para incluir o Typescript no projeto: yarn add -D typescript

Codamos em Typescript e no build ele converte para Javascript

Após executado o comando para instalacao, devemos configura-lo:

execute o comando: yarn tsc --init

Vai gerar o arquivo tsconfig.json e voce pode apagar trechos comentados e deverá deixar configurado da seguinte forma:

## Modelo para uso:

{
  "compilerOptions": {
    "target": "es2017",
    "module": "commonjs",
    "allowJs": true /* Permite instalar extensoes que nao tenha typescript */,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist" /* Pasta utilizada para quando buildar os arquivos finais serao salvos */
  }
}

-----------------------------------------------------------------------------------------------------------------------------------------------------------------
Configurando o ESLint:

Ele é uma ferramenta que vai caçar a despadronizacao do codigo e avisar.

execute o comando: yarn add -D eslint

Após executado, deverá executar o comando: yarn eslint --init para configurar o ESlint.

? How would you like to use ESLint? … 
To check syntax, find problems, and enforce code style

? What type of modules does your project use? … 
JavaScript modules (import/export)

? Which framework does your project use? … 
 None of these

? Does your project use TypeScript? 
No / Yes

Where does your code run?
Node

How would you like to define a style for your project?
Use a popular style guide

Which style guide do you want to follow? …
Standard: https://github.com/standard/eslint-config-standard-with-typescript

 What format do you want your config file to be in? 
JSON

Would you like to install them now? ›
YES

Which package manager do you want to use? … 
Yarn 

Gerou alguns arquivos .lock, sem esse arquivo outro desenvolvedor consegue instalar outras versões das libs que estão no seu projeto, entao ele bloqueia.

## Modelo para uso:

{
  "env": {
    "es2021": true,
    "node": true
  },
  "extends": ["standard", "prettier"],
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint", "prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}

-----------------------------------------------------------------------------------------------------------------------------------------------------------------
## Criando e configurando o arquivo .gitignore

O `.gitignore` impede que o Git rastreie e inclua determinados arquivos e pastas em seu repositório, ajudando a manter seu projeto limpo e evitando a inclusão
de arquivos desnecessários.

## Modelo para uso:

node_modules/
.env
dist
.DS_Store

-----------------------------------------------------------------------------------------------------------------------------------------------------------------
## Criando um Servidor Express:

Obs: Crie uma pasta e um arquivo assim: src/server.ts

O comando "yarn add express" é usado para instalar o framework Express no seu projeto Node.js, tornando mais fácil criar aplicativos web.
Executar este comando instalará o pacote "express" e suas dependências no seu projeto, permitindo que você comece a criar servidores web e rotas facilmente. 

yarn add express

No Visual Studio Code (VSCode), o comando "yarn add -D @types/express" é útil quando você está desenvolvendo um projeto Node.js com TypeScript. Ele é necessário para fornecer ao VSCode e ao TypeScript as definições de tipo (type definitions) do Express, permitindo que o editor e o compilador verifiquem o código com maior precisão e ofereçam recursos de auto-completar e sugestões de código relacionadas ao Express. Isso melhora a produtividade e ajuda a evitar erros de tipo durante o desenvolvimento. Portanto, é uma etapa importante para projetos que usam TypeScript no VSCode e dependem do framework Express.

yarn add -D @types/express

Obs: Após isso começamos a escrever o código dentro do arquivo server.ts

import express from "express"; // Os ... pontos significa que nao foi instalado os tipos, com uso do typescript e necessário. De um (yarn add -D @types/express).

const app = express();

app.listen(3000, () => {
  console.log("App Hello API running at 3000!");
});

-----------------------------------------------------------------------------------------------------------------------------------------------------------------
## Configurando os scripts para desenvolvimento:

Acesse o arquivo package.json e coloque:

"scripts": {
	"dev": "ts-node-dev ./src/server.ts"
}

Execute o comando "yarn add -D ts-node-dev" serve para adicionar a ferramenta "ts-node-dev" como uma dependência de desenvolvimento que reinicia automaticamente 
o servidor durante o desenvolvimento de projetos Node.js com TypeScript. Isso agiliza a detecção de alterações no código e recarrega o aplicativo, 
tornando o desenvolvimento mais eficiente.

yarn add -D ts-node-dev

Obs: Após isso voce pode executar o comando: yarn dev para iniciar o servidor.

-----------------------------------------------------------------------------------------------------------------------------------------------------------------
## Configurando o dotenv:

Obs: Criamos um arquivo .env.local onde ficará salvo as variaveis de ambiente no qual por enquanto criaremos somente a variavel abaixo:

DATABASE_STORAGE_PATH=''

Obs: Depois duplicaremos o arquivo .env.local e mudaremos o nome para .env

Depois avisaremos o projeto que ele deve usar o .env:

Execute o comando: yarn add -D dotenv

Logo após disso será necessário configurar mais algumas coisas no package.json em scripts/dev mude para: ts-node-dev -r dotenv/config ./src/server.ts

Você pode usar uma variável de ambiente como PROJECT_NAME definida em um arquivo .env. Se você precisar alterar o nome do projeto, basta atualizar o valor 
dessa variável no arquivo .env, sem precisar modificar o código-fonte. Isso torna a manutenção do projeto mais simples e evita a propagação de erros 
de digitação do nome do projeto em várias partes do código. Além disso, a segurança dos dados sensíveis pode ser mantida com a mesma abordagem.

-----------------------------------------------------------------------------------------------------------------------------------------------------------------
## Configurando o build e start em produçao:

No arquivo package.json em scripts adicione "build": "tsc"

Depois execute o comando: yarn build

Obs: Em uma maquina Node voce precisará buildar seu projeto para transferir seu código para JavaScript pegando a pasta dist e rodar na maquina rodando com node.

Acesse o arquivo package.json e inclua o comando dotenv: "start": "node -r dotenv/config ./dist/server.js"

Importante: Utilize sempre variaveis de ambiente do Servidor.

-----------------------------------------------------------------------------------------------------------------------------------------------------------------

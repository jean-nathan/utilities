Prisma (ORM) 

O QUE É UM ORM?

Um ORM é como um tradutor que ajuda o computador a entender e falar com um banco de dados. 

Ele faz com que as informações no código (como objetos) possam ser armazenadas e recuperadas de um jeito que o banco de dados entenda, sem a gente ter que lidar diretamente com o "idioma" do banco de dados.

————————————————————————————————————————————————————————
PRINCIPAIS BENEFÍCIOS DE USAR O PRISMA:

* Produtividade Elevada: Facilita interações com o banco de dados, permitindo mais foco na lógica da aplicação. 
* Type Safety: Previne erros relacionados a tipos, especialmente em TypeScript.

* Consulta Intuitiva: Oferece uma sintaxe clara e expressiva para consultas a bancos de dados.

* Geração Automática de Código: Cria automaticamente modelos de dados com base no esquema do banco.

* Multi-Banco de Dados: Suporta diferentes sistemas de banco de dados, como PostgreSQL, MySQL e SQLite.

* Migrações Simplificadas: Facilita a evolução do esquema do banco de dados por meio de migrações automáticas.

* Mapeamento de banco já existente: O Prisma pode automaticamente criar modelos de dados a partir de um banco de dados existente, facilitando a transição para o uso do Prisma em bancos já em operação.

Site do Prisma: https://www.prisma.io/ 
————————————————————————————————————————————————————————
REQUISITOS PARA CRIAR UM BANCO COM PRISMA:

Você ja precisa ter uma aplicação em Node com Express configurada rodando.
 Passo a passo para criar uma aplicação Node com Express:  https://github.com/jean-nathan/utilities/blob/main/Node/configurando-node-com-typescript-express.js
 Instale os plugins no VSCode: Prisma e o Prisma Insider
————————————————————————————————————————————————————————
ADICIONANDO O PRISMA NA APLICAÇÃO NODE:

Execute o comando: yarn add prisma -D 
 O que faz esse comando?  O comando `yarn add prisma -D` adiciona o Prisma como uma dependência de desenvolvimento ao projeto usando o gerenciador de pacotes Yarn. Isso é comum ao configurar o Prisma para tarefas de desenvolvimento, como migrações de banco de dados.

————————————————————————————————————————————————————————
CONFIGURANDO O ARQUIVO (tsconfig): 

{
  "compilerOptions": {
    "sourceMap": true, /* Habilita Dev Tools */
    "outDir": "dist",
    "strict": true, /* Aumenta rigor nas verificações do TypeScript para melhor qualidade e segurança do código */
    "lib": ["esnext"], /* Permite acesso a funcionalidades mais recentes do ECMAScript */
    "esModuleInterop": true /* Facilita a mistura de sistemas de módulos ES6 e CommonJS */
  }
}

Pra que serve o arquivo tsconfig?  O arquivo `tsconfig.json` configura como o TypeScript é compilado para JavaScript em um projeto, controlando opções como diretório de saída, uso de mapas de origem e suporte a funcionalidades ECMAScript.

————————————————————————————————————————————————————————
INICIALIZANDO O PRISMA PARA CRIAÇÃO DA ESTRUTURA DO BANCO:

Execute o comando: yarn prisma init   Após a execução desse comando, uma pasta chamada "prisma" será criada no diretório da sua aplicação, contendo um arquivo chamado "schema.prisma". Esse arquivo é essencial para definir o modelo de dados e a configuração do banco de dados ao utilizar o Prisma.

————————————————————————————————————————————————————————
CONFIGURANDO O ARQUIVO (schema.prisma):

generator client {
  provider = "prisma-client-js" // Provedor do Prisma Client usado.
}

datasource db {
  provider = "sqlite" // Tipo de banco de dados utilizado (SQLite neste caso).
  url      = env("DATABASE_STORAGE_PATH") // Caminho para o arquivo do banco de dados SQLite ou local para criar um novo banco, se não existir.
}

model Product {
  id         String   @id @default(uuid()) // Chave primária gerada automaticamente.
  name       String
  bar_code   String   @unique // Valor único em todos os registros.
  price      Decimal
  created_at DateTime @default(now()) // Valor automático da data e hora de criação.

  @@map("products") // Nome personalizado da tabela no banco de dados.
}
 O que é um model?  Um modelo (model) em um contexto de desenvolvimento de software, especialmente em bancos de dados, serve para representar uma entidade específica ou um conceito do mundo real. Em termos mais simples, um modelo é uma estrutura que define como os dados relacionados a um determinado tipo de objeto ou entidade são armazenados e manipulados em um banco de dados.

Após configurado, execute o comando: yarn prisma migrate dev 
Coloque um nome da migrate,  exemplo: create_products  Depois disso, provavelmente será adicionado um dependência chamada @prisma/client automaticamente.

————————————————————————————————————————————————————————
CONFIGURANDO OS ARQUIVOS (.env.local e .env):  Crie um arquivo chamado .env.local desta forma com a variável de ambiente vazia: DATABASE_STORAGE_PATH='' 
Após isso, duplique o arquivo e mude para o nome dele para .env e inclua o valor dentro da variável: DATABASE_STORAGE_PATH="file:./database.sqlite"

Importante: O arquivo .env.local nao deve conter nenhum valor nas variáveis de ambiente pois  os mesmos será importado no repositório git.

————————————————————————————————————————————————————————
CONFIGURANDO ARQUIVO (prismaClient.ts):  // Crie a pasta database/  e depois crie o arquivo prismaClient.ts
// Este arquivo contém a configuração centralizada com o banco de dados usando Prisma Client.

import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient(); // Instância do Prisma Client

export { prismaClient }; // Exporta a instância para uso em outras partes do código.
// prismaClient.ts cria e exporta uma instância do Prisma Client para acessar o SQLite em outras partes do aplicativo Express.
 O que o prismaClient? 
// O Prisma Client, em uma aplicação com SQLite, é como um assistente que simplifica a comunicação com o banco de dados. 
// Ele ajuda a realizar tarefas comuns, como salvar ou buscar informações, de maneira fácil e organizada. Em vez de lidar diretamente com o SQLite, você usa o Prisma Client para tornar essas interações mais simples e menos complicadas, permitindo que você se concentre mais na construção da lógica da sua aplicação.
// É como ter um amigo que cuida das conversas com o banco de dados para que você possa se concentrar em outras partes importantes do seu código.

————————————————————————————————————————————————————————
CONFIGURANDO CONTROLLERS (CreateProductController.ts):

Em src/ crie a pasta controllers / dentro dela crie o arquivo CreateProductController.ts 

import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class CreateProductController {
  async handle(request: Request, response: Response) {
    // Extrai informações do corpo do pedido (o que o cliente enviou).
    const { name, bar_code, price } = request.body;

    // Usa o Prisma Client para criar um novo registro de produto no banco de dados SQLite.
    // Estamos passando os detalhes do novo produto (nome, código de barras e preço) como dados para o Prisma Client.

    const product = await prismaClient.product.create({
      data: {
        bar_code,
        name,
        price,
      },
    });
    // Prepara uma resposta para o cliente (geralmente contendo os detalhes do novo produto criado).
    return response.json();
  }
}

O que é uma controller:

Uma controller, no contexto de desenvolvimento de software, é uma parte do padrão de arquitetura de software conhecido como MVC (Model-View-Controller). O MVC é um paradigma de design que separa uma aplicação em três componentes principais:

1. **Model (Modelo):** Representa a estrutura de dados e a lógica de negócios da aplicação.
2. **View (Visão):** Lida com a apresentação e exibição da informação para o usuário.
3. **Controller (Controlador):** Gerencia as interações do usuário e atua como intermediário entre o Modelo e a Visão.

A controller, portanto, é responsável por receber as entradas do usuário, processá-las (geralmente interagindo com o Modelo) e atualizar a Visão correspondente. Ela desempenha um papel crucial na coordenação do fluxo de dados entre o Modelo e a Visão, garantindo que as ações do usuário sejam refletidas de maneira apropriada nos dados e na interface do usuário.

Em resumo, a controller é um componente que manipula as solicitações do usuário, coordena a lógica de negócios e atualiza a interface do usuário, contribuindo para a separação de preocupações e a manutenção de um código mais organizado e modular.

————————————————————————————————————————————————————————
CONFIGURANDO A ROTA:

import { Router } from "express";
import { CreateProductController } from "./controllers/CreateProductController";

// Cria uma instância do Router do Express.
const router = Router();

// Cria uma instância do controlador responsável por lidar com a criação de produtos.
const createProduct = new CreateProductController();

// Define uma rota para lidar com requisições POST para "/product".
// Quando uma requisição POST é feita para "/product", o método "handle" do controlador
// CreateProductController será chamado para processar a requisição.
router.post("/product", createProduct.handle);

// Exporta o router para ser usado em outros lugares da aplicação.
export { router };

————————————————————————————————————————————————————————
MODELO DO ARQUIVO CONFIGURADO (package.json):

{
  "name": "backend_prisma",
  "version": "1.0.0",
  "description": "Back-end com Prisma utilizando Typescript e Sqlite",
  "main": "index.js",
  "author": "Nathan Dev",
  "license": "MIT",
  "scripts": {
    "dev": "ts-node-dev -r dotenv/config ./src/server.ts",
    "build": "tsc",
    "start": "node -r dotenv/config ./dist/server.js"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@typescript-eslint/eslint-plugin": "^6.4.0",
    "dotenv": "^16.3.1",
    "eslint": "^8.0.1",
    "eslint-config-standard-with-typescript": "^39.1.1",
    "eslint-plugin-import": "^2.25.2",
    "eslint-plugin-n": "^15.0.0 || ^16.0.0 ",
    "eslint-plugin-promise": "^6.0.0",
    "prisma": "^5.5.2",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.2.2"
  },
  "dependencies": {
    "@prisma/client": "5.5.2",
    "express": "^4.18.2"
  }
}
 Observações sobre o scripts:   ts-node-dev: é uma ferramenta que ajuda a desenvolver aplicativos Node.js com TypeScript, recarregando automaticamente o aplicativo quando ocorrem alterações nos arquivos.  -r dotenv/config: Este é um argumento específico do ts-node-dev. Ele está dizendo para o ts-node-dev registrar o pacote dotenv antes de executar o arquivo TypeScript. O dotenv é geralmente usado para carregar variáveis de ambiente a partir de um arquivo .env.

./src/server.ts: Este é o caminho para o arquivo TypeScript principal que será executado. No seu caso, está apontando para ./src/server.ts. Este é o ponto de entrada da sua aplicação.

Portanto, quando você executa npm run dev, o ts-node-dev será acionado, carregará o pacote dotenv, e iniciará a execução do arquivo TypeScript ./src/server.ts. Esse script é especialmente útil durante o desenvolvimento, pois permite que você faça alterações no código e veja as atualizações refletidas automaticamente sem reiniciar manualmente o servidor.

————————————————————————————————————————————————————————
CADASTRANDO UM PRODUTO COM PLUGIN (Rest Client): 

Utilize o plugin do Rest Client para realizar requisições e cadastrar um produto da seguinte forma:  Crie um arquivo chamado api.http na raiz do seu projeto que deve conter o script abaixo:  ### Create
POST http://localhost:3000/product
Content-Type: application/json

{
  "bar_code": "00022",
  "name": "Livro",
  "price": 10.99
}  Importante: Mas oriento utilizar o (Insomnia ou Postman) pois algumas requisições apresentaram o erro 401.

————————————————————————————————————————————————————————
UTILIZANDO O PRISMA STUDIO PARA VISUALIZAR O BANCO DE DADOS NO NAVEGADOR:

Execute o comando: yarn prisma studio
 Importante: Sempre que for adicionada uma nova tabela, deverá reiniciar o serviço do Prisma Studio para refletir as atualizações.  
————————————————————————————————————————————————————————
CRIANDO UMA TABELA DE RELACIONAMENTO NO PRISMA:

Crie um arquivo dentro da pasta controllers chamado por exemplo: ProductCategoryController.ts e dentro deste arquivo deve conter:  import { prismaClient } from "../database/prismaClient";
import { Request, Response } from "express";

export class ProductCategoryController {
  async handle(request: Request, response: Response) {
    const { id_product, id_category } = request.body;

    const productCategory = await prismaClient.productCategory.create({
      data: {
        id_product,
        id_category,
      },
    });

    return response.json(productCategory);
  }
}  O id será gerado automaticamente.

Observação: Após isso, configure o router para fazer o post no endpoint productCategory e criar o relacionamento, segue abaixo um modelo do router, lembre-se que forneci todo o script do arquivo, leia com atenção.   import { Router } from "express";
import {
  CreateProductController,
  GetProductsController,
  ProductModel,
} from "./controllers/CreateProductController";
import { CreateCategoryController } from "./controllers/CreateCategoryController";
import { ProductCategoryController } from "./controllers/ProductCategoryController";

const router = Router();

const createProduct = new CreateProductController();
const createCategory = new CreateCategoryController();
const getProductsController = new GetProductsController();
const getOneProduct = new ProductModel();
const createProductCategory = new ProductCategoryController();

router.post("/product", createProduct.handle);
router.post("/category", createCategory.handle);
router.get("/products", getProductsController.findAll);
router.get("/product/:id", getOneProduct.findOne);
router.post("/productCategory", createProductCategory.handle);

export { router };

————————————————————————————————————————————————————————
CRIANDO UM PRODUTO COM CATEGORIA EXISTENTE JÁ ATRELADA:

Crie um arquivo chamado na pasta controllers chamado CreateProductWithExistCategory.ts Após isso, cole o script abaixo:  import { prismaClient } from "../database/prismaClient";
import { Request, Response } from "express";

export class CreateProductWithExistCategory {
  async handle(request: Request, response: Response) {
    const { name, price, bar_code, id_category } = request.body;

    const product = await prismaClient.productCategory.create({
      data: {
        product: {
          create: {
            bar_code,
            name,
            price,
          },
        },
        category: {
          connect: {
            id: id_category,
          },
        },
      },
    });
    return response.json(product);
  }
}

Aqui explico pra você o que cada trecho faz:

Neste trecho, o Prisma está sendo usado para criar uma entrada na tabela productCategory, que provavelmente é uma tabela de associação entre produtos e categorias. Vamos dividir isso em partes:
* product:
    * Aqui, product é um objeto que representa os dados do produto que você está tentando criar.
    * create é usado para indicar ao Prisma que você deseja criar um novo registro na tabela relacionada (product).
    * As propriedades do produto, como bar_code, name e price, são fornecidas no objeto create.
* category:
    * category é outro objeto que representa a categoria à qual você deseja associar o produto.
    * connect é usado para indicar ao Prisma que você deseja conectar o produto a uma categoria existente.
    * No exemplo, a propriedade id de connect está sendo usada para fornecer o ID da categoria à qual o produto deve ser associado. Este ID é extraído da requisição (id_category).
* prismaClient.productCategory.create:
    * Este é o método do Prisma usado para criar um novo registro na tabela productCategory.
    * O objeto passado para create contém os dados do produto a ser criado (product.create) e a categoria à qual deve estar associado (category.connect).
Portanto, o código está efetivamente criando um novo produto e associando-o a uma categoria existente usando a tabela de associação productCategory. O connect é usado para estabelecer a relação entre o produto recém-criado e uma categoria existente no banco de dados.

Após isso, acesse router e configure o endpoint para fazer a requisição: 
import { Router } from "express";
import {
  CreateProductController,
  GetProductsController,
  ProductModel,
} from "./controllers/CreateProductController";
import { CreateCategoryController } from "./controllers/CreateCategoryController";
import { ProductCategoryController } from "./controllers/ProductCategoryController";
import { CreateProductWithExistCategory } from "./controllers/CreateProductWithExistCategory";  // <-- Esse daqui

const router = Router();

const createProduct = new CreateProductController();
const createCategory = new CreateCategoryController();
const getProductsController = new GetProductsController();
const getOneProduct = new ProductModel();
const createProductCategory = new ProductCategoryController();
const createProductWithExistCategory = new CreateProductWithExistCategory();  // <-- Esse daqui

router.post("/product", createProduct.handle);
router.post("/category", createCategory.handle);
router.get("/products", getProductsController.findAll);
router.get("/product/:id", getOneProduct.findOne);
router.post("/productCategory", createProductCategory.handle);
router.post("/productWithCategory", createProductWithExistCategory.handle); // <-- Esse daqui

export { router };
 Após isso, acesso o Insomnia e coloque o post e coloque a URL: http://localhost:8080/productWithCategory  O body ficará desta forma será desta forma: Lembre-se de executar como JSON.  {
  "bar_code": "00012",
  "name": "iPhone 15",
  "price": 7.000,
	"id_category": "61f1f164-2f80-4925-bd30-ea54f1b88147"
} 
￼
 ————————————————————————————————————————————————————————
GET DE PRODUTO COM CATEGORIA ASSOCIADA:

Crie um arquivo FindProductController.ts com seguinte código:  import { prismaClient } from "../database/prismaClient";
import { Request, Response } from "express";

export class FindProductController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const product = await prismaClient.product.findFirst({
      where: {
        id,
      },
      include: { // <- USAMOS ELE PARA PUXAR A CATEGORIA ASSOCIADA
        ProductCategory: true,
      },
    });
    return response.json(product);
  }
}

CONFIGURE NO ARQUIVO ROUTER.TS DA SEGUINTE FORMA:

import { FindProductController } from "./controllers/FindProductController";


const findProduct = new FindProductController(); // <-- AQUI
router.get("/product/:id", findProduct.handle); // <-- AQUI
 NO INSOMNIA CRIE DESTA FORMA:

GET: http://localhost:8080/product/ID DO PRODUTO AQUI

￼

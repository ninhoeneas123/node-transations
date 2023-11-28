Este é um pŕojeto pessoal para estudo e pratica.

 O projeto consiste em uma aplicação Node.js que simula algumas transações bancárias, como depósito, transferência entre contas e geração de extrato com o histórico das operações. Além disso, inclui um módulo de usuário responsável pela criação dos usuários. O banco de dados, configurado com o Prisma, é o PostgreSQL.

Para executar o banco de dados, é necessário ter o Docker Compose instalado. Após a instalação, execute o comando:

```bash
docker-compose up 
```
O próximo passo é iniciar o servidor com o comando:

```bash
npm start
```
Após iniciar o servidor você poderá acessar a documentação do projeto no SWAGGER pela URL: 

 ``` http://localhost:3001/api-docs/```

Nesta URL, estão listados todos os endpoints disponíveis na aplicação, incluindo detalhes sobre os parâmetros e os possíveis erros que podem ocorrer.

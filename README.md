# Executando o projeto

```
# Clone o repositório:
git clone https://github.com/LucianTavares/micro-videos-admin-full-cycle.git

# Acesse a pasta do projeto:
cd projeto-pratico-FC-admin-catalogo-videos

# Abra o projeto com a extensão DevContainer

ou

# Rode o arquivo docker-compose.yaml:
docker compose up

# Entre no container Node:
docker compose exec app bash

# execute os testes:
npm run test -- --watch
```

#### Testes

Utilizado a opção: [coverageThreshold](https://jestjs.io/pt-BR/docs/configuration#coveragethreshold-object), assim caso a cobertura geral global for menor do que 80% os testes irão falhar.

---

Utilizado a opção: [noEmit](https://www.typescriptlang.org/pt/tsconfig#noEmit), realizando a verificação de erros TypeScript, não emitindo arquivos de saída.
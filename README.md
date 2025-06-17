# Teste Prático: Controle de Investimentos (frontend)

## Tecnologias utilizadas

---

- React (18+)
- TypeScript
- Vite
- Tailwind CSS
- Axios

---

## Como rodar o projeto do zero

---

### Necessário
- Node.js e npm instalados


### 1. Clonar o repositório

```bash
git clone https://github.com/AugustoZanoli/frontend-teste-pratico.git
ren frontend-teste-pratico frontend
cd frontend
```

Caso esteja utilizando linux ou mac, substitua o comando ren por mv

```bash
mv frontend-teste-pratico frontend
```



### 2. Instalar as dependências

Execute o seguinte comando para instalar todas as dependências:

```bash
npm install
```

Ou

```bash
yarn install
```

### 3. Configurar a URL da API

Verifique se a URL da API está correta no seu código. Atualmente, o frontend está apontando para:

```ts
http://localhost:8000/backend/public/api/investimentos
```

### 4. Rodar o servidor de desenvolvimento

Execute:

```bash
npm run dev
```

Ou

```bash
yarn dev
```

A aplicação estará disponível em:

```bash
http://localhost:5173
```

---

## Funcionalidades implementadas
- Listagem de investimentos

- Cadastro de novos investimentos

- Remoção de investimentos

- Cálculo do total investido

- Feedback visual com Toast para ações de sucesso

- Validação de dados no cadastro

## Observações
- Certifique-se de que o backend está rodando corretamente na porta e endpoint configurados.

- O frontend consome diretamente a API, portanto, se houver alterações na rota ou porta do backend, atualize no frontend também.

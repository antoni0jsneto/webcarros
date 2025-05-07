# WebCarros 🚗

WebCarros é um projeto desenvolvido em **React** com **Vite**, utilizando diversas tecnologias modernas como Firebase, TailwindCSS e muito mais. A aplicação exibe carros para venda com detalhamento e integração com WhatsApp, além de um painel administrativo completo.

## ✨ Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Firebase (Auth + Storage)](https://firebase.google.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [React Hot Toast](https://react-hot-toast.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [SwiperJS](https://swiperjs.com/)
- [UUID](https://www.npmjs.com/package/uuid)
- [Context API](https://reactjs.org/docs/context.html)

## 📄 Funcionalidades

### 🏠 Página Inicial

- Lista de carros cadastrados
- Cada carro redireciona para a página de detalhes

### 📄 Página de Detalhes

- Informações completas do carro
- Botão de WhatsApp para contato direto com o vendedor

### 🔐 Painel Administrativo

- Autenticação via Firebase
- Inserção, edição e exclusão de carros
- Upload das fotos para o Firebase Storage
- Exclusão automática das fotos no Storage ao deletar um carro

### ⚙️ Gerenciamento de Estado

- Toda a lógica de exibição, inserção, edição e exclusão é gerenciada via Context API

## 🚀 Como rodar o projeto localmente

1. Clone o repositório:

```bash
git clone https://github.com/antoni0jsneto/webcarros.git
cd webcarros
```

2. Instale as dependências:

```bash
npm install
# ou
yarn
```

3. Configure o Firebase:

- Crie um projeto no [Firebase](https://console.firebase.google.com/)
- Habilite Auth (Email/senha) e Storage
- Adicione as credenciais no arquivo `.env` seguindo o modelo abaixo:

```
VITE_API_KEY=your_api_key
VITE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_project.appspot.com
VITE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_APP_ID=your_app_id
```

4. Rode a aplicação:

```bash
npm run dev
# ou
yarn dev
```

## 📁 Estrutura de Diretórios

```
webcarros/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── index.html
└── vite.config.js
```

## 📺 Demonstração

Você pode ver o projeto funcionando em:  
🔗 [https://primeflix-tau.vercel.app/](https://primeflix-tau.vercel.app/)

## 🧑‍💻 Autor

Feito com ❤️ por [Antônio Neto](https://github.com/antoni0jsneto)

---

Este projeto é open-source e está licenciado sob a licença MIT.

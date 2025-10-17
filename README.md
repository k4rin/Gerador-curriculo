# 🧰 CV-Builder

**CV-Builder** é uma aplicação web desenvolvida com **React**, **TypeScript** e **Vite**, que permite aos usuários criar e visualizar currículos de forma dinâmica e intuitiva.

## 🚀 Tecnologias Utilizadas

- **React** com suporte a HMR (Hot Module Replacement)
- **TypeScript** para tipagem estática
- **Vite** como bundler moderno e rápido
- **Tailwind CSS** para estilização
- **ESLint** com regras configuráveis para qualidade de código
- Plugins recomendados:
  - `@vitejs/plugin-react` (Babel)
  - `@vitejs/plugin-react-swc` (SWC)

## 📦 Estrutura do Projeto
```
CV-Builder/
├── src/
│ ├── App.tsx 
│ ├── Form.tsx
│ ├── ResumePreview.tsx
│ ├── ExportButtons.tsx
│ ├── api.ts
│ ├── types.ts 
│ └── styles/ 
│    ├── App.css 
│    ├── Form.css 
│    ├── Preview.css 
│    └── Buttons.module.css
├── public/ 
│ └── index.html
├── vite.config.ts 
├── tsconfig.json
├── package.json 
└── README.md
```


## 🛠️ Como Executar Localmente

1. Clone o repositório:
   
   `git clone https://github.com/k4rin/CV-Builder.git`
   
    `cd CV-Builder`

2. Instale as dependências:
   
    `npm install`

3. Inicie o servidor de desenvolvimento:

   `npm run dev`
  
    Acesse http://localhost:5173 no navegador.

## ✅ Funcionalidades
Preenchimento de dados pessoais e profissionais

Visualização em tempo real do currículo

Exportação do currículo em formato PDF.

Interface responsiva e amigável

## 📋 ESLint e Qualidade de Código
O projeto inclui configurações para ESLint com suporte a regras específicas para React e TypeScript. Recomenda-se utilizar os presets recommendedTypeChecked ou strictTypeChecked para produção.

## 📄 Licença
Este projeto está sob licença MIT. Sinta-se livre para usar e contribuir!



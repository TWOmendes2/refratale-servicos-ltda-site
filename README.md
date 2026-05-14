# Refratale Serviços LTDA — Site Institucional

Este repositório contém o site institucional da **Refratale Serviços LTDA**, empresa especializada em serviços de manutenção, montagem, inspeção e aplicação de refratários industriais.

O projeto foi desenvolvido como um site estático em **HTML, CSS e JavaScript**, com páginas institucionais, apresentação de serviços, área de clientes, blog técnico e formulário de contato preparado para integração com a Brevo.

---

## Sobre o projeto

O site tem como objetivo apresentar a Refratale de forma profissional para indústrias que precisam de soluções em refratários, principalmente no setor cimenteiro.

A experiência do usuário foi organizada para permitir que visitantes conheçam rapidamente:

- quem é a empresa;
- quais serviços são oferecidos;
- onde a empresa atua;
- quais clientes e regiões são atendidos;
- conteúdos técnicos sobre refratários;
- canais de contato e solicitação de orçamento.

---

## Principais páginas

### Página inicial

Apresenta a proposta principal da empresa, destacando a atuação em manutenção de refratários industriais, montagem, inspeção, consultoria e suporte técnico.

A página também conta com uma prévia sobre a empresa e chamadas para as áreas de serviços e contato.

### Serviços

Página dedicada às soluções oferecidas pela Refratale, incluindo:

- montagem refratária;
- demolição e remoção mecanizada;
- alinhamento a laser;
- inspeção e acompanhamento técnico;
- consultoria especializada;
- soldagem técnica;
- manipulação e aplicação técnica de concretos refratários.

### Clientes

Área voltada para a apresentação da abrangência nacional da empresa, clientes atendidos e atuação em diferentes estados.

A página possui mapa visual/interativo com pontos de atuação e carrossel de marcas/clientes.

### Blog

Seção com conteúdos técnicos e institucionais relacionados ao mercado de refratários, manutenção industrial, inspeção, desempenho de materiais e aplicações em fábricas de cimento.

Também inclui uma área para publicação do relatório de transparência e igualdade salarial.

### Sobre

Página institucional com informações sobre história, missão, visão, valores e especialização da empresa.

### Contato

Página com dados de contato, link para WhatsApp e formulário para envio de mensagem.

---

## Funcionalidades

O projeto possui:

- menu responsivo para dispositivos móveis;
- páginas estáticas organizadas por tema;
- formulário de contato;
- integração preparada para Brevo;
- carrossel visual de logos/clientes via CSS;
- mapa de atuação com pontos interativos;
- seção de blog técnico;
- estrutura de SEO básica com títulos, descrição e dados estruturados;
- imagens e assets organizados em pastas;
- layout responsivo para desktop, tablet e celular.

---

## Tecnologias utilizadas

- HTML5;
- CSS3;
- JavaScript;
- Google Fonts;
- Brevo API, preparada para captura de contatos;
- arquivos estáticos de imagem em PNG, JPG e WebP.

---

## Estrutura do projeto

```txt
/
├── assets/
│   ├── fotos/
│   ├── favicon-refratale.png
│   └── logo-refratale.png
├── docs/
│   └── RelatorioIgualdadeSalarialLote_2026_1_15471560000100.pdf
├── index.html
├── about.html
├── service.html
├── clientes.html
├── blog.html
├── blog-post-1.html
├── blog-post-2.html
├── blog-post-3.html
├── blog-post-4.html
├── blog-post-5.html
├── blog-post-6.html
├── portfolio.html
├── contact.html
├── styles.css
├── script.js
└── README.md
```

---

## Como o formulário funciona

O arquivo `script.js` contém a lógica dos formulários do site.

O fluxo previsto é:

1. o visitante preenche nome, e-mail e mensagem;
2. o JavaScript valida se o e-mail foi preenchido corretamente;
3. os dados são preparados em um payload;
4. o contato pode ser enviado para uma lista da Brevo;
5. a página exibe uma mensagem de sucesso ou erro para o usuário.

Neste repositório público, a chave da Brevo foi removida por segurança.

---

## Configuração da Brevo

No arquivo `script.js`, existem espaços reservados para configuração:

```js
const BREVO_API_KEY = ""; // Espaço reservado para a chave da Brevo
const BREVO_API_URL = "https://api.brevo.com/v3/contacts";
const BREVO_LIST_ID = null; // Espaço reservado para o ID da lista da Brevo
```

> Importante: não é recomendado publicar chaves de API diretamente no front-end. Para produção, o ideal é enviar o formulário para um backend ou função serverless e manter a chave da Brevo protegida em variável de ambiente.

---

## Como executar localmente

Como o projeto é estático, basta abrir o arquivo `index.html` no navegador.

Também é possível usar uma extensão como **Live Server** no VS Code para visualizar o site com recarregamento automático.

---

## Como publicar

Este projeto pode ser publicado em plataformas como:

- GitHub Pages;
- Netlify;
- Vercel;
- Cloudflare Pages;
- hospedagem tradicional com upload dos arquivos via FTP.

Para GitHub Pages, publique a partir da branch principal usando a pasta raiz do projeto.

---

## Observações de segurança

- A chave de API da Brevo foi removida do código.
- O formulário permanece preparado para integração, mas precisa de configuração segura antes de uso em produção.
- Links públicos de contato, WhatsApp, imagens, fontes e documentos foram mantidos porque fazem parte da navegação e apresentação do site.

---

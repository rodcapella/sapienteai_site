# Sapiente.AI

Website institucional da Sapiente.AI, desenvolvido com React, Vite e funções serverless da Vercel.

## Desenvolvimento

```bash
pnpm install
pnpm dev
```

Para validar a versão de produção:

```bash
pnpm build
```

## Formulário de contacto

O formulário envia mensagens através da função `api/contact.ts` e utiliza SMTP autenticado. Configure as seguintes variáveis protegidas na Vercel:

```text
SMTP_HOST=smtp-pt.securemail.pro
SMTP_PORT=465
SMTP_USER=contacto@sapienteai.com
SMTP_PASSWORD
CONTACT_EMAIL_TO=contacto@sapienteai.com
```

Não coloque palavras-passe reais em arquivos versionados. Consulte `.env.example` apenas como referência dos nomes esperados.

## Cloudflare Turnstile

Crie um widget Turnstile no painel da Cloudflare e autorize os domínios de produção. Configure:

```text
VITE_TURNSTILE_SITE_KEY
TURNSTILE_SECRET_KEY
TURNSTILE_EXPECTED_HOSTNAMES=sapienteai.com,www.sapienteai.com
```

O frontend envia a ação fixa `contact_form`. O backend aceita o token somente quando:

- a validação da Cloudflare retorna sucesso;
- a ação retornada é `contact_form`;
- o hostname retornado pertence à lista `TURNSTILE_EXPECTED_HOSTNAMES`.

O endpoint também aplica honeypot, validação e limites de tamanho no servidor, aceita apenas `POST` e limita cada IP a três tentativas em quinze minutos. O rate limit atual é mantido em memória e pode ser reiniciado ou distribuído entre instâncias serverless; para persistência global, deverá ser substituído futuramente por Redis ou serviço equivalente.

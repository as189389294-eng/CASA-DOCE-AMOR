# Casa Doce Amor — versão final

Esta versão tem:
- site público em `index.html`
- painel em `/admin.html`
- login por senha
- banco Cloudflare D1
- adicionar, editar e excluir produtos
- editar preço e estoque
- descrição, emoji e URL de foto
- WhatsApp e PIX configurados

## Publicação no Cloudflare

1. Crie um banco D1 chamado `casa-doce-amor-db`.
2. Execute o conteúdo de `schema.sql` nesse banco.
3. Copie o Database ID do D1 para `wrangler.toml`, substituindo `COLOQUE_O_DATABASE_ID_AQUI`.
4. Publique esta pasta como um projeto Cloudflare Pages que suporte Functions.
5. No projeto, crie as variáveis/segredos:
   - `ADMIN_PASSWORD` = uma senha forte escolhida pelo dono
   - `SESSION_SECRET` = uma sequência aleatória longa (opcional; se não existir, usa a senha)
6. Abra `https://SEU-PROJETO.pages.dev/admin.html` para administrar.
7. O site público fica em `https://SEU-PROJETO.pages.dev`.

## Importante
O PIX e o WhatsApp já estão no site. A senha NÃO está no código.

As fotos podem ser adicionadas pelo campo "URL da foto". Se depois vocês quiserem, dá para trocar isso por upload direto de imagens usando Cloudflare R2.

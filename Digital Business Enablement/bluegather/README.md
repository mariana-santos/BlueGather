# BlueGather API

Esta é a documentação da API BlueGather, uma ferramenta para o gerenciamento de eventos ambientais e a mobilização de comunidades em ações de preservação e conservação.

## Descrição

A BlueGather é uma plataforma concebida para facilitar a organização e coordenação de eventos com foco em questões ambientais. Projetada para ser acessível via aplicativo móvel, nossa API permite que os usuários criem, gerenciem e participem de atividades de limpeza de praias, resgate de animais e outras iniciativas de preservação do meio ambiente.

Com a BlueGather, as organizações e comunidades podem colaborar de forma eficaz para proteger nosso planeta, unindo-se em ações práticas e impactantes.

<details>
<summary><strong>Documentação das Classes</strong></summary>
<br>
<details>
<summary>Avaliacao</summary>
Representa uma avaliação feita por um usuário avaliador em relação a um evento.

**Atributos:**
- `id` (NUMBER(9)): Identificador único da avaliação.
- `id_evento` (NUMBER(9)): Identificador único do evento.
- `id_avaliador` (NUMBER(9)): Identificador único do usuário avaliador.
- `nota` (NUMBER(1)): Nota dada pelo avaliador ao evento.
</details>

<details>
<summary>Evento</summary>
Representa um evento organizado por usuários para ações sociais.

**Atributos:**
- `id` (NUMBER(9)): Identificador único do evento.
- `titulo` (VARCHAR2(255)): Título do evento.
- `latitude` (VARCHAR2(12)): Coordenada da localização do evento.
- `longitude` (VARCHAR2(12)): Coordenada da localização do evento.
- `data_inicio` (DATE): Data e hora do início do evento.
- `data_fim` (DATE): Data e hora previstas do fim do evento.
- `descricao` (VARCHAR2(255)): Descrição do evento.
- `urgencia` (NUMBER(1)): Urgência do evento (De 1 a 5).
- `id_organizador` (NUMBER(9)): Identificador único do usuário organizador.
- `id_tipo` (NUMBER(9)): Identificador único do tipo do evento.
- `id_status` (NUMBER(9)): Identificador único do status.
</details>

<details>
<summary>Imagem</summary>
Representa as imagens registradas por usuários durante os eventos de ações sociais.

**Atributos:**
- `id` (NUMBER(9)): Identificador único da imagem.
- `id_evento` (NUMBER(9)): Identificador único do evento.
- `id_momento` (NUMBER(9)): Identificador único do momento da imagem.
- `url_imagem` (VARCHAR2(255)): URL da imagem.
</details>

<details>
<summary>Momento</summary>
Representa os possíveis momentos (das imagens) passíveis de cadastro.

**Atributos:**
- `id` (NUMBER(9)): Identificador único do momento.
- `nome` (VARCHAR2(255)): Nome do momento.
</details>

<details>
<summary>Status</summary>
Representa os possíveis status (dos eventos) passíveis de cadastro.

**Atributos:**
- `id` (NUMBER(9)): Identificador único do status.
- `nome` (VARCHAR2(255)): Nome do status.
</details>

<details>
<summary>Tipo_Evento</summary>
Representa os possíveis tipos de evento passíveis de cadastro.

**Atributos:**
- `id` (NUMBER(9)): Identificador único do tipo de evento.
- `nome` (VARCHAR2(255)): Nome do tipo de evento.
</details>

<details>
<summary>Usuario</summary>
Representa um usuário do sistema.

**Atributos:**
- `id` (NUMBER(9)): Identificador único do usuário.
- `email_usuario` (VARCHAR2(255)): Endereço de e-mail do usuário.
- `senha_usuario` (VARCHAR2(255)): Senha do usuário.
- `nome_usuario` (VARCHAR2(255)): Nome da pessoa.
- `imagem_usuario` (VARCHAR2(255)): URL da imagem da pessoa.
- `cnpj_pj` (CHAR(18)): CNPJ da pessoa jurídica.
- `is_fornecedor` (NUMBER(1)): Indicador se a entidade é fornecedora (0 = não, 1 = sim).
</details>
</details>

<details>
<summary><strong>Documentação da API</strong></summary>
<br>

Aqui estão exemplos de como interagir com a API usando os métodos HTTP (GET, POST, PUT, DELETE):

Observação: Todos os Métodos estão protegidos pelo Spring Security e são necessários o envio do TOKEN com o prefixo Bearer através do Header da requisição.

Os únicos endpoints liberados são o de cadastrar usuário e efetuar login (o qual retorna o token necessário para acesso aos outros endpoints)

<details>
<summary>Usuario</summary>
</details>

</details>

<details>
<summary><strong>Códigos de Status das Requisições</strong></summary>
<br>
<strong>| Código | Descrição</strong>
<br>
| 200 | Requisição bem-sucedida
<br>
| 201 | Cadastrado com sucesso
<br>
| 204 | A requisição foi bem-sucedida, mas não há conteúdo para retornar.
<br>
| 400 | Os campos enviados são inválidos
<br>
| 404 | Página não encontrada
<br>
| 405 | Método não permitido
<br>
| 500 | Erro interno do servidor
<br>
</details>

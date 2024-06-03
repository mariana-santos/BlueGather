# BlueGather API

Esta é a documentação da API BlueGather, uma ferramenta para o gerenciamento de eventos ambientais e a mobilização de comunidades em ações de preservação e conservação.

## Descrição

A BlueGather é uma plataforma concebida para facilitar a organização e coordenação de eventos com foco em questões ambientais. Projetada para ser acessível via aplicativo móvel, nossa API permite que os usuários criem, gerenciem e participem de atividades de limpeza de praias, resgate de animais e outras iniciativas de preservação do meio ambiente.

Com a BlueGather, as organizações e comunidades podem colaborar de forma eficaz para proteger nosso planeta, unindo-se em ações práticas e impactantes.

## Documentação das Classes

#### Avaliacao
Representa uma avaliação feita por um usuário avaliador em relação a um evento.

**Atributos:**
- `id` (NUMBER(9)): Identificador único da avaliação.
- `id_evento` (NUMBER(9)): Identificador único do evento.
- `id_avaliador` (NUMBER(9)): Identificador único do usuário avaliador.
- `nota` (NUMBER(1)): Nota dada pelo avaliador ao evento.

---

#### Evento
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

---

#### Imagem
Representa as imagens registradas por usuários durante os eventos de ações sociais.

**Atributos:**
- `id` (NUMBER(9)): Identificador único da imagem.
- `id_evento` (NUMBER(9)): Identificador único do evento.
- `id_momento` (NUMBER(9)): Identificador único do momento da imagem.
- `url_imagem` (VARCHAR2(255)): URL da imagem.

---

#### Momento
Representa os possíveis momentos (das imagens) passíveis de cadastro.

**Atributos:**
- `id` (NUMBER(9)): Identificador único do momento.
- `nome` (VARCHAR2(255)): Nome do momento.

---

#### Status
Representa os possíveis status (dos eventos) passíveis de cadastro.

**Atributos:**
- `id` (NUMBER(9)): Identificador único do status.
- `nome` (VARCHAR2(255)): Nome do status.

---

#### Tipo_Evento
Representa os possíveis tipos de evento passíveis de cadastro.

**Atributos:**
- `id` (NUMBER(9)): Identificador único do tipo de evento.
- `nome` (VARCHAR2(255)): Nome do tipo de evento.

---

#### Usuario
Representa um usuário do sistema.

**Atributos:**
- `id` (NUMBER(9)): Identificador único do usuário.
- `email_usuario` (VARCHAR2(255)): Endereço de e-mail do usuário.
- `senha_usuario` (VARCHAR2(255)): Senha do usuário.
- `nome_usuario` (VARCHAR2(255)): Nome da pessoa.
- `imagem_usuario` (VARCHAR2(255)): URL da imagem da pessoa.
- `cnpj_pj` (CHAR(18)): CNPJ da pessoa jurídica.
- `is_fornecedor` (NUMBER(1)): Indicador se a entidade é fornecedora (0 = não, 1 = sim).

## Documentação da API

Aqui estão exemplos de como interagir com a API usando os métodos HTTP (GET, POST, PUT, DELETE):

Observação: Todos os Métodos estão protegidos pelo Spring Security e são necessários o envio do TOKEN com o prefixo Bearer através do Header da requisição.

Os únicos endpoints liberados são o de cadastrar usuário e efetuar login (o qual retorna o token necessário para acesso aos outros endpoints)

## /avaliacao</strong>

### Listar Todos:

- **Endpoint:** /avaliacao
- **Método:** GET
- **Exemplo de Body:** Não é necessário o envio de body para esta requisição.
- **Exemplo de Retorno:**
```json
{
	"totalPages": 1,
	"totalElements": 5,
	"first": true,
	"last": true,
	"size": 100,
	"content": [
		{
			"id": 5,
			"idEvento": 4,
			"idAvaliador": 4,
			"nota": 1
		},
		{
			"id": 4,
			"idEvento": 4,
			"idAvaliador": 5,
			"nota": 1
		},
		{
			"id": 3,
			"idEvento": 1,
			"idAvaliador": 4,
			"nota": 3
		},
		{
			"id": 2,
			"idEvento": 1,
			"idAvaliador": 3,
			"nota": 3
		},
		{
			"id": 1,
			"idEvento": 1,
			"idAvaliador": 2,
			"nota": 5
		}
	],
	"number": 0,
	"sort": {
		"empty": false,
		"sorted": true,
		"unsorted": false
	},
	"pageable": {
		"pageNumber": 0,
		"pageSize": 100,
		"sort": {
			"empty": false,
			"sorted": true,
			"unsorted": false
		},
		"offset": 0,
		"paged": true,
		"unpaged": false
	},
	"numberOfElements": 5,
	"empty": false
}
```

---

### Exibir por ID:

- **Endpoint:** /avaliacao/{id}
- **Método:** GET
- **Exemplo de Body:** Não é necessário o envio de body para esta requisição.
- **Exemplo de Retorno:**
```json
{
	"id": 1,
	"idEvento": 1,
	"idAvaliador": 2,
	"nota": 5
}
```

---

### Exibir por ID do Evento:

- **Endpoint:** /avaliacao/evento/{eventoId}
- **Método:** GET
- **Exemplo de Body:** Não é necessário o envio de body para esta requisição.
- **Exemplo de Retorno:**
```json
[
	{
		"id": 3,
		"idEvento": 1,
		"idAvaliador": 4,
		"nota": 3
	},
	{
		"id": 1,
		"idEvento": 1,
		"idAvaliador": 2,
		"nota": 5
	},
	{
		"id": 2,
		"idEvento": 1,
		"idAvaliador": 3,
		"nota": 3
	}
]
```

---

### Exibir Resumo por ID do Evento:

- **Endpoint:** /avaliacao/evento/resumo/{eventoId}
- **Método:** GET
- **Exemplo de Body:** Não é necessário o envio de body para esta requisição.
- **Exemplo de Retorno:**
```json
{
	"idEvento": 1,
	"qtdAvaliadores": 3,
	"mediaNota": 3.6666666666666665
}
```

---

### Exibir por ID do Avaliador:

- **Endpoint:** /avaliacao/avaliador{avaliadorId}
- **Método:** GET
- **Exemplo de Body:** Não é necessário o envio de body para esta requisição.
- **Exemplo de Retorno:**
```json
[
	{
		"id": 3,
		"idEvento": 1,
		"idAvaliador": 4,
		"nota": 3
	},
	{
		"id": 5,
		"idEvento": 4,
		"idAvaliador": 4,
		"nota": 1
	}
]
```

---

### Cadastrar:

- **Endpoint:** /avaliacao
- **Método:** POST
- **Exemplo de Body:**
```json
{
  "idEvento": 1,
	"idAvaliador": 2,
	"nota": 5
}
```
- **Exemplo de Retorno:**
```json
{
	"id": 6,
	"idEvento": 1,
	"idAvaliador": 2,
	"nota": 5
}
```

---

### Atualizar:

- **Endpoint:** /avaliacao/id
- **Método:** PUT
- **Exemplo de Body:**
```json
{
  "idEvento": 1,
	"idAvaliador": 2,
	"nota": 4
}
```
- **Exemplo de Retorno:**
```json
{
	"id": 6,
	"idEvento": 1,
	"idAvaliador": 2,
	"nota": 4
}
```

---

### Deletar:

- **Endpoint:** /avaliacao/id
- **Método:** DELETE
- **Exemplo de Body:** Não é necessário o envio de body para esta requisição.
- **Exemplo de Retorno:** Não é enviado nenhum retorno para esta requisição, apenas o Status Code.

---

## /usuario</strong>

### Listar Todos:

- **Endpoint:** /usuario
- **Método:** GET
- **Exemplo de Body:** Não é necessário o envio de body para esta requisição.
- **Exemplo de Retorno:**
```json
{
	"totalPages": 1,
	"totalElements": 5,
	"first": true,
	"last": true,
	"size": 100,
	"content": [
		{
			"id": 5,
			"cpf": "55555555555",
			"nome": "Vitor Rubim",
			"urlImagem": "https://avatars.githubusercontent.com/u/48107882?v=4",
			"email": "vitorrubim@fiap.com.br",
			"senha": null,
			"idsEventos": []
		},
		{
			"id": 4,
			"cpf": "44444444444",
			"nome": "Natan Cruz",
			"urlImagem": "https://avatars.githubusercontent.com/u/111809342?v=4",
			"email": "natancruz@fiap.com.br",
			"senha": null,
			"idsEventos": [
				2
			]
		},
		{
			"id": 3,
			"cpf": "33333333333",
			"nome": "Mariana Santos",
			"urlImagem": "https://avatars.githubusercontent.com/u/56116824?v=4",
			"email": "marianasantos@fiap.com.br",
			"senha": null,
			"idsEventos": [
				5
			]
		},
		{
			"id": 2,
			"cpf": "22222222222",
			"nome": "Kaue Caponero",
			"urlImagem": "https://avatars.githubusercontent.com/u/111543330?v=4",
			"email": "kauecaponero@fiap.com.br",
			"senha": null,
			"idsEventos": []
		},
		{
			"id": 1,
			"cpf": "11111111111",
			"nome": "Gustavo Sanches",
			"urlImagem": "https://avatars.githubusercontent.com/u/111543305?v=4",
			"email": "gustavosanches@fiap.com.br",
			"senha": null,
			"idsEventos": [
				1,
				4
			]
		}
	],
	"number": 0,
	"sort": {
		"empty": false,
		"sorted": true,
		"unsorted": false
	},
	"pageable": {
		"pageNumber": 0,
		"pageSize": 100,
		"sort": {
			"empty": false,
			"sorted": true,
			"unsorted": false
		},
		"offset": 0,
		"paged": true,
		"unpaged": false
	},
	"numberOfElements": 5,
	"empty": false
}
```

---

### Exibir por ID:

- **Endpoint:** /usuario/{id}
- **Método:** GET
- **Exemplo de Body:** Não é necessário o envio de body para esta requisição.
- **Exemplo de Retorno:**
```json
{
	"id": 5,
	"cpf": "55555555555",
	"nome": "Vitor Rubim",
	"urlImagem": "https://avatars.githubusercontent.com/u/48107882?v=4",
	"email": "vitorrubim@fiap.com.br",
	"senha": null,
	"idsEventos": []
}
```

---

### Exibir por ID do Evento:

- **Endpoint:** /usuario/evento/{eventoId}
- **Método:** GET
- **Exemplo de Body:** Não é necessário o envio de body para esta requisição.
- **Exemplo de Retorno:**
```json
[
	{
		"id": 4,
		"cpf": "44444444444",
		"nome": "Natan Cruz",
		"urlImagem": "https://avatars.githubusercontent.com/u/111809342?v=4",
		"email": "natancruz@fiap.com.br",
		"senha": null,
		"idsEventos": [
			2
		]
	}
]
```

---

### Cadastrar:

- **Endpoint:** /usuario
- **Método:** POST
- **Exemplo de Body:**
```json
{
  "cpf": "66666666666",
	"nome": "Usuário Teste",
	"urlImagem": "http://urlparaumaimagem.com/imagem.jpg",
  "email": "usuarioteste@example.com",
  "senha": "senha123"
}
```
- **Exemplo de Retorno:**
```json
{
  "cpf": "66666666666",
	"nome": "Usuário Teste",
	"urlImagem": "http://urlparaumaimagem.com/imagem.jpg",
  "email": "usuarioteste@example.com",
  "senha": "senha123"
}
```

---

### Login:

- **Endpoint:** /usuario/login
- **Método:** POST
- **Exemplo de Body:**
```json
{
	"email": "kauecaponero@fiap.com.br",
  "senha": "222222"
}
```
- **Exemplo de Retorno:**
```json
{
	"usuario": {
		"id": 2,
		"cpf": "22222222222",
		"nome": "Kaue Caponero",
		"urlImagem": "https://avatars.githubusercontent.com/u/111543330?v=4",
		"email": "kauecaponero@fiap.com.br",
		"senha": null,
		"idsEventos": []
	},
	"token": "-----"
}
```

---

### Atualizar:

- **Endpoint:** /usuario/id
- **Método:** PUT
- **Exemplo de Body:**
```json
{
  "cpf": "66666666666",
	"nome": "Testando Atualização",
	"urlImagem": "http://urlparaumaimagem.com/imagem-atualizada.jpg",
  "email": "usuariotesteatualizado@example.com",
  "senha": "senha123atualizada",
	"idsEventos": [2]
}
```
- **Exemplo de Retorno:**
```json
{
	"id": 6,
	"cpf": "66666666666",
	"nome": "Testando Atualização",
	"urlImagem": "http://urlparaumaimagem.com/imagem-atualizada.jpg",
	"email": "usuariotesteatualizado@example.com",
	"senha": null,
	"idsEventos": [
		2
	]
}
```

---

### Deletar:

- **Endpoint:** /usuario/id
- **Método:** DELETE
- **Exemplo de Body:** Não é necessário o envio de body para esta requisição.
- **Exemplo de Retorno:** Não é enviado nenhum retorno para esta requisição, apenas o Status Code.

---

## Códigos de Status das Requisições
| Código | Descrição

| 200 | Requisição bem-sucedida

| 201 | Cadastrado com sucesso

| 204 | A requisição foi bem-sucedida, mas não há conteúdo para retornar.

| 400 | Os campos enviados são inválidos

| 404 | Página não encontrada

| 405 | Método não permitido

| 500 | Erro interno do servidor

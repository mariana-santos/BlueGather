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

## Avaliacao

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

- **Endpoint:** /avaliacao/avaliador/{avaliadorId}
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

- **Endpoint:** /avaliacao/{id}
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

- **Endpoint:** /avaliacao/{id}
- **Método:** DELETE
- **Exemplo de Body:** Não é necessário o envio de body para esta requisição.
- **Exemplo de Retorno:** Não é enviado nenhum retorno para esta requisição, apenas o Status Code.

---

## Evento

### Listar Todos:

- **Endpoint:** /evento
- **Método:** GET
- **Exemplo de Body:** Não é necessário o envio de body para esta requisição.
- **Exemplo de Retorno:**
```json
[
	{
		"id": 2,
		"titulo": "Passeata Contra a Sacola de Plásticos em Mercados",
		"latitude": "-23.5420",
		"longitude": "-46.6294",
		"dataInicio": "2024-08-11 14:00:00",
		"dataFim": "2024-08-11 17:00:00",
		"descricao": null,
		"urgencia": 1,
		"organizador": {
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
		"tipoEvento": {
			"id": 2,
			"nome": "Passeata de Conscientização Ambiental"
		},
		"status": {
			"id": 2,
			"nome": "Finalizado"
		},
		"voluntarios": [
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
		],
		"imagens": [
			{
				"id": 4,
				"idEvento": 2,
				"idMomento": 2,
				"urlImagem": "https://f.i.uol.com.br/fotografia/2013/06/20/291240-970x600-1.jpeg"
			}
		]
	},
	{
		"id": 1,
		"titulo": "Limpeza da Praia da Enseada - Ubatuba",
		"latitude": "-23.4898",
		"longitude": "-45.0952",
		"dataInicio": "2024-08-10 09:00:00",
		"dataFim": "2024-08-10 13:00:00",
		"descricao": "Vamos ajudar a praia da enseada!",
		"urgencia": 2,
		"organizador": {
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
		},
		"tipoEvento": {
			"id": 1,
			"nome": "Limpeza de Praias"
		},
		"status": {
			"id": 2,
			"nome": "Finalizado"
		},
		"voluntarios": [
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
		"imagens": [
			{
				"id": 2,
				"idEvento": 1,
				"idMomento": 2,
				"urlImagem": "https://voiceoftheoceans.com/wp-content/uploads/2022/09/27e8fd00-c478-4522-88ad-f356ab1c740d.jpg"
			},
			{
				"id": 1,
				"idEvento": 1,
				"idMomento": 1,
				"urlImagem": "https://hardcore.com.br/wp-content/uploads/sites/21/2021/01/poluicao-plastica-em-bali.jpg"
			},
			{
				"id": 3,
				"idEvento": 1,
				"idMomento": 3,
				"urlImagem": "https://turismo.ubatuba.sp.gov.br/wp-content/uploads/sites/29/2014/10/DSC01621.jpg"
			}
		]
	}
]
```

---

### Exibir por ID:

- **Endpoint:** /evento/{id}
- **Método:** GET
- **Exemplo de Body:** Não é necessário o envio de body para esta requisição.
- **Exemplo de Retorno:**
```json
{
	"id": 5,
	"titulo": "Coleta de Lixo Reciclável da Favela da Rocinha",
	"latitude": "-22.9879",
	"longitude": "-43.2480",
	"dataInicio": "2024-08-14 19:00:00",
	"dataFim": "2024-08-14 21:00:00",
	"descricao": "Retirada de lixo reciclável de comércios e moradias para reciclagem e limpeza da comunidade",
	"urgencia": 4,
	"organizador": {
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
	"tipoEvento": {
		"id": 4,
		"nome": "Coleta de Lixo Reciclável"
	},
	"status": {
		"id": 1,
		"nome": "Aberto"
	},
	"voluntarios": [
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
		}
	],
	"imagens": []
}
```

---

### Exibir por Título:

- **Endpoint:** /evento/titulo/{titulo}
- **Método:** GET
- **Exemplo de Body:** Não é necessário o envio de body para esta requisição.
- **Exemplo de Retorno:**
```json
[
	{
		"id": 1,
		"titulo": "Limpeza da Praia da Enseada - Ubatuba",
		"latitude": "-23.4898",
		"longitude": "-45.0952",
		"dataInicio": "2024-08-10 09:00:00",
		"dataFim": "2024-08-10 13:00:00",
		"descricao": "Vamos ajudar a praia da enseada!",
		"urgencia": 2,
		"idOrganizador": 1,
		"idTipoEvento": 1,
		"idStatus": 2,
		"idsVoluntarios": [
			1
		]
	}
]
```

---

### Exibir por Localização:

- **Endpoint:** /evento/localizacao/{raioDistancia}
- **Método:** GET
- **Exemplo de Body:**
```json
{
    "latitude": "-23.4898",
    "longitude": "-45.0952"
}
```
- **Exemplo de Retorno:**
```json
[
	{
		"id": 1,
		"titulo": "Limpeza da Praia da Enseada - Ubatuba",
		"latitude": "-23.4898",
		"longitude": "-45.0952",
		"dataInicio": "2024-08-10 09:00:00",
		"dataFim": "2024-08-10 13:00:00",
		"descricao": "Vamos ajudar a praia da enseada!",
		"urgencia": 2,
		"idOrganizador": 1,
		"idTipoEvento": 1,
		"idStatus": 2,
		"idsVoluntarios": [
			1
		]
	},
	{
		"id": 3,
		"titulo": "Limpeza da Praia da Enseada - Guarujá",
		"latitude": "-23.9868",
		"longitude": "-46.2275",
		"dataInicio": null,
		"dataFim": null,
		"descricao": "Precisamos de voluntários para limpar!",
		"urgencia": 5,
		"idOrganizador": null,
		"idTipoEvento": 1,
		"idStatus": 3,
		"idsVoluntarios": []
	}
]
```

---

### Exibir por Data de Início:

- **Endpoint:** /evento/data/{dataInicio}
- **Método:** GET
- **Exemplo de Body:** Não é necessário o envio de body para esta requisição.
- **Exemplo de Retorno:**
```json
[
	{
		"id": 5,
		"titulo": "Coleta de Lixo Reciclável da Favela da Rocinha",
		"latitude": "-22.9879",
		"longitude": "-43.2480",
		"dataInicio": "2024-08-14 19:00:00",
		"dataFim": "2024-08-14 21:00:00",
		"descricao": "Retirada de lixo reciclável de comércios e moradias para reciclagem e limpeza da comunidade",
		"urgencia": 4,
		"idOrganizador": 3,
		"idTipoEvento": 4,
		"idStatus": 1,
		"idsVoluntarios": [
			3
		]
	}
]
```

---

### Exibir por ID da Urgência:

- **Endpoint:** /evento/urgencia/{urgenciaId}
- **Método:** GET
- **Exemplo de Body:** Não é necessário o envio de body para esta requisição.
- **Exemplo de Retorno:**
```json
[
	{
		"id": 3,
		"titulo": "Limpeza da Praia da Enseada - Guarujá",
		"latitude": "-23.9868",
		"longitude": "-46.2275",
		"dataInicio": null,
		"dataFim": null,
		"descricao": "Precisamos de voluntários para limpar!",
		"urgencia": 5,
		"idOrganizador": null,
		"idTipoEvento": 1,
		"idStatus": 3,
		"idsVoluntarios": []
	}
]
```

---

### Exibir por ID do Organizador:

- **Endpoint:** /evento/organizador/{organizadorId}
- **Método:** GET
- **Exemplo de Body:** Não é necessário o envio de body para esta requisição.
- **Exemplo de Retorno:**
```json
[
	{
		"id": 5,
		"titulo": "Coleta de Lixo Reciclável da Favela da Rocinha",
		"latitude": "-22.9879",
		"longitude": "-43.2480",
		"dataInicio": "2024-08-14 19:00:00",
		"dataFim": "2024-08-14 21:00:00",
		"descricao": "Retirada de lixo reciclável de comércios e moradias para reciclagem e limpeza da comunidade",
		"urgencia": 4,
		"idOrganizador": 3,
		"idTipoEvento": 4,
		"idStatus": 1,
		"idsVoluntarios": [
			3
		]
	}
]
```

---

### Exibir por ID do Tipo de Evento:

- **Endpoint:** /evento/tipo/{tipoEventoId}
- **Método:** GET
- **Exemplo de Body:** Não é necessário o envio de body para esta requisição.
- **Exemplo de Retorno:**
```json
[
	{
		"id": 4,
		"titulo": "Resgate de Tartarugas",
		"latitude": "-3.84036",
		"longitude": "-32.4113",
		"dataInicio": "2024-08-13 11:00:00",
		"dataFim": "2024-08-13 19:00:00",
		"descricao": "Ajudem-nos a salvar as tartarugas",
		"urgencia": 3,
		"idOrganizador": 1,
		"idTipoEvento": 3,
		"idStatus": 2,
		"idsVoluntarios": [
			1
		]
	}
]
```

---

### Exibir por ID do Status:

- **Endpoint:** /evento/status/{statusId}
- **Método:** GET
- **Exemplo de Body:** Não é necessário o envio de body para esta requisição.
- **Exemplo de Retorno:**
```json
[
	{
		"id": 5,
		"titulo": "Coleta de Lixo Reciclável da Favela da Rocinha",
		"latitude": "-22.9879",
		"longitude": "-43.2480",
		"dataInicio": "2024-08-14 19:00:00",
		"dataFim": "2024-08-14 21:00:00",
		"descricao": "Retirada de lixo reciclável de comércios e moradias para reciclagem e limpeza da comunidade",
		"urgencia": 4,
		"idOrganizador": 3,
		"idTipoEvento": 4,
		"idStatus": 1,
		"idsVoluntarios": [
			3
		]
	}
]
```

---

### Exibir por ID do Voluntário:

- **Endpoint:** /evento/voluntario/{voluntarioId}
- **Método:** GET
- **Exemplo de Body:** Não é necessário o envio de body para esta requisição.
- **Exemplo de Retorno:**
```json
[
	{
		"id": 1,
		"titulo": "Limpeza da Praia da Enseada - Ubatuba",
		"latitude": "-23.4898",
		"longitude": "-45.0952",
		"dataInicio": "2024-08-10 09:00:00",
		"dataFim": "2024-08-10 13:00:00",
		"descricao": "Vamos ajudar a praia da enseada!",
		"urgencia": 2,
		"idOrganizador": 1,
		"idTipoEvento": 1,
		"idStatus": 2,
		"idsVoluntarios": [
			1
		]
	},
	{
		"id": 4,
		"titulo": "Resgate de Tartarugas",
		"latitude": "-3.84036",
		"longitude": "-32.4113",
		"dataInicio": "2024-08-13 11:00:00",
		"dataFim": "2024-08-13 19:00:00",
		"descricao": "Ajudem-nos a salvar as tartarugas",
		"urgencia": 3,
		"idOrganizador": 1,
		"idTipoEvento": 3,
		"idStatus": 2,
		"idsVoluntarios": [
			1
		]
	}
]
```

---

### Cadastrar:

- **Endpoint:** /evento
- **Método:** POST
- **Exemplo de Body:**
```json
{
	"titulo": "Cadastrando Evento",
	"latitude": "000.000000",
	"longitude": "000.000000",
	"dataInicio": "2024-12-31 00:00:00",
  	"dataFim": "2025-01-01 00:00:00",
  	"descricao": "Testando",
  	"urgencia": 2,
  	"idOrganizador": 5,
  	"idTipoEvento": 1,
  	"idStatus": 1,
	"idsVoluntarios": []
}
```
- **Exemplo de Retorno:**
```json
{
	"id": 6,
	"titulo": "Cadastrando Evento",
	"latitude": "000.000000",
	"longitude": "000.000000",
	"dataInicio": "2024-12-31 00:00:00",
	"dataFim": "2025-01-01 00:00:00",
	"descricao": "Testando",
	"urgencia": 2,
	"idOrganizador": 5,
	"idTipoEvento": 1,
	"idStatus": 1,
	"idsVoluntarios": [
		5
	]
}
```

---

### Atualizar:

- **Endpoint:** /evento/{id}
- **Método:** PUT
- **Exemplo de Body:**
```json
{
	"titulo": "Cadastrando Evento",
	"latitude": "000.000000",
	"longitude": "000.000000",
	"dataInicio": "2024-12-31 00:00:00",
	"dataFim": "2025-01-01 00:00:00",
  	"descricao": "Testando",
  	"urgencia": 2,
  	"idOrganizador": 5,
  	"idTipoEvento": 1,
  	"idStatus": 1,
  	"idsVoluntarios": []
}
```
- **Exemplo de Retorno:**
```json
{
	"id": 6,
	"titulo": "Cadastrando Evento",
	"latitude": "000.000000",
	"longitude": "000.000000",
	"dataInicio": "2024-12-31 00:00:00",
	"dataFim": "2025-01-01 00:00:00",
	"descricao": "Testando",
	"urgencia": 2,
	"idOrganizador": 5,
	"idTipoEvento": 1,
	"idStatus": 1,
	"idsVoluntarios": [
		5
	]
}
```

---

### Deletar:

- **Endpoint:** /evento/{id}
- **Método:** DELETE
- **Exemplo de Body:** Não é necessário o envio de body para esta requisição.
- **Exemplo de Retorno:** Não é enviado nenhum retorno para esta requisição, apenas o Status Code.

---

## Imagem

### Listar Todos:

- **Endpoint:** /imagem
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
			"idMomento": 2,
			"urlImagem": "https://camboriu.news/wp-content/uploads/2020/11/salvar-tartaruga.jpg"
		},
		{
			"id": 4,
			"idEvento": 2,
			"idMomento": 2,
			"urlImagem": "https://f.i.uol.com.br/fotografia/2013/06/20/291240-970x600-1.jpeg"
		},
		{
			"id": 3,
			"idEvento": 1,
			"idMomento": 3,
			"urlImagem": "https://turismo.ubatuba.sp.gov.br/wp-content/uploads/sites/29/2014/10/DSC01621.jpg"
		},
		{
			"id": 2,
			"idEvento": 1,
			"idMomento": 2,
			"urlImagem": "https://voiceoftheoceans.com/wp-content/uploads/2022/09/27e8fd00-c478-4522-88ad-f356ab1c740d.jpg"
		},
		{
			"id": 1,
			"idEvento": 1,
			"idMomento": 1,
			"urlImagem": "https://hardcore.com.br/wp-content/uploads/sites/21/2021/01/poluicao-plastica-em-bali.jpg"
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

- **Endpoint:** /imagem/{id}
- **Método:** GET
- **Exemplo de Body:** Não é necessário o envio de body para esta requisição.
- **Exemplo de Retorno:**
```json
{
	"id": 1,
	"idEvento": 1,
	"idMomento": 1,
	"urlImagem": "https://hardcore.com.br/wp-content/uploads/sites/21/2021/01/poluicao-plastica-em-bali.jpg"
}
```

---

### Exibir por ID do Evento:

- **Endpoint:** /imagem/evento/{eventoId}
- **Método:** GET
- **Exemplo de Body:** Não é necessário o envio de body para esta requisição.
- **Exemplo de Retorno:**
```json
[
	{
		"id": 2,
		"idEvento": 1,
		"idMomento": 2,
		"urlImagem": "https://voiceoftheoceans.com/wp-content/uploads/2022/09/27e8fd00-c478-4522-88ad-f356ab1c740d.jpg"
	},
	{
		"id": 1,
		"idEvento": 1,
		"idMomento": 1,
		"urlImagem": "https://hardcore.com.br/wp-content/uploads/sites/21/2021/01/poluicao-plastica-em-bali.jpg"
	},
	{
		"id": 3,
		"idEvento": 1,
		"idMomento": 3,
		"urlImagem": "https://turismo.ubatuba.sp.gov.br/wp-content/uploads/sites/29/2014/10/DSC01621.jpg"
	}
]
```

---

### Exibir por ID do Momento:

- **Endpoint:** /imagem/momento/{momentoId}
- **Método:** GET
- **Exemplo de Body:** Não é necessário o envio de body para esta requisição.
- **Exemplo de Retorno:**
```json
[
	{
		"id": 1,
		"idEvento": 1,
		"idMomento": 1,
		"urlImagem": "https://hardcore.com.br/wp-content/uploads/sites/21/2021/01/poluicao-plastica-em-bali.jpg"
	}
]
```

---

### Cadastrar:

- **Endpoint:** /imagem
- **Método:** POST
- **Exemplo de Body:**
```json
{
	"idEvento": 1,
	"idMomento": 3,
	"urlImagem": "Testando Cadastro de Imagem"
}
```
- **Exemplo de Retorno:**
```json
{
	"id": 6,
	"idEvento": 1,
	"idMomento": 3,
	"urlImagem": "Testando Cadastro de Imagem"
}
```

---

### Atualizar:

- **Endpoint:** /imagem/{id}
- **Método:** PUT
- **Exemplo de Body:**
```json
{
	"idEvento": 2,
	"idMomento": 3,
	"urlImagem": "Testando Atualização de Imagem"
}
```
- **Exemplo de Retorno:**
```json
{
	"id": 6,
	"idEvento": 2,
	"idMomento": 3,
	"urlImagem": "Testando Atualização de Imagem"
}
```

---

### Deletar:

- **Endpoint:** /imagem/{id}
- **Método:** DELETE
- **Exemplo de Body:** Não é necessário o envio de body para esta requisição.
- **Exemplo de Retorno:** Não é enviado nenhum retorno para esta requisição, apenas o Status Code.

---

## Momento

### Listar Todos:

- **Endpoint:** /momento
- **Método:** GET
- **Exemplo de Body:** Não é necessário o envio de body para esta requisição.
- **Exemplo de Retorno:**
```json
{
	"totalPages": 1,
	"totalElements": 3,
	"first": true,
	"last": true,
	"size": 100,
	"content": [
		{
			"id": 3,
			"nome": "Depois"
		},
		{
			"id": 2,
			"nome": "Durante"
		},
		{
			"id": 1,
			"nome": "Antes"
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
	"numberOfElements": 3,
	"empty": false
}
```

---

### Exibir por ID:

- **Endpoint:** /momento/{id}
- **Método:** GET
- **Exemplo de Body:** Não é necessário o envio de body para esta requisição.
- **Exemplo de Retorno:**
```json
{
	"id": 1,
	"nome": "Antes"
}
```

---

### Exibir por Nome:

- **Endpoint:** /momento/nome/{nome}
- **Método:** GET
- **Exemplo de Body:** Não é necessário o envio de body para esta requisição.
- **Exemplo de Retorno:**
```json
[
	{
		"id": 3,
		"nome": "Depois"
	}
]
```

---

### Cadastrar:

- **Endpoint:** /momento
- **Método:** POST
- **Exemplo de Body:**
```json
{
	"nome": "Cadastrando Momento"
}
```
- **Exemplo de Retorno:**
```json
{
	"id": 4,
	"nome": "Cadastrando Momento"
}
```

---

### Atualizar:

- **Endpoint:** /momento/{id}
- **Método:** PUT
- **Exemplo de Body:**
```json
{
	"nome": "Atualizando Momento"
}
```
- **Exemplo de Retorno:**
```json
{
	"id": 4,
	"nome": "Atualizando Momento"
}
```

---

### Deletar:

- **Endpoint:** /momento/{id}
- **Método:** DELETE
- **Exemplo de Body:** Não é necessário o envio de body para esta requisição.
- **Exemplo de Retorno:** Não é enviado nenhum retorno para esta requisição, apenas o Status Code.

---

## Status

### Listar Todos:

- **Endpoint:** /status
- **Método:** GET
- **Exemplo de Body:** Não é necessário o envio de body para esta requisição.
- **Exemplo de Retorno:**
```json
{
	"totalPages": 1,
	"totalElements": 3,
	"first": true,
	"last": true,
	"size": 100,
	"content": [
		{
			"id": 3,
			"nome": "Cancelado"
		},
		{
			"id": 2,
			"nome": "Finalizado"
		},
		{
			"id": 1,
			"nome": "Aberto"
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
	"numberOfElements": 3,
	"empty": false
}
```

---

### Exibir por ID:

- **Endpoint:** /status/{id}
- **Método:** GET
- **Exemplo de Body:** Não é necessário o envio de body para esta requisição.
- **Exemplo de Retorno:**
```json
{
	"id": 1,
	"nome": "Aberto"
}
```

---

### Exibir por Nome:

- **Endpoint:** /status/nome/{nome}
- **Método:** GET
- **Exemplo de Body:** Não é necessário o envio de body para esta requisição.
- **Exemplo de Retorno:**
```json
[
	{
		"id": 1,
		"nome": "Aberto"
	}
]
```

---

### Cadastrar:

- **Endpoint:** /status
- **Método:** POST
- **Exemplo de Body:**
```json
{
	"nome": "Cadastrando Status"
}
```
- **Exemplo de Retorno:**
```json
{
	"id": 4,
	"nome": "Cadastrando Status"
}
```

---

### Atualizar:

- **Endpoint:** /status/{id}
- **Método:** PUT
- **Exemplo de Body:**
```json
{
	"nome": "Atualizando Status"
}
```
- **Exemplo de Retorno:**
```json
{
	"id": 4,
	"nome": "Atualizando Status"
}
```

---

### Deletar:

- **Endpoint:** /status/{id}
- **Método:** DELETE
- **Exemplo de Body:** Não é necessário o envio de body para esta requisição.
- **Exemplo de Retorno:** Não é enviado nenhum retorno para esta requisição, apenas o Status Code.

---

## Tipo Evento

### Listar Todos:

- **Endpoint:** /tipoevento
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
			"nome": "Protesto"
		},
		{
			"id": 4,
			"nome": "Coleta de Lixo Reciclável"
		},
		{
			"id": 3,
			"nome": "Resgate de Animais Marinhos"
		},
		{
			"id": 2,
			"nome": "Passeata de Conscientização Ambiental"
		},
		{
			"id": 1,
			"nome": "Limpeza de Praias"
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

- **Endpoint:** /tipoevento/{id}
- **Método:** GET
- **Exemplo de Body:** Não é necessário o envio de body para esta requisição.
- **Exemplo de Retorno:**
```json
{
	"id": 1,
	"nome": "Limpeza de Praias"
}
```

---

### Exibir por Nome:

- **Endpoint:** /tipoevento/nome/{nome}
- **Método:** GET
- **Exemplo de Body:** Não é necessário o envio de body para esta requisição.
- **Exemplo de Retorno:**
```json
[
	{
		"id": 3,
		"nome": "Resgate de Animais Marinhos"
	}
]
```

---

### Cadastrar:

- **Endpoint:** /tipoevento
- **Método:** POST
- **Exemplo de Body:**
```json
{
	"nome": "Cadastrando TipoEvento"
}
```
- **Exemplo de Retorno:**
```json
{
	"id": 6,
	"nome": "Cadastrando TipoEvento"
}
```

---

### Atualizar:

- **Endpoint:** /tipoevento/{id}
- **Método:** PUT
- **Exemplo de Body:**
```json
{
	"nome": "Atualizando TipoEvento"
}
```
- **Exemplo de Retorno:**
```json
{
	"id": 6,
	"nome": "Atualizando TipoEvento"
}
```

---

### Deletar:

- **Endpoint:** /tipoevento/{id}
- **Método:** DELETE
- **Exemplo de Body:** Não é necessário o envio de body para esta requisição.
- **Exemplo de Retorno:** Não é enviado nenhum retorno para esta requisição, apenas o Status Code.

---

## Usuario

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

- **Endpoint:** /usuario/{id}
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

- **Endpoint:** /usuario/{id}
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

// INTEGRANTES - GRUPO BLUE GATHER
// RM 97068	- Gustavo Sorrilha Sanches
// RM 96466	- Kaue Caponero Figueiredo
// RM 97503	- Mariana Santos Fernandes de Sousa
// RM 97324	- Natan Cruz
// RM 97092	- Vitor Rubim Passos

// Criando Base de Dados
use("BlueGather")

// Criando 4 Collections
db.createCollection("Usuario")
db.createCollection("Evento")

// Inserindo 5 documentos em cada Collection
db.Usuario.insertMany([
  { _id: 1, cpf: '11111111111', nome: 'Gustavo Sanches', url_imagem: 'https://avatars.githubusercontent.com/u/111543305?v=4', email: 'gustavosanches@fiap.com.br', senha: '111111' },
  { _id: 2, cpf: '22222222222', nome: 'Kaue Caponero', url_imagem: 'https://avatars.githubusercontent.com/u/111543330?v=4', email: 'kauecaponero@fiap.com.br', senha: '222222' },
  { _id: 3, cpf: '33333333333', nome: 'Mariana Santos', url_imagem: 'https://avatars.githubusercontent.com/u/56116824?v=4', email: 'marianasantos@fiap.com.br', senha: '333333' },
  { _id: 4, cpf: '44444444444', nome: 'Natan Cruz', url_imagem: 'https://avatars.githubusercontent.com/u/111809342?v=4', email: 'natancruz@fiap.com.br', senha: '444444' },
  { _id: 5, cpf: '55555555555', nome: 'Vitor Rubim', url_imagem: 'https://avatars.githubusercontent.com/u/48107882?v=4', email: 'vitorrubim@fiap.com.br', senha: '555555' }
]);

db.Evento.insertMany([
  { _id: 1, titulo: 'Limpeza da Praia da Enseada - Ubatuba', latitude: '-23.4898', longitude: '-45.0952', data_inicio: new Date('2024-08-10T06:00:00Z'), data_fim: new Date('2024-08-10T10:00:00Z'), descricao: 'Vamos ajudar a praia da enseada!', urgencia: 2, id_organizador: 1, id_tipo: 1, id_status: 2 },
  { _id: 2, titulo: 'Passeata Contra a Sacola de Plásticos em Mercados', latitude: '-23.5420', longitude: '-46.6294', data_inicio: new Date('2024-08-11T11:00:00Z'), data_fim: new Date('2024-08-11T14:00:00Z'), descricao: null, urgencia: 1, id_organizador: 4, id_tipo: 2, id_status: 2 },
  { _id: 3, titulo: 'Limpeza da Praia da Enseada - Guarujá', latitude: '-23.9868', longitude: '-46.2275', data_inicio: null, data_fim: null, descricao: 'Precisamos de voluntários para limpar!', urgencia: 5, id_organizador: null, id_tipo: 1, id_status: 3 },
  { _id: 4, titulo: 'Resgate de Tartarugas', latitude: '-3.84036', longitude: '-32.4113', data_inicio: new Date('2024-08-13T08:00:00Z'), data_fim: new Date('2024-08-13T16:00:00Z'), descricao: 'Ajudem-nos a salvar as tartarugas', urgencia: 3, id_organizador: 1, id_tipo: 3, id_status: 2 },
  { _id: 5, titulo: 'Coleta de Lixo Reciclável da Favela da Rocinha', latitude: '-22.9879', longitude: '-43.2480', data_inicio: new Date('2024-08-14T16:00:00Z'), data_fim: new Date('2024-08-14T18:00:00Z'), descricao: 'Retirada de lixo reciclável de comércios e moradias para reciclagem e limpeza da comunidade', urgencia: 4, id_organizador: 3, id_tipo: 4, id_status: 1 }
]);
-- INTEGRANTES
-- RM 97068	- Gustavo Sorrilha Sanches
-- RM 96466	- Kaue Caponero Figueiredo
-- RM 97503	- Mariana Santos Fernandes de Sousa
-- RM 97324	- Natan Cruz
-- RM 97092	- Vitor Rubim Passos

-- DROP TABLES CASO NECESSARIO
DROP TABLE avaliacao CASCADE CONSTRAINTS;
DROP TABLE evento CASCADE CONSTRAINTS;
DROP TABLE imagem CASCADE CONSTRAINTS;
DROP TABLE momento CASCADE CONSTRAINTS;
DROP TABLE status CASCADE CONSTRAINTS;
DROP TABLE tipo_evento CASCADE CONSTRAINTS;
DROP TABLE usuario CASCADE CONSTRAINTS;
DROP TABLE usuario_evento CASCADE CONSTRAINTS;

-- DROPANDO SEQUENCIAS CASO NECESSARIO:
DECLARE
  v_sql VARCHAR2(1000);
BEGIN
  FOR cur IN (SELECT sequence_name
              FROM user_sequences
              WHERE sequence_name NOT IN (
                SELECT sequence_name 
                FROM all_tab_identity_cols
                WHERE sequence_name IS NOT NULL
              )) 
  LOOP
    v_sql := 'DROP SEQUENCE ' || cur.sequence_name;
    EXECUTE IMMEDIATE v_sql;
  END LOOP;
END;

-- SELECTS CASO NECESSARIO:
SELECT * FROM avaliacao;
SELECT * FROM evento;
SELECT * FROM imagem;
SELECT * FROM momento;
SELECT * FROM status;
SELECT * FROM tipo_evento;
SELECT * FROM usuario;
SELECT * FROM usuario_evento;

-- CRIAÇÃO DAS TABELAS
CREATE TABLE usuario (
    id NUMBER(9) CONSTRAINT pk_id_usuario PRIMARY KEY,
    cpf CHAR(11) CONSTRAINT uk_cpf_usuario UNIQUE CONSTRAINT nn_cpf_usuario NOT NULL,
    nome VARCHAR2(255) CONSTRAINT nn_nome_usuario NOT NULL,
    url_imagem VARCHAR2(255),
    email VARCHAR2(255) CONSTRAINT uk_email_usuario UNIQUE CONSTRAINT nn_email_usuario NOT NULL,
    senha VARCHAR2(255) CONSTRAINT nn_senha_usuario NOT NULL
);

CREATE TABLE tipo_evento (
    id NUMBER(9) CONSTRAINT pk_id_tipo PRIMARY KEY,
    nome VARCHAR2(255) CONSTRAINT uk_nome_tipo UNIQUE CONSTRAINT nn_nome_tipo NOT NULL
);

CREATE TABLE status (
    id NUMBER(9) CONSTRAINT pk_id_status PRIMARY KEY,
    nome VARCHAR2(255) CONSTRAINT uk_nome_status UNIQUE CONSTRAINT nn_nome_status NOT NULL
);

CREATE TABLE momento (
    id NUMBER(9) CONSTRAINT pk_id_momento PRIMARY KEY,
    nome VARCHAR2(255) CONSTRAINT uk_nome_momento UNIQUE CONSTRAINT nn_nome_momento NOT NULL
);

CREATE TABLE evento (
    id NUMBER(9) CONSTRAINT pk_id_evento PRIMARY KEY,
    titulo VARCHAR2(255) CONSTRAINT nn_titulo_evento NOT NULL,
    latitude VARCHAR2(12) CONSTRAINT nn_latitude_evento NOT NULL,
    longitude VARCHAR2(12) CONSTRAINT nn_longitude_evento NOT NULL,
    data_inicio DATE,
    data_fim DATE,
    descricao VARCHAR2(255),
    urgencia NUMBER(1) CONSTRAINT nn_urgencia_evento NOT NULL,
    id_organizador NUMBER(9) CONSTRAINT fk_id_organizador_evento REFERENCES usuario(id),
    id_tipo NUMBER(9) CONSTRAINT fk_id_tipo_evento REFERENCES tipo_evento(id) CONSTRAINT nn_tipo_evento NOT NULL,
    id_status NUMBER(9) CONSTRAINT fk_id_status_evento REFERENCES status(id) CONSTRAINT nn_status_evento NOT NULL
);

CREATE TABLE imagem (
    id NUMBER(9) CONSTRAINT pk_id_imagem PRIMARY KEY,
    id_evento NUMBER(9) CONSTRAINT fk_id_evento_imagem REFERENCES evento(id) CONSTRAINT nn_evento_imagem NOT NULL,
    id_momento NUMBER(9) CONSTRAINT fk_id_momento_imagem REFERENCES momento(id) CONSTRAINT nn_momento_imagem NOT NULL,
    url_imagem VARCHAR2(255) CONSTRAINT nn_url_imagem NOT NULL
);

CREATE TABLE avaliacao (
    id NUMBER(9) CONSTRAINT pk_id_avaliacao PRIMARY KEY,
    id_evento NUMBER(9) CONSTRAINT fk_id_evento_avaliacao REFERENCES evento(id) CONSTRAINT nn_evento_avaliacao NOT NULL,
    id_avaliador NUMBER(9) CONSTRAINT fk_id_avaliador_avaliacao REFERENCES usuario(id) CONSTRAINT nn_avaliador_avaliacao NOT NULL,
    nota NUMBER(1) CONSTRAINT nn_nota NOT NULL
);

CREATE TABLE usuario_evento (
    id_usuario NUMBER(9) CONSTRAINT fk_id_usuario_evento REFERENCES usuario(id) CONSTRAINT nn_id_usuario_evento NOT NULL,
    id_evento NUMBER(9) CONSTRAINT fk_id_evento_usuario REFERENCES evento(id) CONSTRAINT nn_id_evento_usuario NOT NULL,
    CONSTRAINT pk_usuario_evento PRIMARY KEY (id_usuario, id_evento)
);

-- CRIANDO SEQUÊNCIAS
CREATE SEQUENCE sq_avaliacao START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE sq_evento START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE sq_imagem START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE sq_momento START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE sq_status START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE sq_tipo_evento START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE sq_usuario START WITH 1 INCREMENT BY 1;

-- INSERTS
INSERT INTO usuario VALUES (sq_usuario.NEXTVAL, '11111111111', 'Gustavo Sanches', 'https://avatars.githubusercontent.com/u/111543305?v=4', 'gustavosanches@fiap.com.br', '111111');
INSERT INTO usuario VALUES (sq_usuario.NEXTVAL, '22222222222', 'Kaue Caponero', 'https://avatars.githubusercontent.com/u/111543330?v=4', 'kauecaponero@fiap.com.br', '222222');
INSERT INTO usuario VALUES (sq_usuario.NEXTVAL, '33333333333', 'Mariana Santos', 'https://avatars.githubusercontent.com/u/56116824?v=4', 'marianasantos@fiap.com.br', '333333');
INSERT INTO usuario VALUES (sq_usuario.NEXTVAL, '44444444444', 'Natan Cruz', 'https://avatars.githubusercontent.com/u/111809342?v=4', 'natancruz@fiap.com.br', '444444');
INSERT INTO usuario VALUES (sq_usuario.NEXTVAL, '55555555555', 'Vitor Rubim', 'https://avatars.githubusercontent.com/u/48107882?v=4', 'vitorrubim@fiap.com.br', '555555');

INSERT INTO tipo_evento VALUES (sq_tipo_evento.NEXTVAL, 'Limpeza de Praias');
INSERT INTO tipo_evento VALUES (sq_tipo_evento.NEXTVAL, 'Passeata de Conscientização Ambiental');
INSERT INTO tipo_evento VALUES (sq_tipo_evento.NEXTVAL, 'Resgate de Animais Marinhos');
INSERT INTO tipo_evento VALUES (sq_tipo_evento.NEXTVAL, 'Coleta de Lixo Reciclável');
INSERT INTO tipo_evento VALUES (sq_tipo_evento.NEXTVAL, 'Protesto');

-- Inseridos apenas 3 status pois não faz sentido ao projeto, no momento, ter mais do que isso
INSERT INTO status VALUES (sq_status.NEXTVAL, 'Aberto');
INSERT INTO status VALUES (sq_status.NEXTVAL, 'Finalizado');
INSERT INTO status VALUES (sq_status.NEXTVAL, 'Cancelado');

INSERT INTO evento VALUES (sq_evento.NEXTVAL, 'Limpeza da Praia da Enseada - Ubatuba', '-23.4898', '-45.0952', TO_TIMESTAMP('2024-08-10 06:00', 'YYYY-MM-DD HH24:MI'), TO_TIMESTAMP('2024-08-10 10:00', 'YYYY-MM-DD HH24:MI'), 'Vamos ajudar a praia da enseada!', 2, 1, 1, 2);
INSERT INTO evento VALUES (sq_evento.NEXTVAL, 'Passeata Contra a Sacola de Plásticos em Mercados', '-23.5420', '-46.6294', TO_TIMESTAMP('2024-08-11 11:00', 'YYYY-MM-DD HH24:MI'), TO_TIMESTAMP('2024-08-11 14:00', 'YYYY-MM-DD HH24:MI'), NULL, 1, 4, 2, 2);
INSERT INTO evento VALUES (sq_evento.NEXTVAL, 'Limpeza da Praia da Enseada - Guarujá', '-23.9868', '-46.2275', NULL, NULL, 'Precisamos de voluntários para limpar!', 5, NULL, 1, 3);
INSERT INTO evento VALUES (sq_evento.NEXTVAL, 'Resgate de Tartarugas', '-3.84036', '-32.4113', TO_TIMESTAMP('2024-08-13 08:00', 'YYYY-MM-DD HH24:MI'), TO_TIMESTAMP('2024-08-13 16:00', 'YYYY-MM-DD HH24:MI'), 'Ajudem-nos a salvar as tartarugas', 3, 1, 3, 2);
INSERT INTO evento VALUES (sq_evento.NEXTVAL, 'Coleta de Lixo Reciclável da Favela da Rocinha', '-22.9879', '-43.2480', TO_TIMESTAMP('2024-08-14 16:00', 'YYYY-MM-DD HH24:MI'), TO_TIMESTAMP('2024-08-14 18:00', 'YYYY-MM-DD HH24:MI'), 'Retirada de lixo reciclável de comércios e moradias para reciclagem e limpeza da comunidade', 4, 3, 4, 1);

-- Inseridos apenas 3 status pois não faz sentido ao projeto, no momento, ter mais do que isso
INSERT INTO momento VALUES (1, 'Antes');
INSERT INTO momento VALUES (2, 'Durante');
INSERT INTO momento VALUES (3, 'Depois');

INSERT INTO imagem VALUES (sq_imagem.NEXTVAL, 1, 1, 'https://hardcore.com.br/wp-content/uploads/sites/21/2021/01/poluicao-plastica-em-bali.jpg');
INSERT INTO imagem VALUES (sq_imagem.NEXTVAL, 1, 2, 'https://voiceoftheoceans.com/wp-content/uploads/2022/09/27e8fd00-c478-4522-88ad-f356ab1c740d.jpg');
INSERT INTO imagem VALUES (sq_imagem.NEXTVAL, 1, 3, 'https://turismo.ubatuba.sp.gov.br/wp-content/uploads/sites/29/2014/10/DSC01621.jpg');
INSERT INTO imagem VALUES (sq_imagem.NEXTVAL, 2, 2, 'https://f.i.uol.com.br/fotografia/2013/06/20/291240-970x600-1.jpeg');
INSERT INTO imagem VALUES (sq_imagem.NEXTVAL, 4, 2, 'https://camboriu.news/wp-content/uploads/2020/11/salvar-tartaruga.jpg');

INSERT INTO avaliacao VALUES (sq_avaliacao.NEXTVAL, 1, 2, 5);
INSERT INTO avaliacao VALUES (sq_avaliacao.NEXTVAL, 1, 3, 3);
INSERT INTO avaliacao VALUES (sq_avaliacao.NEXTVAL, 1, 4, 3);
INSERT INTO avaliacao VALUES (sq_avaliacao.NEXTVAL, 3, 5, 1);
INSERT INTO avaliacao VALUES (sq_avaliacao.NEXTVAL, 3, 4, 1);

INSERT INTO usuario_evento VALUES (1, 1);
INSERT INTO usuario_evento VALUES (4, 2);
INSERT INTO usuario_evento VALUES (1, 4);
INSERT INTO usuario_evento VALUES (2, 4);
INSERT INTO usuario_evento VALUES (3, 5);
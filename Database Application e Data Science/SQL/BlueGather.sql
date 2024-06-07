--- INTEGRANTES
-- RM 97068	- Gustavo Sorrilha Sanches
-- RM 96466	- Kaue Caponero Figueiredo
-- RM 97503	- Mariana Santos Fernandes de Sousa
-- RM 97324	- Natan Cruz
-- RM 97092	- Vitor Rubim Passos

--- DROP TABLES CASO NECESSARIO
DROP TABLE avaliacao CASCADE CONSTRAINTS;
DROP TABLE evento CASCADE CONSTRAINTS;
DROP TABLE imagem CASCADE CONSTRAINTS;
DROP TABLE momento CASCADE CONSTRAINTS;
DROP TABLE status CASCADE CONSTRAINTS;
DROP TABLE tipo_evento CASCADE CONSTRAINTS;
DROP TABLE usuario CASCADE CONSTRAINTS;
DROP TABLE usuario_evento CASCADE CONSTRAINTS;
DROP TABLE auditoria CASCADE CONSTRAINTS;

--- DROPANDO SEQUENCIAS CASO NECESSARIO:
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

--- SELECTS CASO NECESSARIO:
SELECT * FROM avaliacao;
SELECT * FROM evento;
SELECT * FROM imagem;
SELECT * FROM momento;
SELECT * FROM status;
SELECT * FROM tipo_evento;
SELECT * FROM usuario;
SELECT * FROM usuario_evento;

--- CRIA??O DAS TABELAS
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

--- CRIANDO SEQU?NCIAS
CREATE SEQUENCE sq_avaliacao START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE sq_evento START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE sq_imagem START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE sq_momento START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE sq_status START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE sq_tipo_evento START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE sq_usuario START WITH 1 INCREMENT BY 1;

--- INSERTS
INSERT INTO usuario VALUES (sq_usuario.NEXTVAL, '11111111111', 'Gustavo Sanches', 'https://avatars.githubusercontent.com/u/111543305?v=4', 'gustavosanches@fiap.com.br', '111111');
INSERT INTO usuario VALUES (sq_usuario.NEXTVAL, '22222222222', 'Kaue Caponero', 'https://avatars.githubusercontent.com/u/111543330?v=4', 'kauecaponero@fiap.com.br', '222222');
INSERT INTO usuario VALUES (sq_usuario.NEXTVAL, '33333333333', 'Mariana Santos', 'https://avatars.githubusercontent.com/u/56116824?v=4', 'marianasantos@fiap.com.br', '333333');
INSERT INTO usuario VALUES (sq_usuario.NEXTVAL, '44444444444', 'Natan Cruz', 'https://avatars.githubusercontent.com/u/111809342?v=4', 'natancruz@fiap.com.br', '444444');
INSERT INTO usuario VALUES (sq_usuario.NEXTVAL, '55555555555', 'Vitor Rubim', 'https://avatars.githubusercontent.com/u/48107882?v=4', 'vitorrubim@fiap.com.br', '555555');

INSERT INTO tipo_evento VALUES (sq_tipo_evento.NEXTVAL, 'Limpeza de Praias');
INSERT INTO tipo_evento VALUES (sq_tipo_evento.NEXTVAL, 'Passeata de Conscientiza??o Ambiental');
INSERT INTO tipo_evento VALUES (sq_tipo_evento.NEXTVAL, 'Resgate de Animais Marinhos');
INSERT INTO tipo_evento VALUES (sq_tipo_evento.NEXTVAL, 'Coleta de Lixo Recicl?vel');
INSERT INTO tipo_evento VALUES (sq_tipo_evento.NEXTVAL, 'Protesto');

-- Inseridos apenas 3 status pois n?o faz sentido ao projeto, no momento, ter mais do que isso
INSERT INTO status VALUES (sq_status.NEXTVAL, 'Aberto');
INSERT INTO status VALUES (sq_status.NEXTVAL, 'Finalizado');
INSERT INTO status VALUES (sq_status.NEXTVAL, 'Cancelado');

INSERT INTO evento VALUES (sq_evento.NEXTVAL, 'Limpeza da Praia da Enseada - Ubatuba', '-23.4898', '-45.0952', TO_TIMESTAMP('2024-08-10 06:00', 'YYYY-MM-DD HH24:MI'), TO_TIMESTAMP('2024-08-10 10:00', 'YYYY-MM-DD HH24:MI'), 'Vamos ajudar a praia da enseada!', 2, 1, 1, 2);
INSERT INTO evento VALUES (sq_evento.NEXTVAL, 'Passeata Contra a Sacola de Pl?sticos em Mercados', '-23.5420', '-46.6294', TO_TIMESTAMP('2024-08-11 11:00', 'YYYY-MM-DD HH24:MI'), TO_TIMESTAMP('2024-08-11 14:00', 'YYYY-MM-DD HH24:MI'), NULL, 1, 4, 2, 2);
INSERT INTO evento VALUES (sq_evento.NEXTVAL, 'Limpeza da Praia da Enseada - Guaruj?', '-23.9868', '-46.2275', NULL, NULL, 'Precisamos de volunt?rios para limpar!', 5, NULL, 1, 3);
INSERT INTO evento VALUES (sq_evento.NEXTVAL, 'Resgate de Tartarugas', '-3.84036', '-32.4113', TO_TIMESTAMP('2024-08-13 08:00', 'YYYY-MM-DD HH24:MI'), TO_TIMESTAMP('2024-08-13 16:00', 'YYYY-MM-DD HH24:MI'), 'Ajudem-nos a salvar as tartarugas', 3, 1, 3, 2);
INSERT INTO evento VALUES (sq_evento.NEXTVAL, 'Coleta de Lixo Recicl?vel da Favela da Rocinha', '-22.9879', '-43.2480', TO_TIMESTAMP('2024-08-14 18:00', 'YYYY-MM-DD HH24:MI'), null, 'Retirada de lixo recicl?vel de com?rcios e moradias para reciclagem e limpeza da comunidade', 4, 3, 4, 1);

-- Inseridos apenas 3 momentos pois n?o faz sentido ao projeto, no momento, ter mais do que isso
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

--- Procedures
SET SERVEROUTPUT ON;

-- Procedures da tabela Usuario
-- Inserir Usuario
CREATE OR REPLACE PROCEDURE inserir_usuario (
    p_id IN NUMBER,
    p_cpf IN CHAR,
    p_nome IN VARCHAR2,
    p_url_imagem IN VARCHAR2,
    p_email IN VARCHAR2,
    p_senha IN VARCHAR2
) IS
BEGIN
    INSERT INTO Usuario (id, cpf, nome, url_imagem, email, senha)
    VALUES (p_id, p_cpf, p_nome, p_url_imagem, p_email, p_senha);
    
    COMMIT;
EXCEPTION
    WHEN DUP_VAL_ON_INDEX THEN
        RAISE_APPLICATION_ERROR(-20001, 'Erro: CPF ou email ja cadastrados.');
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
END;

-- Teste para inserir_usuario
BEGIN
    inserir_usuario(6, '66666666666', 'Joao Castro', 'http://example.com/image1.jpg', 'joao_castro@gmail.com', 'senha123');
    DBMS_OUTPUT.PUT_LINE('Usu?rio inserido com sucesso.');
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Erro ao inserir usu?rio: ' || SQLERRM);
END;

-- Atualizar Usuario
CREATE OR REPLACE PROCEDURE atualizar_usuario (
    p_id IN NUMBER,
    p_cpf IN CHAR,
    p_nome IN VARCHAR2,
    p_url_imagem IN VARCHAR2,
    p_email IN VARCHAR2,
    p_senha IN VARCHAR2
) IS
BEGIN
    UPDATE Usuario
    SET cpf = p_cpf,
        nome = p_nome,
        url_imagem = p_url_imagem,
        email = p_email,
        senha = p_senha
    WHERE id = p_id;
    
    COMMIT;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(-20003, 'Erro: Usu?rio n?o encontrado.');
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
END;

-- Teste para atualizar_usuario
BEGIN
    atualizar_usuario(6, '66666666666', 'Jo?o Silva', 'http://example.com/image2.jpg', 'joao_silva@gmail.com', 'nova_senha123');
    DBMS_OUTPUT.PUT_LINE('Usu?rio atualizado com sucesso.');
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Erro ao atualizar usu?rio: ' || SQLERRM);
END;

-- Deletar Usuario
CREATE OR REPLACE PROCEDURE deletar_usuario (
    p_id IN NUMBER
) IS
BEGIN
    DELETE FROM Usuario WHERE id = p_id;
    
    COMMIT;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(-20003, 'Erro: Usu?rio n?o encontrado.');
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
END;

-- Teste para deletar_usuario
BEGIN
    deletar_usuario(6);
    DBMS_OUTPUT.PUT_LINE('Usu?rio deletado com sucesso.');
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Erro ao deletar usu?rio: ' || SQLERRM);
END;

-- Procedures da tabela Tipo_Evento
-- Inserir Tipo_Evento
CREATE OR REPLACE PROCEDURE inserir_tipo_evento (
    p_id IN NUMBER,
    p_nome IN VARCHAR2
) IS
BEGIN
    INSERT INTO Tipo_Evento (id, nome)
    VALUES (p_id, p_nome);
    
    COMMIT;
EXCEPTION
    WHEN DUP_VAL_ON_INDEX THEN
        RAISE_APPLICATION_ERROR(-20001, 'Erro: Tipo de evento j? cadastrado.');
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
END;

-- Teste para inserir_tipo_evento
BEGIN
    inserir_tipo_evento(6, 'A??o Ambiental');
    DBMS_OUTPUT.PUT_LINE('Tipo de evento inserido com sucesso.');
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Erro ao inserir tipo de evento: ' || SQLERRM);
END;

-- Atualizar Tipo_Evento
CREATE OR REPLACE PROCEDURE atualizar_tipo_evento (
    p_id IN NUMBER,
    p_nome IN VARCHAR2
) IS
BEGIN
    UPDATE Tipo_Evento
    SET nome = p_nome
    WHERE id = p_id;
    
    COMMIT;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(-20003, 'Erro: Tipo de evento n?o encontrado.');
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
END;

-- Teste para atualizar_tipo_evento
BEGIN
    atualizar_tipo_evento(6, 'A??o Ambiental - Atualizado');
    DBMS_OUTPUT.PUT_LINE('Tipo de evento atualizado com sucesso.');
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Erro ao atualizar tipo de evento: ' || SQLERRM);
END;

-- Deletar Tipo_Evento
CREATE OR REPLACE PROCEDURE deletar_tipo_evento (
    p_id IN NUMBER
) IS
BEGIN
    DELETE FROM Tipo_Evento WHERE id = p_id;
    
    COMMIT;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(-20003, 'Erro: Tipo de evento n?o encontrado.');
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
END;

-- Teste para deletar_tipo_evento
BEGIN
    deletar_tipo_evento(6);
    DBMS_OUTPUT.PUT_LINE('Tipo de evento deletado com sucesso.');
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Erro ao deletar tipo de evento: ' || SQLERRM);
END;

-- Procedures da tabela Status
-- Inserir Status
CREATE OR REPLACE PROCEDURE inserir_status (
    p_id IN NUMBER,
    p_nome IN VARCHAR2
) IS
BEGIN
    INSERT INTO Status (id, nome)
    VALUES (p_id, p_nome);
    
    COMMIT;
EXCEPTION
    WHEN DUP_VAL_ON_INDEX THEN
        RAISE_APPLICATION_ERROR(-20001, 'Erro: Status j? cadastrado.');
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
END;

-- Teste para inserir_status
BEGIN
    inserir_status(6, 'Em Andamento');
    DBMS_OUTPUT.PUT_LINE('Status inserido com sucesso.');
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Erro ao inserir status: ' || SQLERRM);
END;

-- Atualizar Status
CREATE OR REPLACE PROCEDURE atualizar_status (
    p_id IN NUMBER,
    p_nome IN VARCHAR2
) IS
BEGIN
    UPDATE Status
    SET nome = p_nome
    WHERE id = p_id;
    
    COMMIT;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(-20003, 'Erro: Status n?o encontrado.');
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
END;

-- Teste para atualizar_status
BEGIN
    atualizar_status(6, 'Em Andamento - Atualizado');
    DBMS_OUTPUT.PUT_LINE('Status atualizado com sucesso.');
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Erro ao atualizar status: ' || SQLERRM);
END;

-- Deletar Status
CREATE OR REPLACE PROCEDURE deletar_status (
    p_id IN NUMBER
) IS
BEGIN
    DELETE FROM Status WHERE id = p_id;
    
    COMMIT;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(-20003, 'Erro: Status n?o encontrado.');
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
END;

-- Teste para deletar_status
BEGIN
    deletar_status(6);
    DBMS_OUTPUT.PUT_LINE('Status deletado com sucesso.');
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Erro ao deletar status: ' || SQLERRM);
END;

-- Procedures da tabela Evento
-- Inserir Evento
CREATE OR REPLACE PROCEDURE inserir_evento (
    p_id IN NUMBER,
    p_titulo IN VARCHAR2,
    p_latitude IN VARCHAR2,
    p_longitude IN VARCHAR2,
    p_data_inicio IN DATE,
    p_data_fim IN DATE,
    p_descricao IN VARCHAR2,
    p_urgencia IN NUMBER,
    p_id_organizador IN NUMBER,
    p_id_tipo IN NUMBER,
    p_id_status IN NUMBER
) IS
BEGIN
    INSERT INTO Evento (id, titulo, latitude, longitude, data_inicio, data_fim, descricao, urgencia, id_organizador, id_tipo, id_status)
    VALUES (p_id, p_titulo, p_latitude, p_longitude, p_data_inicio, p_data_fim, p_descricao, p_urgencia, p_id_organizador, p_id_tipo, p_id_status);
    
    COMMIT;
EXCEPTION
    WHEN DUP_VAL_ON_INDEX THEN
        RAISE_APPLICATION_ERROR(-20001, 'Erro: Evento j? cadastrado.');
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
END;

-- Teste para inserir_evento
BEGIN
    inserir_evento(6, 'Evento Teste', '-23.0000', '-46.0000', TO_DATE('2024-06-05', 'YYYY-MM-DD'), TO_DATE('2024-06-06', 'YYYY-MM-DD'), 'Descri??o do evento teste', 1, 1, 1, 1);
    DBMS_OUTPUT.PUT_LINE('Evento inserido com sucesso.');
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Erro ao inserir evento: ' || SQLERRM);
END;

-- Atualizar Evento
CREATE OR REPLACE PROCEDURE atualizar_evento (
    p_id IN NUMBER,
    p_titulo IN VARCHAR2,
    p_latitude IN VARCHAR2,
    p_longitude IN VARCHAR2,
    p_data_inicio IN DATE,
    p_data_fim IN DATE,
    p_descricao IN VARCHAR2,
    p_urgencia IN NUMBER,
    p_id_organizador IN NUMBER,
    p_id_tipo IN NUMBER,
    p_id_status IN NUMBER
) IS
BEGIN
    UPDATE Evento
    SET titulo = p_titulo,
        latitude = p_latitude,
        longitude = p_longitude,
        data_inicio = p_data_inicio,
        data_fim = p_data_fim,
        descricao = p_descricao,
        urgencia = p_urgencia,
        id_organizador = p_id_organizador,
        id_tipo = p_id_tipo,
        id_status = p_id_status
    WHERE id = p_id;
    
    COMMIT;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(-20003, 'Erro: Evento n?o encontrado.');
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
END;

-- Teste para atualizar_evento
BEGIN
    atualizar_evento(6, 'Evento Teste Atualizado', '-23.1111', '-46.1111', TO_DATE('2024-06-07', 'YYYY-MM-DD'), TO_DATE('2024-06-08', 'YYYY-MM-DD'), 'Descri??o atualizada do evento teste', 2, 2, 2, 2);
    DBMS_OUTPUT.PUT_LINE('Evento atualizado com sucesso.');
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Erro ao atualizar evento: ' || SQLERRM);
END;

-- Deletar Evento
CREATE OR REPLACE PROCEDURE deletar_evento (
    p_id IN NUMBER
) IS
BEGIN
    DELETE FROM Evento WHERE id = p_id;
    
    COMMIT;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(-20003, 'Erro: Evento n?o encontrado.');
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
END;

-- Teste para deletar_evento
BEGIN
    deletar_evento(6);
    DBMS_OUTPUT.PUT_LINE('Evento deletado com sucesso.');
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Erro ao deletar evento: ' || SQLERRM);
END;

-- Procedures da tabela Momento
-- Inserir Momento
CREATE OR REPLACE PROCEDURE inserir_momento (
    p_id IN NUMBER,
    p_nome IN VARCHAR2
) IS
BEGIN
    INSERT INTO Momento (id, nome)
    VALUES (p_id, p_nome);
    
    COMMIT;
EXCEPTION
    WHEN DUP_VAL_ON_INDEX THEN
        RAISE_APPLICATION_ERROR(-20001, 'Erro: Momento j? cadastrado.');
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
END;

-- Teste para inserir_momento
BEGIN
    inserir_momento(4, 'Depois - Teste');
    DBMS_OUTPUT.PUT_LINE('Momento inserido com sucesso.');
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Erro ao inserir momento: ' || SQLERRM);
END;

-- Atualizar Momento
CREATE OR REPLACE PROCEDURE atualizar_momento (
    p_id IN NUMBER,
    p_nome IN VARCHAR2
) IS
BEGIN
    UPDATE Momento
    SET nome = p_nome
    WHERE id = p_id;
    
    COMMIT;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(-20003, 'Erro: Momento n?o encontrado.');
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
END;

-- Teste para atualizar_momento
BEGIN
    atualizar_momento(4, 'Depois - Atualizado');
    DBMS_OUTPUT.PUT_LINE('Momento atualizado com sucesso.');
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Erro ao atualizar momento: ' || SQLERRM);
END;

-- Deletar Momento
CREATE OR REPLACE PROCEDURE deletar_momento (
    p_id IN NUMBER
) IS
BEGIN
    DELETE FROM Momento WHERE id = p_id;
    
    COMMIT;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(-20003, 'Erro: Momento n?o encontrado.');
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
END;

-- Teste para deletar_momento
BEGIN
    deletar_momento(4);
    DBMS_OUTPUT.PUT_LINE('Momento deletado com sucesso.');
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Erro ao deletar momento: ' || SQLERRM);
END;

-- Procedures da tabela Imagem
-- Inserir Imagem
CREATE OR REPLACE PROCEDURE inserir_imagem (
    p_id IN NUMBER,
    p_id_evento IN NUMBER,
    p_id_momento IN NUMBER,
    p_url_imagem IN VARCHAR2
) IS
BEGIN
    INSERT INTO Imagem (id, id_evento, id_momento, url_imagem)
    VALUES (p_id, p_id_evento, p_id_momento, p_url_imagem);
    
    COMMIT;
EXCEPTION
    WHEN DUP_VAL_ON_INDEX THEN
        RAISE_APPLICATION_ERROR(-20001, 'Erro: Imagem j? cadastrada.');
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
END;

-- Teste para inserir_imagem
BEGIN
    inserir_imagem(6, 1, 1, 'http://example.com/image6.jpg');
    DBMS_OUTPUT.PUT_LINE('Imagem inserida com sucesso.');
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Erro ao inserir imagem: ' || SQLERRM);
END;

-- Atualizar Imagem
CREATE OR REPLACE PROCEDURE atualizar_imagem (
    p_id IN NUMBER,
    p_id_evento IN NUMBER,
    p_id_momento IN NUMBER,
    p_url_imagem IN VARCHAR2
) IS
BEGIN
    UPDATE Imagem
    SET id_evento = p_id_evento,
        id_momento = p_id_momento,
        url_imagem = p_url_imagem
    WHERE id = p_id;
    
    COMMIT;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(-20003, 'Erro: Imagem n?o encontrada.');
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
END;

-- Teste para atualizar_imagem
BEGIN
    atualizar_imagem(6, 1, 2, 'http://example.com/image6_updated.jpg');
    DBMS_OUTPUT.PUT_LINE('Imagem atualizada com sucesso.');
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Erro ao atualizar imagem: ' || SQLERRM);
END;

-- Deletar Imagem
CREATE OR REPLACE PROCEDURE deletar_imagem (
    p_id IN NUMBER
) IS
BEGIN
    DELETE FROM Imagem WHERE id = p_id;
    
    COMMIT;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(-20003, 'Erro: Imagem n?o encontrada.');
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
END;

-- Teste para deletar_imagem
BEGIN
    deletar_imagem(6);
    DBMS_OUTPUT.PUT_LINE('Imagem deletada com sucesso.');
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Erro ao deletar imagem: ' || SQLERRM);
END;

-- Procedures da tabela Avaliacao
-- Inserir Avaliacao
CREATE OR REPLACE PROCEDURE inserir_avaliacao (
    p_id IN NUMBER,
    p_id_evento IN NUMBER,
    p_id_avaliador IN NUMBER,
    p_nota IN NUMBER
) IS
BEGIN
    INSERT INTO Avaliacao (id, id_evento, id_avaliador, nota)
    VALUES (p_id, p_id_evento, p_id_avaliador, p_nota);
    
    COMMIT;
EXCEPTION
    WHEN DUP_VAL_ON_INDEX THEN
        RAISE_APPLICATION_ERROR(-20001, 'Erro: Avalia??o j? cadastrada.');
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
END;

-- Teste para inserir_avaliacao
BEGIN
    inserir_avaliacao(6, 1, 1, 4);
    DBMS_OUTPUT.PUT_LINE('Avalia??o inserida com sucesso.');
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Erro ao inserir avalia??o: ' || SQLERRM);
END;

-- Atualizar Avaliacao
CREATE OR REPLACE PROCEDURE atualizar_avaliacao (
    p_id IN NUMBER,
    p_id_evento IN NUMBER,
    p_id_avaliador IN NUMBER,
    p_nota IN NUMBER
) IS
BEGIN
    UPDATE Avaliacao
    SET id_evento = p_id_evento,
        id_avaliador = p_id_avaliador,
        nota = p_nota
    WHERE id = p_id;
    
    COMMIT;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(-20003, 'Erro: Avalia??o n?o encontrada.');
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
END;

-- Teste para atualizar_avaliacao
BEGIN
    atualizar_avaliacao(6, 1, 1, 5);
    DBMS_OUTPUT.PUT_LINE('Avalia??o atualizada com sucesso.');
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Erro ao atualizar avalia??o: ' || SQLERRM);
END;

-- Deletar Avaliacao
CREATE OR REPLACE PROCEDURE deletar_avaliacao (
    p_id IN NUMBER
) IS
BEGIN
    DELETE FROM Avaliacao WHERE id = p_id;
    
    COMMIT;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(-20003, 'Erro: Avalia??o n?o encontrada.');
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
END;

-- Teste para deletar_avaliacao
BEGIN
    deletar_avaliacao(6);
    DBMS_OUTPUT.PUT_LINE('Avalia??o deletada com sucesso.');
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Erro ao deletar avalia??o: ' || SQLERRM);
END;

-- Procedures da tabela Usuario_Evento
-- Inserir Usuario_Evento
CREATE OR REPLACE PROCEDURE inserir_usuario_evento (
    p_id_usuario IN NUMBER,
    p_id_evento IN NUMBER
) IS
BEGIN
    INSERT INTO Usuario_Evento (id_usuario, id_evento)
    VALUES (p_id_usuario, p_id_evento);
    
    COMMIT;
EXCEPTION
    WHEN DUP_VAL_ON_INDEX THEN
        RAISE_APPLICATION_ERROR(-20001, 'Erro: Associa??o usu?rio-evento j? cadastrada.');
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
END;

-- Teste para inserir_usuario_evento
BEGIN
    inserir_usuario_evento(1, 5);
    DBMS_OUTPUT.PUT_LINE('Associacao usuario-evento inserida com sucesso.');
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Erro ao inserir associacao usuario-evento: ' || SQLERRM);
END;

-- Atualizar Usuario_Evento
CREATE OR REPLACE PROCEDURE atualizar_usuario_evento (
    p_id_usuario IN NUMBER,
    p_id_evento IN NUMBER,
    p_novo_id_evento IN NUMBER
) IS
BEGIN
    UPDATE Usuario_Evento 
    SET id_evento = p_novo_id_evento
    WHERE id_usuario = p_id_usuario AND id_evento = p_id_evento;

    IF SQL%ROWCOUNT = 0 THEN
        RAISE_APPLICATION_ERROR(-20003, 'Erro: Associacao usuario-evento nao encontrada.');
    END IF;
    
    COMMIT;
EXCEPTION
    WHEN DUP_VAL_ON_INDEX THEN
        RAISE_APPLICATION_ERROR(-20001, 'Erro: Associacao usuario-evento ja cadastrada.');
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
END;

-- Teste para atualizar_usuario_evento
BEGIN
    atualizar_usuario_evento(1, 5, 3);
    DBMS_OUTPUT.PUT_LINE('Associacao usuario-evento atualizada com sucesso.');
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Erro ao atualizar associacao usuario-evento: ' || SQLERRM);
END;

-- Deletar Usuario_Evento
CREATE OR REPLACE PROCEDURE deletar_usuario_evento (
    p_id_usuario IN NUMBER,
    p_id_evento IN NUMBER
) IS
BEGIN
    DELETE FROM Usuario_Evento WHERE id_usuario = p_id_usuario AND id_evento = p_id_evento;
    
    COMMIT;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(-20003, 'Erro: Associacao usuario-evento nao encontrada.');
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
END;

-- Teste para deletar_usuario_evento
BEGIN
    deletar_usuario_evento(1, 6);
    DBMS_OUTPUT.PUT_LINE('Associacao usuario-evento deletada com sucesso.');
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Erro ao deletar associacao usuario-evento: ' || SQLERRM);
END;

--- Relatorios
SET SERVEROUTPUT ON;

-- Relatorio de Participacao de Usuarios em Eventos
CREATE OR REPLACE PROCEDURE relatorio_participacao_usuarios
IS
BEGIN
    DBMS_OUTPUT.PUT_LINE('Relat?rio de Participa??o de Usu?rios em Eventos');
    DBMS_OUTPUT.PUT_LINE('============================================');
    FOR rec IN (SELECT u.nome AS usuario_nome, e.titulo AS evento_titulo, a.nota AS avaliacao
                FROM usuario u
                JOIN usuario_evento ue ON u.id = ue.id_usuario
                JOIN evento e ON ue.id_evento = e.id
                LEFT JOIN avaliacao a ON e.id = a.id_evento AND a.id_avaliador = u.id
                ORDER BY u.nome, e.titulo)
    LOOP
        DBMS_OUTPUT.PUT_LINE('Usu?rio: ' || rec.usuario_nome || ', Evento: ' || rec.evento_titulo || ', Avalia??o: ' || NVL(TO_CHAR(rec.avaliacao), 'N/A'));
    END LOOP;
END;

-- Teste para a procedure relatorio_participacao_usuarios
BEGIN
    relatorio_participacao_usuarios;
END;

-- Relatorio de Eventos por Status
CREATE OR REPLACE PROCEDURE relatorio_eventos_por_status
IS
BEGIN
    DBMS_OUTPUT.PUT_LINE('Relat?rio de Eventos por Status');
    DBMS_OUTPUT.PUT_LINE('===============================');
    FOR rec IN (SELECT e.titulo AS evento_titulo, s.nome AS status_nome, u.nome AS organizador_nome, e.data_inicio, e.data_fim, e.descricao, e.urgencia
                FROM evento e
                JOIN status s ON e.id_status = s.id
                LEFT JOIN usuario u ON e.id_organizador = u.id
                ORDER BY s.nome, e.titulo)
    LOOP
        DBMS_OUTPUT.PUT_LINE('Evento: ' || rec.evento_titulo || ', Status: ' || rec.status_nome || ', Organizador: ' || NVL(rec.organizador_nome, 'N/A') || 
                             ', Data In?cio: ' || NVL(TO_CHAR(rec.data_inicio, 'YYYY-MM-DD HH24:MI'), 'N/A') || ', Data Fim: ' || NVL(TO_CHAR(rec.data_fim, 'YYYY-MM-DD HH24:MI'), 'N/A') || 
                             ', Descri??o: ' || NVL(rec.descricao, 'N/A') || ', Urg?ncia: ' || rec.urgencia);
    END LOOP;
END;

-- Teste para a procedure relatorio_eventos_por_status
BEGIN
    relatorio_eventos_por_status;
END;

--- Triggers
SET SERVEROUTPUT ON;

-- Criando tabela para registro de auditoria
CREATE TABLE auditoria (
    id NUMBER(9) CONSTRAINT pk_id_auditoria PRIMARY KEY,
    tabela VARCHAR2(255) NOT NULL,
    operacao VARCHAR2(50) NOT NULL,
    usuario VARCHAR2(255) NOT NULL,
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    dados_anteriores CLOB,
    dados_posteriores CLOB
);

CREATE SEQUENCE sq_auditoria START WITH 1 INCREMENT BY 1;

-- Trigger para a tabela usuario
CREATE OR REPLACE TRIGGER trg_auditoria_usuario
AFTER INSERT OR UPDATE OR DELETE
ON usuario
FOR EACH ROW
DECLARE
    v_operacao VARCHAR2(10);
    v_dados_anteriores CLOB;
    v_dados_posteriores CLOB;
BEGIN
    IF INSERTING THEN
        v_operacao := 'INSERT';
        v_dados_posteriores := 'ID: ' || :NEW.id || ', CPF: ' || :NEW.cpf || ', Nome: ' || :NEW.nome || ', URL Imagem: ' || :NEW.url_imagem || ', Email: ' || :NEW.email || ', Senha: ' || :NEW.senha;
    ELSIF UPDATING THEN
        v_operacao := 'UPDATE';
        v_dados_anteriores := 'ID: ' || :OLD.id || ', CPF: ' || :OLD.cpf || ', Nome: ' || :OLD.nome || ', URL Imagem: ' || :OLD.url_imagem || ', Email: ' || :OLD.email || ', Senha: ' || :OLD.senha;
        v_dados_posteriores := 'ID: ' || :NEW.id || ', CPF: ' || :NEW.cpf || ', Nome: ' || :NEW.nome || ', URL Imagem: ' || :NEW.url_imagem || ', Email: ' || :NEW.email || ', Senha: ' || :NEW.senha;
    ELSIF DELETING THEN
        v_operacao := 'DELETE';
        v_dados_anteriores := 'ID: ' || :OLD.id || ', CPF: ' || :OLD.cpf || ', Nome: ' || :OLD.nome || ', URL Imagem: ' || :OLD.url_imagem || ', Email: ' || :OLD.email || ', Senha: ' || :OLD.senha;
    END IF;

    INSERT INTO auditoria (id, tabela, operacao, usuario, dados_anteriores, dados_posteriores)
    VALUES (sq_auditoria.NEXTVAL, 'usuario', v_operacao, SYS_CONTEXT('USERENV', 'SESSION_USER'), v_dados_anteriores, v_dados_posteriores);
END;

-- Teste
INSERT INTO usuario (id, cpf, nome, url_imagem, email, senha) 
VALUES (7, '12345698901', 'Isaque Melo', 'http://imagem.com/isaque.jpg', 'isaque.melo@example.com', 'senha123');

SELECT * FROM auditoria WHERE tabela = 'usuario' AND operacao = 'INSERT';


-- Trigger para a tabela evento 
CREATE OR REPLACE TRIGGER trg_auditoria_evento
AFTER INSERT OR UPDATE OR DELETE
ON evento
FOR EACH ROW
DECLARE
    v_operacao VARCHAR2(10);
    v_dados_anteriores CLOB;
    v_dados_posteriores CLOB;
BEGIN
    IF INSERTING THEN
        v_operacao := 'INSERT';
        v_dados_posteriores := 'ID: ' || :NEW.id || ', Titulo: ' || :NEW.titulo || ', Latitude: ' || :NEW.latitude || ', Longitude: ' || :NEW.longitude || ', Data Inicio: ' || TO_CHAR(:NEW.data_inicio, 'YYYY-MM-DD HH24:MI:SS') || ', Data Fim: ' || TO_CHAR(:NEW.data_fim, 'YYYY-MM-DD HH24:MI:SS') || ', Descricao: ' || :NEW.descricao || ', Urgencia: ' || :NEW.urgencia || ', Organizador: ' || :NEW.id_organizador || ', Tipo: ' || :NEW.id_tipo || ', Status: ' || :NEW.id_status;
    ELSIF UPDATING THEN
        v_operacao := 'UPDATE';
        v_dados_anteriores := 'ID: ' || :OLD.id || ', Titulo: ' || :OLD.titulo || ', Latitude: ' || :OLD.latitude || ', Longitude: ' || :OLD.longitude || ', Data Inicio: ' || TO_CHAR(:OLD.data_inicio, 'YYYY-MM-DD HH24:MI:SS') || ', Data Fim: ' || TO_CHAR(:OLD.data_fim, 'YYYY-MM-DD HH24:MI:SS') || ', Descricao: ' || :OLD.descricao || ', Urgencia: ' || :OLD.urgencia || ', Organizador: ' || :OLD.id_organizador || ', Tipo: ' || :OLD.id_tipo || ', Status: ' || :OLD.id_status;
        v_dados_posteriores := 'ID: ' || :NEW.id || ', Titulo: ' || :NEW.titulo || ', Latitude: ' || :NEW.latitude || ', Longitude: ' || :NEW.longitude || ', Data Inicio: ' || TO_CHAR(:NEW.data_inicio, 'YYYY-MM-DD HH24:MI:SS') || ', Data Fim: ' || TO_CHAR(:NEW.data_fim, 'YYYY-MM-DD HH24:MI:SS') || ', Descricao: ' || :NEW.descricao || ', Urgencia: ' || :NEW.urgencia || ', Organizador: ' || :NEW.id_organizador || ', Tipo: ' || :NEW.id_tipo || ', Status: ' || :NEW.id_status;
    ELSIF DELETING THEN
        v_operacao := 'DELETE';
        v_dados_anteriores := 'ID: ' || :OLD.id || ', Titulo: ' || :OLD.titulo || ', Latitude: ' || :OLD.latitude || ', Longitude: ' || :OLD.longitude || ', Data Inicio: ' || TO_CHAR(:OLD.data_inicio, 'YYYY-MM-DD HH24:MI:SS') || ', Data Fim: ' || TO_CHAR(:OLD.data_fim, 'YYYY-MM-DD HH24:MI:SS') || ', Descricao: ' || :OLD.descricao || ', Urgencia: ' || :OLD.urgencia || ', Organizador: ' || :OLD.id_organizador || ', Tipo: ' || :OLD.id_tipo || ', Status: ' || :OLD.id_status;
    END IF;

    -- Inserir o log na tabela de auditoria
    INSERT INTO auditoria (id, tabela, operacao, usuario, dados_anteriores, dados_posteriores)
    VALUES (sq_auditoria.NEXTVAL, 'evento', v_operacao, SYS_CONTEXT('USERENV', 'SESSION_USER'), v_dados_anteriores, v_dados_posteriores);
END;

-- Teste
INSERT INTO evento (id, titulo, latitude, longitude, data_inicio, data_fim, descricao, urgencia, id_organizador, id_tipo, id_status)
VALUES (7, 'Evento de Teste para Trigger', '-23.5505', '-46.6333', TO_TIMESTAMP('2024-08-15 09:00', 'YYYY-MM-DD HH24:MI'), TO_TIMESTAMP('2024-08-15 17:00', 'YYYY-MM-DD HH24:MI'), 'Teste de inser??o de evento', 1, 1, 1, 1);

SELECT * FROM auditoria WHERE tabela = 'evento' AND operacao = 'INSERT';

--- Packages

-- Declaracao das procedures
CREATE OR REPLACE PACKAGE pacote_usuario AS

    -- Procedures da tabela Usuario
    PROCEDURE inserir_usuario(
        p_id IN NUMBER,
        p_cpf IN CHAR,
        p_nome IN VARCHAR2,
        p_url_imagem IN VARCHAR2,
        p_email IN VARCHAR2,
        p_senha IN VARCHAR2
    );

    PROCEDURE atualizar_usuario(
        p_id IN NUMBER,
        p_cpf IN CHAR,
        p_nome IN VARCHAR2,
        p_url_imagem IN VARCHAR2,
        p_email IN VARCHAR2,
        p_senha IN VARCHAR2
    );

    PROCEDURE deletar_usuario(
        p_id IN NUMBER
    );

    -- Procedures da tabela Tipo_Evento
    PROCEDURE inserir_tipo_evento(
        p_id IN NUMBER,
        p_nome IN VARCHAR2
    );

    PROCEDURE atualizar_tipo_evento(
        p_id IN NUMBER,
        p_nome IN VARCHAR2
    );

    PROCEDURE deletar_tipo_evento(
        p_id IN NUMBER
    );

    -- Procedures da tabela Status
    PROCEDURE inserir_status(
        p_id IN NUMBER,
        p_nome IN VARCHAR2
    );

    PROCEDURE atualizar_status(
        p_id IN NUMBER,
        p_nome IN VARCHAR2
    );

    PROCEDURE deletar_status(
        p_id IN NUMBER
    );

    -- Procedures da tabela Evento
    PROCEDURE inserir_evento(
        p_id IN NUMBER,
        p_titulo IN VARCHAR2,
        p_latitude IN VARCHAR2,
        p_longitude IN VARCHAR2,
        p_data_inicio IN DATE,
        p_data_fim IN DATE,
        p_descricao IN VARCHAR2,
        p_urgencia IN NUMBER,
        p_id_organizador IN NUMBER,
        p_id_tipo IN NUMBER,
        p_id_status IN NUMBER
    );

    PROCEDURE atualizar_evento(
        p_id IN NUMBER,
        p_titulo IN VARCHAR2,
        p_latitude IN VARCHAR2,
        p_longitude IN VARCHAR2,
        p_data_inicio IN DATE,
        p_data_fim IN DATE,
        p_descricao IN VARCHAR2,
        p_urgencia IN NUMBER,
        p_id_organizador IN NUMBER,
        p_id_tipo IN NUMBER,
        p_id_status IN NUMBER
    );

    PROCEDURE deletar_evento(
        p_id IN NUMBER
    );

    -- Procedures da tabela Momento
    PROCEDURE inserir_momento(
        p_id IN NUMBER,
        p_nome IN VARCHAR2
    );

    PROCEDURE atualizar_momento(
        p_id IN NUMBER,
        p_nome IN VARCHAR2
    );

    PROCEDURE deletar_momento(
        p_id IN NUMBER
    );

    -- Procedures da tabela Imagem
    PROCEDURE inserir_imagem(
        p_id IN NUMBER,
        p_id_evento IN NUMBER,
        p_id_momento IN NUMBER,
        p_url_imagem IN VARCHAR2
    );

    PROCEDURE atualizar_imagem(
        p_id IN NUMBER,
        p_id_evento IN NUMBER,
        p_id_momento IN NUMBER,
        p_url_imagem IN VARCHAR2
    );

    PROCEDURE deletar_imagem(
        p_id IN NUMBER
    );

    -- Procedures da tabela Avaliacao
    PROCEDURE inserir_avaliacao(
        p_id IN NUMBER,
        p_id_evento IN NUMBER,
        p_id_avaliador IN NUMBER,
        p_nota IN NUMBER
    );

    PROCEDURE atualizar_avaliacao(
        p_id IN NUMBER,
        p_id_evento IN NUMBER,
        p_id_avaliador IN NUMBER,
        p_nota IN NUMBER
    );

    PROCEDURE deletar_avaliacao(
        p_id IN NUMBER
    );

    -- Procedures da tabela Usuario_Evento
    PROCEDURE inserir_usuario_evento(
        p_id_usuario IN NUMBER,
        p_id_evento IN NUMBER
    );
    
    PROCEDURE atualizar_usuario_evento(
        p_id_usuario IN NUMBER,
        p_id_evento IN NUMBER,
        p_novo_id_evento IN NUMBER
    );

    PROCEDURE deletar_usuario_evento(
        p_id_usuario IN NUMBER,
        p_id_evento IN NUMBER
    );

    -- Relatorios
    PROCEDURE relatorio_participacao_usuarios;
    PROCEDURE relatorio_eventos_por_status;

END pacote_usuario;

-- Package body
CREATE OR REPLACE PACKAGE BODY pacote_usuario AS

    -- Implementacao das Procedures da tabela Usuario
    PROCEDURE inserir_usuario(
        p_id IN NUMBER,
        p_cpf IN CHAR,
        p_nome IN VARCHAR2,
        p_url_imagem IN VARCHAR2,
        p_email IN VARCHAR2,
        p_senha IN VARCHAR2
    ) IS
    BEGIN
        INSERT INTO Usuario (id, cpf, nome, url_imagem, email, senha)
        VALUES (p_id, p_cpf, p_nome, p_url_imagem, p_email, p_senha);
        
        COMMIT;
    EXCEPTION
        WHEN DUP_VAL_ON_INDEX THEN
            RAISE_APPLICATION_ERROR(-20001, 'Erro: CPF ou email j? cadastrados.');
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
    END inserir_usuario;

    PROCEDURE atualizar_usuario(
        p_id IN NUMBER,
        p_cpf IN CHAR,
        p_nome IN VARCHAR2,
        p_url_imagem IN VARCHAR2,
        p_email IN VARCHAR2,
        p_senha IN VARCHAR2
    ) IS
    BEGIN
        UPDATE Usuario
        SET cpf = p_cpf,
            nome = p_nome,
            url_imagem = p_url_imagem,
            email = p_email,
            senha = p_senha
        WHERE id = p_id;
        
        COMMIT;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE_APPLICATION_ERROR(-20003, 'Erro: Usu?rio n?o encontrado.');
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
    END atualizar_usuario;

    PROCEDURE deletar_usuario(
        p_id IN NUMBER
    ) IS
    BEGIN
        DELETE FROM Usuario WHERE id = p_id;
        
        COMMIT;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE_APPLICATION_ERROR(-20003, 'Erro: Usu?rio n?o encontrado.');
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
    END deletar_usuario;

    -- Implementa??o das Procedures da tabela Tipo_Evento
    PROCEDURE inserir_tipo_evento(
        p_id IN NUMBER,
        p_nome IN VARCHAR2
    ) IS
    BEGIN
        INSERT INTO Tipo_Evento (id, nome)
        VALUES (p_id, p_nome);
        
        COMMIT;
    EXCEPTION
        WHEN DUP_VAL_ON_INDEX THEN
            RAISE_APPLICATION_ERROR(-20001, 'Erro: Tipo de evento j? cadastrado.');
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
    END inserir_tipo_evento;

    PROCEDURE atualizar_tipo_evento(
        p_id IN NUMBER,
        p_nome IN VARCHAR2
    ) IS
    BEGIN
        UPDATE Tipo_Evento
        SET nome = p_nome
        WHERE id = p_id;
        
        COMMIT;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE_APPLICATION_ERROR(-20003, 'Erro: Tipo de evento n?o encontrado.');
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
    END atualizar_tipo_evento;

    PROCEDURE deletar_tipo_evento(
        p_id IN NUMBER
    ) IS
    BEGIN
        DELETE FROM Tipo_Evento WHERE id = p_id;
        
        COMMIT;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE_APPLICATION_ERROR(-20003, 'Erro: Tipo de evento n?o encontrado.');
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
    END deletar_tipo_evento;

    -- Implementa??o das Procedures da tabela Status
    PROCEDURE inserir_status(
        p_id IN NUMBER,
        p_nome IN VARCHAR2
    ) IS
    BEGIN
        INSERT INTO Status (id, nome)
        VALUES (p_id, p_nome);
        
        COMMIT;
    EXCEPTION
        WHEN DUP_VAL_ON_INDEX THEN
            RAISE_APPLICATION_ERROR(-20001, 'Erro: Status j? cadastrado.');
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
    END inserir_status;

    PROCEDURE atualizar_status(
        p_id IN NUMBER,
        p_nome IN VARCHAR2
    ) IS
    BEGIN
        UPDATE Status
        SET nome = p_nome
        WHERE id = p_id;
        
        COMMIT;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE_APPLICATION_ERROR(-20003, 'Erro: Status n?o encontrado.');
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
    END atualizar_status;

    PROCEDURE deletar_status(
        p_id IN NUMBER
    ) IS
    BEGIN
        DELETE FROM Status WHERE id = p_id;
        
        COMMIT;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE_APPLICATION_ERROR(-20003, 'Erro: Status n?o encontrado.');
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
    END deletar_status;

    -- Implementa??o das Procedures da tabela Evento
    PROCEDURE inserir_evento(
        p_id IN NUMBER,
        p_titulo IN VARCHAR2,
        p_latitude IN VARCHAR2,
        p_longitude IN VARCHAR2,
        p_data_inicio IN DATE,
        p_data_fim IN DATE,
        p_descricao IN VARCHAR2,
        p_urgencia IN NUMBER,
        p_id_organizador IN NUMBER,
        p_id_tipo IN NUMBER,
        p_id_status IN NUMBER
    ) IS
    BEGIN
        INSERT INTO Evento (id, titulo, latitude, longitude, data_inicio, data_fim, descricao, urgencia, id_organizador, id_tipo, id_status)
        VALUES (p_id, p_titulo, p_latitude, p_longitude, p_data_inicio, p_data_fim, p_descricao, p_urgencia, p_id_organizador, p_id_tipo, p_id_status);
        
        COMMIT;
    EXCEPTION
        WHEN DUP_VAL_ON_INDEX THEN
            RAISE_APPLICATION_ERROR(-20001, 'Erro: Evento j? cadastrado.');
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
    END inserir_evento;

    PROCEDURE atualizar_evento(
        p_id IN NUMBER,
        p_titulo IN VARCHAR2,
        p_latitude IN VARCHAR2,
        p_longitude IN VARCHAR2,
        p_data_inicio IN DATE,
        p_data_fim IN DATE,
        p_descricao IN VARCHAR2,
        p_urgencia IN NUMBER,
        p_id_organizador IN NUMBER,
        p_id_tipo IN NUMBER,
        p_id_status IN NUMBER
    ) IS
    BEGIN
        UPDATE Evento
        SET titulo = p_titulo,
            latitude = p_latitude,
            longitude = p_longitude,
            data_inicio = p_data_inicio,
            data_fim = p_data_fim,
            descricao = p_descricao,
            urgencia = p_urgencia,
            id_organizador = p_id_organizador,
            id_tipo = p_id_tipo,
            id_status = p_id_status
        WHERE id = p_id;
        
        COMMIT;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE_APPLICATION_ERROR(-20003, 'Erro: Evento n?o encontrado.');
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
    END atualizar_evento;

    PROCEDURE deletar_evento(
        p_id IN NUMBER
    ) IS
    BEGIN
        DELETE FROM Evento WHERE id = p_id;
        
        COMMIT;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE_APPLICATION_ERROR(-20003, 'Erro: Evento n?o encontrado.');
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
    END deletar_evento;

    -- Implementa??o das Procedures da tabela Momento
    PROCEDURE inserir_momento(
        p_id IN NUMBER,
        p_nome IN VARCHAR2
    ) IS
    BEGIN
        INSERT INTO Momento (id, nome)
        VALUES (p_id, p_nome);
        
        COMMIT;
    EXCEPTION
        WHEN DUP_VAL_ON_INDEX THEN
            RAISE_APPLICATION_ERROR(-20001, 'Erro: Momento j? cadastrado.');
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
    END inserir_momento;

    PROCEDURE atualizar_momento(
        p_id IN NUMBER,
        p_nome IN VARCHAR2
    ) IS
    BEGIN
        UPDATE Momento
        SET nome = p_nome
        WHERE id = p_id;
        
        COMMIT;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE_APPLICATION_ERROR(-20003, 'Erro: Momento n?o encontrado.');
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
    END atualizar_momento;

    PROCEDURE deletar_momento(
        p_id IN NUMBER
    ) IS
    BEGIN
        DELETE FROM Momento WHERE id = p_id;
        
        COMMIT;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE_APPLICATION_ERROR(-20003, 'Erro: Momento n?o encontrado.');
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
    END deletar_momento;

    -- Implementa??o das Procedures da tabela Imagem
    PROCEDURE inserir_imagem(
        p_id IN NUMBER,
        p_id_evento IN NUMBER,
        p_id_momento IN NUMBER,
        p_url_imagem IN VARCHAR2
    ) IS
    BEGIN
        INSERT INTO Imagem (id, id_evento, id_momento, url_imagem)
        VALUES (p_id, p_id_evento, p_id_momento, p_url_imagem);
        
        COMMIT;
    EXCEPTION
        WHEN DUP_VAL_ON_INDEX THEN
            RAISE_APPLICATION_ERROR(-20001, 'Erro: Imagem j? cadastrada.');
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
    END inserir_imagem;

    PROCEDURE atualizar_imagem(
        p_id IN NUMBER,
        p_id_evento IN NUMBER,
        p_id_momento IN NUMBER,
        p_url_imagem IN VARCHAR2
    ) IS
    BEGIN
        UPDATE Imagem
        SET id_evento = p_id_evento,
            id_momento = p_id_momento,
            url_imagem = p_url_imagem
        WHERE id = p_id;
        
        COMMIT;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE_APPLICATION_ERROR(-20003, 'Erro: Imagem n?o encontrada.');
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
    END atualizar_imagem;

    PROCEDURE deletar_imagem(
        p_id IN NUMBER
    ) IS
    BEGIN
        DELETE FROM Imagem WHERE id = p_id;
        
        COMMIT;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE_APPLICATION_ERROR(-20003, 'Erro: Imagem n?o encontrada.');
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
    END deletar_imagem;

    -- Implementa??o das Procedures da tabela Avaliacao
    PROCEDURE inserir_avaliacao(
        p_id IN NUMBER,
        p_id_evento IN NUMBER,
        p_id_avaliador IN NUMBER,
        p_nota IN NUMBER
    ) IS
    BEGIN
        INSERT INTO Avaliacao (id, id_evento, id_avaliador, nota)
        VALUES (p_id, p_id_evento, p_id_avaliador, p_nota);
        
        COMMIT;
    EXCEPTION
        WHEN DUP_VAL_ON_INDEX THEN
            RAISE_APPLICATION_ERROR(-20001, 'Erro: Avalia??o j? cadastrada.');
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
    END inserir_avaliacao;

    PROCEDURE atualizar_avaliacao(
        p_id IN NUMBER,
        p_id_evento IN NUMBER,
        p_id_avaliador IN NUMBER,
        p_nota IN NUMBER
    ) IS
    BEGIN
        UPDATE Avaliacao
        SET id_evento = p_id_evento,
            id_avaliador = p_id_avaliador,
            nota = p_nota
        WHERE id = p_id;
        
        COMMIT;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE_APPLICATION_ERROR(-20003, 'Erro: Avalia??o n?o encontrada.');
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
    END atualizar_avaliacao;

    PROCEDURE deletar_avaliacao(
        p_id IN NUMBER
    ) IS
    BEGIN
        DELETE FROM Avaliacao WHERE id = p_id;
        
        COMMIT;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE_APPLICATION_ERROR(-20003, 'Erro: Avalia??o n?o encontrada.');
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
    END deletar_avaliacao;

    -- Implementa??o das Procedures da tabela Usuario_Evento
    PROCEDURE inserir_usuario_evento(
        p_id_usuario IN NUMBER,
        p_id_evento IN NUMBER
    ) IS
    BEGIN
        INSERT INTO Usuario_Evento (id_usuario, id_evento)
        VALUES (p_id_usuario, p_id_evento);
        
        COMMIT;
    EXCEPTION
        WHEN DUP_VAL_ON_INDEX THEN
            RAISE_APPLICATION_ERROR(-20001, 'Erro: Associa??o usu?rio-evento j? cadastrada.');
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
    END inserir_usuario_evento;
    
    PROCEDURE atualizar_usuario_evento(
        p_id_usuario IN NUMBER,
        p_id_evento IN NUMBER,
        p_novo_id_evento IN NUMBER
    ) IS
    BEGIN
        UPDATE Usuario_Evento 
        SET id_evento = p_novo_id_evento
        WHERE id_usuario = p_id_usuario AND id_evento = p_id_evento;

        IF SQL%ROWCOUNT = 0 THEN
            RAISE_APPLICATION_ERROR(-20003, 'Erro: Associação usuário-evento não encontrada.');
        END IF;
        
        COMMIT;
    EXCEPTION
        WHEN DUP_VAL_ON_INDEX THEN
            RAISE_APPLICATION_ERROR(-20001, 'Erro: Associação usuário-evento já cadastrada.');
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
    END atualizar_usuario_evento;

    PROCEDURE deletar_usuario_evento(
        p_id_usuario IN NUMBER,
        p_id_evento IN NUMBER
    ) IS
    BEGIN
        DELETE FROM Usuario_Evento WHERE id_usuario = p_id_usuario AND id_evento = p_id_evento;
        
        COMMIT;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE_APPLICATION_ERROR(-20003, 'Erro: Associa??o usu?rio-evento n?o encontrada.');
        WHEN OTHERS THEN
            RAISE_APPLICATION_ERROR(-20002, 'Erro: ' || SQLERRM);
    END deletar_usuario_evento;

    -- Implementa??o dos Relat?rios
    PROCEDURE relatorio_participacao_usuarios IS
    BEGIN
        DBMS_OUTPUT.PUT_LINE('Relat?rio de Participa??o de Usu?rios em Eventos');
        DBMS_OUTPUT.PUT_LINE('============================================');
        FOR rec IN (SELECT u.nome AS usuario_nome, e.titulo AS evento_titulo, a.nota AS avaliacao
                    FROM usuario u
                    JOIN usuario_evento ue ON u.id = ue.id_usuario
                    JOIN evento e ON ue.id_evento = e.id
                    LEFT JOIN avaliacao a ON e.id = a.id_evento AND a.id_avaliador = u.id
                    ORDER BY u.nome, e.titulo)
        LOOP
            DBMS_OUTPUT.PUT_LINE('Usu?rio: ' || rec.usuario_nome || ', Evento: ' || rec.evento_titulo || ', Avalia??o: ' || NVL(TO_CHAR(rec.avaliacao), 'N/A'));
        END LOOP;
    END relatorio_participacao_usuarios;

    PROCEDURE relatorio_eventos_por_status IS
    BEGIN
        DBMS_OUTPUT.PUT_LINE('Relat?rio de Eventos por Status');
        DBMS_OUTPUT.PUT_LINE('===============================');
        FOR rec IN (SELECT e.titulo AS evento_titulo, s.nome AS status_nome, u.nome AS organizador_nome, e.data_inicio, e.data_fim, e.descricao, e.urgencia
                    FROM evento e
                    JOIN status s ON e.id_status = s.id
                    LEFT JOIN usuario u ON e.id_organizador = u.id
                    ORDER BY s.nome, e.titulo)
        LOOP
            DBMS_OUTPUT.PUT_LINE('Evento: ' || rec.evento_titulo || ', Status: ' || rec.status_nome || ', Organizador: ' || NVL(rec.organizador_nome, 'N/A') || 
                                 ', Data In?cio: ' || NVL(TO_CHAR(rec.data_inicio, 'YYYY-MM-DD HH24:MI'), 'N/A') || ', Data Fim: ' || NVL(TO_CHAR(rec.data_fim, 'YYYY-MM-DD HH24:MI'), 'N/A') || 
                                 ', Descri??o: ' || NVL(rec.descricao, 'N/A') || ', Urg?ncia: ' || rec.urgencia);
        END LOOP;
    END relatorio_eventos_por_status;

END pacote_usuario;

-- Teste do package
BEGIN
    pacote_usuario.inserir_usuario(
        p_id => 10,
        p_cpf => '98765432555',
        p_nome => 'Teste Simples',
        p_url_imagem => 'http://example.com/image10.jpg',
        p_email => 'teste.simples123@example.com',
        p_senha => 'senha123'
    );
    DBMS_OUTPUT.PUT_LINE('Usu?rio inserido com sucesso.');

    pacote_usuario.atualizar_usuario(
        p_id => 10,
        p_cpf => '98765432555',
        p_nome => 'Teste Simples Atualizado',
        p_url_imagem => 'http://example.com/image10_updated.jpg',
        p_email => 'teste.simples.atualizado123@example.com',
        p_senha => 'novasenha123'
    );
    DBMS_OUTPUT.PUT_LINE('Usu?rio atualizado com sucesso.');

    pacote_usuario.deletar_usuario(p_id => 6);
    DBMS_OUTPUT.PUT_LINE('Usu?rio deletado com sucesso.');

EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Erro: ' || SQLERRM);
END;

SELECT * FROM usuario;
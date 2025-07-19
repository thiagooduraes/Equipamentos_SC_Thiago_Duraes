# Equipamentos_SC_Thiago_Duraes

Desafio técnico python-react-mysql-docker API

---

## **Objetivo**

* Desenvolver uma API REST para o gerenciamento e monitoramento de máquinas industriais.
* Utilizar Python Flask para o backend
* Desenvolver um frontend com um framework de preferência (opcional)
* Utilizar MySQL, SQLite ou MongoDB como banco de dados

---

## **Configurações do ambiente**

* Python 3.11 (Flask, SQLAlchemy)
* React 19.1.0 (com Material-UI - MUI)
* MySQL 8.0
* Docker
* Postman (testes)

---

## **Funcionalidades**

* **Tipos de Máquina:** Categoriza as máquinas monitoradas pelo sistema.

* **Máquinas:** Representa as máquinas monitoradas pelo sistema, permitindo seu gerenciamento e atualização de status (Ativo ou Inativo).

* **Atualização de Status:** Ao modificar o status de uma máquina, é atualizada a informação de última alteração.

* **Navegação e Interface:** Permite o usuário interagir com o sistema.

* **Testes Automatizados:** Permite o teste das funcionalidades da API de forma mais simples.

---

## **Utilização**

* Para simplificar o uso do sistema, foi utilizado o Docker durante a implementação, sendo necessário que o Docker esteja instalado no ambiente.

* Foi utilizado o Docker na versão 4.43.2. A versão mais recente pode ser obtido através do site:

        https://www.docker.com/products/docker-desktop/

* Após clonar o repositório e certificar de que o docker esteja em execução, basta executar os comando abaixo para inicializar o sistema:

        docker-compose up -d --build

* Foi utilizado o Postman para executar os testes da API. A versão mais recente pode ser obtido através do site:

        https://www.postman.com/downloads/

* Os testes foram exportados para o arquivo TESTES_API_Thiago.postman_collection.json. Para executá-los, use a opção *import* do Postman e siga os passos realizados no vídeo:

        https://youtu.be/F04KDXhrQms

* A interface do sistema pode ser acessada pelo link

        =localhost:3000/

* Para parar a execução do Docker:
    
        docker-compose down

* Caso deseje parar a execução e excluir os contêineres, redes, volumes e imagens associadas ao docker deste projeto, utilize o comando:

        docker-compose down --volumes --rmi all
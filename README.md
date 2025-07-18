# Equipamentos_SC_Thiago_Duraes
Desafio técnico em python-react-mysql-docker para empresa de SC
---

## **Tecnologias Utilizadas**

* **Backend:** Python (Flask, SQLAlchemy)
* **Frontend:** React (com Material-UI - MUI)
* **Banco de Dados:** MySQL 8.0
* **Containerização:** Docker e Docker Compose

---

## **Objetivos**

* Desenvolver um sistema completo para o gerenciamento de máquinas e seus tipos.
* Proporcionar uma interface de usuário intuitiva e responsiva utilizando o Material-UI (MUI).
* Garantir a persistência e integridade dos dados através de um banco de dados MySQL.
* Facilitar a implantação e o desenvolvimento utilizando Docker para isolamento e padronização do ambiente.

---

## **Funcionalidades**

### **Módulo de Máquinas**
A aplicação permite o gerenciamento completo das máquinas, incluindo:
* **Listagem de Máquinas:** Visualização de todos os registros de máquinas.
* **Cadastro de Nova Máquina:** Inserção de novas máquinas no sistema.
* **Edição de Máquina:** Atualização de informações de máquinas existentes.
* **Exclusão de Máquina:** Remoção de registros de máquinas.
* **Controle de Status:** Cada máquina possui um status (ativo/inativo) que pode ser alterado.
* **Registro de Última Alteração:** O sistema registra automaticamente a data e hora da última alteração de status de uma máquina.
* **Associação com Tipos de Máquina:** Cada máquina é associada a um tipo de máquina existente.

### **Módulo de Tipos de Máquina**
Para categorizar as máquinas, o sistema oferece gerenciamento dos tipos:
* **Listagem de Tipos de Máquina:** Visualização de todos os tipos de máquina cadastrados.
* **Cadastro de Novo Tipo:** Inserção de novas categorias de máquinas.
* **Edição de Tipo:** Atualização de descrições de tipos existentes.
* **Exclusão de Tipo:** Remoção de categorias de máquina (respeitando a integridade de máquinas associadas).

### **Navegação e Interface**
* **Página Inicial Genérica:** Uma tela de boas-vindas inicial.
* **Barra de Navegação:** Links claros para as telas de gerenciamento de Máquinas e Tipos de Máquina.
* **Material-UI (MUI):** Utilizado para todos os componentes da interface, garantindo um design moderno e padronizado.

---

## **Requisitos de Ambiente**

Para executar este sistema, você precisará ter os seguintes softwares instalados:

* **Docker:** Recomendado a versão mais recente para Docker Desktop.
    * [Download Docker Desktop](https://www.docker.com/products/docker-desktop/)
* **Git:** Para clonar o repositório.

---

## **Configuração e Utilização**

### **1. Clonar o Repositório**
Abra seu terminal e clone o repositório para o seu ambiente local:
```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd <nome_da_pasta_do_projeto> # Navegue para a pasta raiz do projeto clonado

2. Iniciar o Sistema com Docker Compose
Com o Docker em execução na sua máquina, navegue até o diretório raiz do projeto (onde o arquivo docker-compose.yml está localizado) e execute o comando abaixo para construir as imagens e iniciar todos os serviços (backend, frontend, banco de dados):

Bash

docker compose up -d --build
O comando npm install será executado automaticamente no container frontend na primeira vez, o que pode levar alguns minutos. Tenha paciência.

O script wait_for_it.sh será utilizado para garantir que os serviços estejam prontos antes que as aplicações tentem se conectar a eles.

3. Acessar a Aplicação
Após a inicialização dos serviços, a aplicação web estará acessível em seu navegador através do seguinte endereço:

http://localhost:3000/
4. Parar a Execução do Sistema
Para parar todos os serviços e os containers Docker associados ao projeto:

Bash

docker compose down
5. Limpar o Ambiente (Opcional)
Caso deseje parar a execução, remover os contêineres, redes, volumes (incluindo dados do MySQL) e imagens Docker associadas a este projeto, utilize o comando:

Bash

docker compose down --volumes --rmi all
docker system prune -a --volumes # Confirme com 'y' quando solicitado
Atenção: Este comando apagará os dados do banco de dados e todas as imagens Docker relacionadas. Use com cautela!
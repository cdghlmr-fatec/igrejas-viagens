Para o projeto "Conexão Aparecida" - Sistema de excursões para Aparecida do Norte, aqui está um modelo de documentação dos requisitos com uma estrutura que detalha os principais pontos para referência de desenvolvedores e equipe. 

## Documento de Requisitos do Sistema

### 1. Introdução

Este documento descreve os requisitos para o sistema de excursões "Conexão Aparecida", facilitando a organização e gerenciamento das excursões da paróquia para Aparecida do Norte. O objetivo é centralizar as informações, otimizar o processo de reservas, gerenciar filas de espera e facilitar o embarque dos passageiros.

### 2. Descrição Geral do Sistema

O sistema proporcionará:
- Centralização das informações de viagens e reservas.
- Gestão de listas de espera e controle de ocupação dos ônibus.
- Emissão de ingressos e verificação de presença durante os embarques.
  
O objetivo final é melhorar a organização das excursões, permitindo que a paróquia administre participantes, filas de espera e o embarque de forma prática e eficiente.

### 3. Requisitos Funcionais

**RF001** - Registrar reserva de cliente  
*Descrição*: O sistema permite ao funcionário da paróquia registrar uma reserva de viagem para um cliente.

**RF002** - Inserir cliente em lista de espera  
*Descrição*: Permitir ao funcionário registrar clientes em lista de espera.

**RF003** - Registrar reserva para cliente em lista de espera  
*Descrição*: Permitir ao funcionário registrar uma reserva para um cliente que estava na lista de espera.

**RF004** - Registrar nova viagem  
*Descrição*: Permitir ao administrador criar uma nova viagem, associando ao menos um ônibus e um coordenador.

**RF005** - Registrar presença nos embarques  
*Descrição*: Coordenador verifica presença dos passageiros no embarque.

**RF006** - Manter uma única lista de presença por evento  
*Descrição*: Todos os passageiros confirmados com reservas são registrados em uma lista de presença única, mesmo distribuídos em ônibus diferentes.

**RF008** - Controle de assentos por quantidade e seleção  
*Descrição*: O passageiro pode escolher um assento específico, desde que esteja disponível.

**RF010** - Escolha de ônibus e coordenador na lista de espera  
*Descrição*: Passageiros na lista de espera podem indicar preferência por um ônibus.

**RF011** - Função administrativa para monitoramento e controle  
*Descrição*: A paróquia tem acesso a informações de reservas, pagamentos e pode modificar dados dos usuários.

**RF012** - Confirmação de pagamento  
*Descrição*: Funcionários confirmam pagamentos em dinheiro feitos na unidade.

**RF013** - Passagens geradas após pagamento  
*Descrição*: A emissão de passagens é realizada somente após a confirmação do pagamento.

### 4. Requisitos Não Funcionais

**NF001** - Segurança  
*Descrição*: Mecanismos de autenticação e criptografia de senhas para garantir a segurança.

**NF002** - Conformidade com LGPD  
*Descrição*: O sistema deve respeitar a Lei Geral de Proteção de Dados (LGPD) do Brasil.

**NF003** - Compras múltiplas por conta  
*Descrição*: O sistema permite a compra de vários ingressos com uma única conta.

**NF004** - Confirmação de presença via QR Code  
*Descrição*: A confirmação de embarque pode ser feita via QR Code.

**NF005** - Rastreamento de ônibus  
*Descrição*: O sistema poderá exibir a localização dos ônibus em tempo real.

### 5. Histórias de Usuários e Critérios de Aceitação

**RF004** - Registrar viagem  
*Critérios de Aceitação*:
- A viagem deve ser associada a pelo menos um ônibus e um coordenador.

**RF001** - Registrar reserva  
*Critérios de Aceitação*:
- Solicitar informações como nome completo, data de nascimento, telefone, RG e CPF do cliente.
- Apenas um assento por cliente.
- Não permitir registro sem ônibus e coordenador associados.

**RF002** - Registrar cliente em lista de espera  
*Critérios de Aceitação*:
- Solicitar informações do cliente.
- Não permitir duplicação de registros para o mesmo cliente.

### 6. Controle de Usuários

Tipos de usuários e permissões específicas:
- **Administrador**: Criar viagens, gerenciar reservas e editar dados dos usuários.
- **Secretaria**: Registrar reservas, ver status de ocupação de todos os ônibus, confirmar pagamentos.
- **Coordenador**: Registrar presença no embarque e ver lista de passageiros de seu ônibus.

### 7. Fluxo de Autenticação e Telas

**Login e Registro**  
- Autenticação via token.
- Telas específicas de acordo com o tipo de usuário.

### 8. Controle de Passageiros e Reservas

- **Controle de passageiros**: Secretários e coordenadores podem registrar passageiros.
- **Controle de reserva**: Inclui CRUD de reservas e passagens.

Esse documento será atualizado conforme o desenvolvimento do sistema. Por ora, ele apresenta uma visão geral para a equipe de desenvolvimento, cobrindo tanto os requisitos técnicos quanto as permissões dos usuários.
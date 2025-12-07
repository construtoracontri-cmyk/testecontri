# 🚀 **CONTRI-SYSTEM – ESPECIFICAÇÃO OFICIAL PARA O CODEX**

## **📌 Objetivo do Projeto**

Criar uma plataforma completa para gestão operacional e técnica da CONTRI LTDA, incluindo:

* Ordens de Serviço
* Obras e Projetos
* Orçamentos por fases
* Materiais
* Financeiro
* Upload de fotos e documentos
* Módulo completo COPA ENERGIA (preventivas, corretivas, tanques)
* Dashboard geral
* Usuários e permissões

O sistema deve ser **100% responsivo**, **multiusuário**, **seguro**, e preparado para rodar tanto **localmente** quanto em **produção** com storage externo (ex.: S3).

---

# 📂 **Estrutura Geral do Projeto**

```
/server
  /src
    /core
      /db
      /auth
      /mail
      /storage
    /modules
      /users
      /clients
      /service-orders
      /projects
      /budgets
      /materials
      /finance
      /copa
      /uploads
  .env
  package.json

/client
  /src
    /pages
    /components
    /services
    /context
    /hooks
  vite.config.ts
  package.json
```

---

# 🛠 **Tecnologias**

### Backend

* Node.js
* TypeScript
* Express ou Fastify
* MariaDB
* Drizzle ORM
* JWT (autenticação)
* Multer / S3 para uploads

### Frontend

* React
* TypeScript
* Vite
* TailwindCSS
* Shadcn/UI
* Axios

---

# 🔐 **Módulo de Autenticação (Auth)**

### Funcionalidades:

* Login com email + senha
* Hash de senha
* Geração de JWT
* Middleware de autorização por papel (role)

### Tabela `users`

```
id
name
email
passwordHash
role (ADMIN, TECNICO, FINANCEIRO, SUPERVISOR)
phone
active
timestamps
```

---

# 🧩 **MÓDULOS DO SISTEMA (BACKEND)**

---

## 1️⃣ **Users (usuários)**

Funções:

* Criar usuário
* Atualizar usuário
* Desativar
* Trocar senha
* Listar por função
* Login

---

## 2️⃣ **Clients (clientes)**

Campos:

```
id
name
document
address
city
state
contactName
contactPhone
contactEmail
isCopaEnergy
copaRegion
notes
timestamps
```

Funções:

* CRUD completo
* Filtros por cidade / nome / COPA ENERGIA

---

## 3️⃣ **Service Orders (Ordens de Serviço)**

Campos:

```
id
orderNumber
clientId
type (INSTALACAO, MANUTENCAO, MEDICAO, CORRETIVA)
priority
status
description
technicianId
scheduledDate
startDate
endDate
isCopaEnergy
timestamps
```

Funções:

* Criar OS
* Atribuir técnico
* Alterar status
* Anexar fotos
* Listar por cliente, técnico, período

---

## 4️⃣ **Projects (Obras / Projetos)**

Campos:

```
id
clientId
name
status
description
startDate
endDate
timestamps
```

Funções:

* Criar obra
* Anexar fotos
* Associar OS
* Associar orçamentos
* Relatório da obra

---

## 5️⃣ **Budgets (Orçamentos)**

### Tabela budgets:

```
id
clientId
projectId
status (RASCUNHO, ENVIADO, APROVADO)
totalAmount
timestamps
```

### Tabela budget_phases:

```
id
budgetId
name
order
notes
```

### Tabela budget_items:

```
id
phaseId
materialId (opcional)
description
quantity
unit
unitPrice
totalPrice
```

Funções:

* Criar orçamento
* Dividir por fases
* Técnico não vê preços
* Administrador aprova
* Envio de email (opcional)

---

## 6️⃣ **Materials (Materiais)**

Campos:

```
id
code
description
unit
group
costPrice
salePrice
isActive
notes
```

Funções:

* CRUD
* Filtros por grupo
* Desativar material

---

## 7️⃣ **Finance (Financeiro)**

Campos:

```
id
type (RECEITA, DESPESA)
originType (OS, ORCAMENTO, PROJETO)
originId
description
amount
category
paymentMethod
status (PAGO, PENDENTE)
date
timestamps
```

Funções:

* Registrar receitas
* Registrar despesas
* Dashboard financeiro
* Lançamentos automáticos vindos de obras e OS

---

# 🔥 **8️⃣ MÓDULO COMPLETO COPA ENERGIA**

O módulo COPA deve conter **3 grandes submódulos**:

---

## **8.1 – Tanques**

Tabela `copa_tanks`:

```
id
clientId
city
address
tankCount
tankType
serialNumber
installationDate
status
riskLevel
responsibleName
notes
timestamps
```

Funções:

* Cadastrar base/tanque
* Anexar fotos
* Listar por cidade

---

## **8.2 – Preventivas Mensais**

Tabela `copa_preventives`:

```
id
clientId
executionDate
monthRef
yearRef
technicianId
leakCheckStatus
paintingCorrosionStatus
signageStatus
baseConditionStatus
valvesStatus
leakSituation
leakAreaType
leakLocationDetails
generalObservation
status
reasonNotPerformed
timestamps
```

Funções:

* Registrar preventiva
* Upload de fotos
* Relatório mensal
* Agrupamento por cidade

---

## **8.3 – Corretivas / SACs**

Tabela `copa_correctives`:

```
id
clientId
protocolNumber
source
problemType
priority
assignedTechnician
attendanceDate
closedDate
resolutionSummary
hasLeak
leakAreaType
leakLocationDetails
serviceCostType
timestamps
```

Funções:

* Registrar SAC
* Anexar fotos
* Relatório mensal
* Dashboard por tipo de problema

---

# 🖼 **9️⃣ Uploads (Fotos e documentos)**

Tabela `attachments`:

```
id
parentType (OS, PROJETO, PREVENTIVA, CORRETIVA, ORCAMENTO)
parentId
url
caption
timestamps
```

Funções:

* Upload múltiplo
* Exclusão
* Galeria por entidade

---

# 📊 **🔟 Dashboard Geral**

### Painéis obrigatórios:

* OS por status
* OS por técnico
* Obras em andamento
* Orçamentos pendentes
* Financeiro resumido
* Ranking de clientes
* Ranking de materiais
* Preventivas por cidade
* Corretivas por tipo
* Vazamentos encontrados

---

# 💾 **11. Banco de Dados – Resumo das Tabelas**

### Principais tabelas:

```
users
clients
service_orders
projects
budgets
budget_phases
budget_items
materials
financial_entries
copa_tanks
copa_preventives
copa_correctives
attachments
```

---

# 🧱 **12. Regras de Negócio**

### OS

* Técnico só pode alterar OS atribuída a ele.
* OS concluída exige ao menos 1 foto.

### Orçamentos

* Técnico não vê valores.
* Somente administrador altera preços.

### COPA

* Preventiva exige mês/ano únicos.
* Corretiva exige protocolo único.
* Vazamento exige tipo + local registrado.

---

# 🖥 **13. Frontend – Páginas obrigatórias**

### Usuários

* login
* lista
* form

### Clientes

* lista
* form
* visão detalhada

### OS

* lista com filtros
* criar/editar
* tela detalhada com fotos

### Orçamentos

* lista
* criar orçamento
* criar fases
* adicionar itens
* aprovar/reprovar

### Obras

* lista
* detalhamento
* fotos
* OS vinculadas

### Materiais

* lista
* form

### Financeiro

* entradas
* despesas
* dashboard

### COPA

* tanques
* preventivas
* corretivas
* relatórios
* análises

---

# ⚙️ **14. Endpoints – Estrutura Global**

```
POST   /auth/login
GET    /users
POST   /users
PUT    /users/:id

GET    /clients
POST   /clients
PUT    /clients/:id

GET    /service-orders
POST   /service-orders
PUT    /service-orders/:id

GET    /projects
POST   /projects

GET    /budgets
POST   /budgets
POST   /budget-phases
POST   /budget-items

GET    /materials

GET    /finance

GET    /copa/tanks
POST   /copa/tanks

GET    /copa/preventives
POST   /copa/preventives

GET    /copa/correctives
POST   /copa/correctives

POST   /upload
```

---

# 🎯 **15. Requisitos Técnicos para o Codex Gerar Código**

* O backend deve ser criado em Node.js + TypeScript
* O ORM deve ser Drizzle
* O banco deve ser MariaDB
* O frontend deve ser criado com React + Vite
* O sistema deve ser modularizado conforme a estrutura acima
* Cada módulo deve ter:

  * controller
  * service
  * repository
  * validator
  * entidades
  * migrations

---

# 🧾 **16. Instrução final para o Codex (copie e cole após o documento):**

**"Codex, gere a estrutura inicial completa do projeto CONTRI-SYSTEM conforme a especificação acima. Crie o backend com Node.js/TypeScript/Drizzle/MariaDB e o frontend com React/Vite/Tailwind. Em seguida, gere os arquivos iniciais de cada módulo, inclusive modelos, rotas, serviços e controllers, mantendo padrões limpos, profissionais e escaláveis."**

---

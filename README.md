# 🧾 Sistema Simplificado de Controle de Pedidos em C++
### Desenvolvido por: Clayton Kossoski @ jan/2026

## 📌 Visão Geral

Este projeto implementa um **Sistema Simplificado de Controle de Pedidos**, desenvolvido em **C++ moderno (C++11+)**, com foco em **boas práticas de Engenharia de Software**.

Ele foi concebido como **atividade didática para ensino superior**, permitindo que os alunos relacionem conceitos da linguagem C++ com princípios fundamentais de **qualidade, manutenibilidade e evolução de software**.

---

## 🎯 Objetivos de Aprendizagem

Ao estudar e executar este projeto, o aluno deverá ser capaz de:

- Aplicar conceitos de **C++ moderno (C++11 ou superior)**
- Utilizar **encapsulamento, abstração e modularização**
- Compreender e aplicar **boas práticas de Engenharia de Software**
- Relacionar decisões de projeto com:
  - Manutenibilidade
  - Extensibilidade
  - Clareza do código
- Entender como C++ pode ser usado para construir **sistemas reais**

---

## 🧠 Contexto do Problema

Uma empresa deseja desenvolver um **sistema interno de controle de pedidos**, com as seguintes funcionalidades:

- Cadastro de produtos
- Registro de pedidos contendo múltiplos itens
- Cálculo do valor total do pedido
- Estrutura de código preparada para **futuras extensões**

O sistema é executado em modo **console**, simulando o funcionamento básico do domínio do problema.

---

## 🏗️ Arquitetura do Projeto

O sistema foi projetado com **alta coesão** e **baixo acoplamento**, seguindo o princípio da **Responsabilidade Única (SRP)**.

### 📦 Classes Principais

| Classe | Responsabilidade |
|------|------------------|
| `Produto` | Representar um produto com nome e preço |
| `ItemPedido` | Associar um produto a uma quantidade |
| `Pedido` | Gerenciar itens e calcular o valor total |

---

## 🧱 Decisões de Projeto Importantes

- Uso de **encapsulamento** (`private`)
- Acesso aos dados via **métodos públicos**
- Uso de **STL (`std::vector`, `std::string`)**
- Uso de **RAII** (sem `new` / `delete`)
- Uso de:
  - `const correctness`
  - Range-based `for`
- Código preparado para:
  - Separação em `.h` / `.cpp`
  - Inclusão de persistência
  - Evolução para outros domínios

---

## Compilação e execução
```bash
g++ -std=c++11 main.cpp -o controle_pedidos

./controle_pedidos
```

## 🧩 Estrutura Atual do Projeto

```text
controle-pedidos/
├── main.cpp
└── README.md

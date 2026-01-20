#include <iostream>
#include <vector>
#include <string>

// ==================================================
// Classe Produto
// Responsabilidade: representar um produto do sistema
// ==================================================
class Produto {
private:
    std::string nome;
    double preco;

public:
    Produto(const std::string& nome, double preco)
        : nome(nome), preco(preco) {}

    std::string getNome() const {
        return nome;
    }

    double getPreco() const {
        return preco;
    }
};

// ==================================================
// Classe ItemPedido
// Responsabilidade: associar produto e quantidade
// ==================================================
class ItemPedido {
private:
    Produto produto;
    int quantidade;

public:
    ItemPedido(const Produto& produto, int quantidade)
        : produto(produto), quantidade(quantidade) {}

    double getSubtotal() const {
        return produto.getPreco() * quantidade;
    }

    std::string getDescricao() const {
        return produto.getNome() + 
               " | Quantidade: " + std::to_string(quantidade);
    }
};

// ==================================================
// Classe Pedido
// Responsabilidade: gerenciar itens e calcular total
// ==================================================
class Pedido {
private:
    std::vector<ItemPedido> itens;

public:
    void adicionarItem(const ItemPedido& item) {
        itens.push_back(item);
    }

    double calcularTotal() const {
        double total = 0.0;
        for (const auto& item : itens) {
            total += item.getSubtotal();
        }
        return total;
    }

    void listarItens() const {
        std::cout << "\nItens do Pedido:\n";
        for (const auto& item : itens) {
            std::cout << "- " << item.getDescricao()
                      << " | Subtotal: R$ "
                      << item.getSubtotal() << "\n";
        }
    }
};

// ==================================================
// Função principal (Simulação do sistema)
// ==================================================
int main() {
    // Cadastro de produtos
    Produto p1("Notebook", 4500.00);
    Produto p2("Mouse", 150.00);
    Produto p3("Teclado", 300.00);

    // Criação do pedido
    Pedido pedido;

    // Registro de itens no pedido
    pedido.adicionarItem(ItemPedido(p1, 1));
    pedido.adicionarItem(ItemPedido(p2, 2));
    pedido.adicionarItem(ItemPedido(p3, 1));

    // Exibição dos dados
    pedido.listarItens();

    std::cout << "\nValor total do pedido: R$ "
              << pedido.calcularTotal() << "\n";

    return 0;
}

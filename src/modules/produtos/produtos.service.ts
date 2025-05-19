import { Injectable, Logger } from '@nestjs/common';
import { Produto } from './produto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProdutosService {

  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>
  ) {}

  getProdutos(): Promise<Array<Produto>> {
    return this.produtoRepository.find();
  }

  async findProduto(id: any): Promise<Produto | null> {
    return await this.produtoRepository.findOne({
      where: { id },
    });
  }

  async criarProduto(produto: Produto): Promise<Produto> {
    if (!produto.url) {
      produto.url = "https://cwsmalotes.com.br/wp-content/uploads/2022/07/15137691766_produto-de-teste-do-desenvolvedor.jpg"
    }
    return this.produtoRepository.save(produto);
  }

  async atualizarProduto(id: any, produto: Produto): Promise<Produto> {
    const produtoOld = await this.produtoRepository.findOne({
      where: { id },
    });

    if (!produtoOld) {
      throw new Error('Produto não encontrado');
    }

    if (produto.nome) {
      produtoOld.nome = produto.nome;
    }

    if (produto.descricao) {
      produtoOld.descricao = produto.descricao;
    }

    if (produto.preco) {
      produtoOld.preco = produto.preco;
    }

    if (produto.quantidadeEstoque) {
      produtoOld.quantidadeEstoque = produto.quantidadeEstoque;
    }

    if (produto.url) {
      produtoOld.url = produto.url;
    }

    return this.produtoRepository.save(produtoOld);
  }

  deleteProduto(id: any): Promise<void> {
    return this.produtoRepository.delete(id).then(() => {
      return;
    });
  }
}

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

  createProduto(produto: Produto): Promise<Produto> {
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

    return this.produtoRepository.save(produtoOld);
  }
}

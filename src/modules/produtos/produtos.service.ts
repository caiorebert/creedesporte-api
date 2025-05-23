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
    try {
      return this.produtoRepository.find({
        order: { id : 'ASC' },
      });
    } catch (error) {
      Logger.error('Erro ao buscar produtos', error);
      throw new Error('Erro ao buscar produtos');
    }
  }

  async findProduto(id: any): Promise<Produto | null> {
    return await this.produtoRepository.findOne({
      where: { id },
    });
  }

  async criarProduto(produto: Produto): Promise<Produto> {
    if (!produto.url) {
      produto.url = "https://d2xtm1qsylcfqn.cloudfront.net/INTERSHOP/static/WFS/LBS-LBSUS-Site/-/LBS/en_US/not_available.png"
    }
    return this.produtoRepository.save(produto);
  }

  async atualizarProduto(id: any, produto: Produto): Promise<Produto> {
    try {
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
      } else {
        produtoOld.url = "https://d2xtm1qsylcfqn.cloudfront.net/INTERSHOP/static/WFS/LBS-LBSUS-Site/-/LBS/en_US/not_available.png";
      }
  
      return this.produtoRepository.save(produtoOld);
    } catch (error) {
      throw new Error('Erro ao atualizar produto');
    }
  }

  async deleteProduto(id: any): Promise<void> {
    await this.produtoRepository.softDelete(id);
    return;
  }
}

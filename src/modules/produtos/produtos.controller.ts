import { Controller, Get, Logger, Param, Put, Req } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { Produto } from './produto.entity';

@Controller("/produtos")
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Get()
  getProdutos(): Promise<Array<Produto>> {
    return this.produtosService.getProdutos();
  }

  @Get(":id")
  findProduto(@Param('id') id: any): Promise<Produto | null> {
    return this.produtosService.findProduto(id);
  }

  @Put(":id")
  atualizarProduto(@Param('id') id: Number, @Req() request: Request): any {
    return this.produtosService.atualizarProduto(id, Produto.fromJson(request.body));
  }
}

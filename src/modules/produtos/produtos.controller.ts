import { Controller, Delete, Get, HttpCode, Logger, Param, Post, Put, Req, Res } from '@nestjs/common';
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

  @Post()
  criarProduto(@Req() request: Request): any {
    return this.produtosService.criarProduto(Produto.fromJson(request.body));
  }
  
  @Put(":id")
  @HttpCode(200)
  atualizarProduto(@Param('id') id: Number, @Req() request: Request, @Res() res: Response): any {
    try {
      return this.produtosService.atualizarProduto(id, Produto.fromJson(request.body));
    } catch (error) {
      return res.status
    }
  }

  @Delete(":id")
  deleteProduto(@Param('id') id: any): Promise<void> {
    return this.produtosService.deleteProduto(id);
  }
}

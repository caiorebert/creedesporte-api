import { DataSource } from 'typeorm';
import { Produto } from '../modules/produtos/produto.entity';

export const seedProdutos = async (dataSource: DataSource) => {
  const produtoRepository = dataSource.getRepository(Produto);

  await produtoRepository.save([
    {
        nome: 'Admin',
        descricao: 'Produto de teste',
        url: '/images/produtos/img1.jpeg',
        preco: 100.0,
        quantidadeEstoque: 10,
        ativo: true,
        criadoEm: new Date(),
        atualizadoEm: new Date(),
    },
  ]);
};
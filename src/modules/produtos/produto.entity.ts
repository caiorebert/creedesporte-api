import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn } from 'typeorm';

@Entity('produtos')
export class Produto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, default: null, nullable: true })
    nome: string;

    @Column({ type: 'text', nullable: true, default: null })
    descricao: string;

    @Column({ type: 'text', nullable: true, default: null })
    url: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    preco: number;

    @Column({ type: 'int', default: 0 })
    quantidadeEstoque: number;

    @Column({ type: 'boolean', default: true })
    ativo: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    criadoEm: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    atualizadoEm: Date;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deletadoEm: Date;

    static fromJson(json: any): Produto {
        const produto = new Produto();
        produto.nome = json.nome;
        produto.descricao = json.descricao;
        produto.url = json.url;
        produto.preco = json.preco;
        produto.quantidadeEstoque = json.quantidadeEstoque;
        produto.ativo = json.ativo;
        return produto;
    }
}
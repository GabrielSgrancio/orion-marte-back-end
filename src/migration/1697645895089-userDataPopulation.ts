import { MigrationInterface, QueryRunner } from 'typeorm';

const USERS = [
  {
    email: 'cintiasimoni.vet@gmail.com',
    password: 'Pa$$word123'
  },
  {
    email: 'flindenm@hotmail.com',
    password: 'Pa$$word123'
  },
  {
    email: 'lucasdejesus.rocha@hotmail.com',
    password: 'Pa$$word123'
  },
  {
    email: 'biel.sgrancio@hotmail.com',
    password: 'Pa$$word123'
  },
  {
    email: 'ricardonovais1@gmail.com',
    password: 'Pa$$word123'
  }
];

/**
 * Populates user entity or undoes this operation
 */
export class UserDataPopulation1697645895089 implements MigrationInterface {
  /**
   * up
   *
   * Executa as operações de inserção de dados na tabela "Users" durante a migração.
   *
   * @param queryRunner - O QueryRunner utilizado para executar as consultas no banco de dados.
   * @returns Uma Promise que é resolvida quando a operação é concluída.
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const user of USERS) {
      const newUser = await queryRunner.manager.create('User', {
        email: user.email,
        password: user.password
      });

      await queryRunner.manager.save('User', newUser);
    }
  }

  /**
   * down
   *
   * Executa as operações de exclusão de dados na tabela "Users" durante a reversão da migração.
   *
   * @param queryRunner - O QueryRunner utilizado para executar as consultas no banco de dados.
   * @returns Uma Promise que é resolvida quando a operação é concluída.
   */
  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const user of USERS) {
      await queryRunner.manager.delete('Users', { email: user.email });
    }
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

const USER = {
  name: 'EXAMPLE',
  username: 'example',
  password: '123123',
};

export class AddUserTest1622038051775 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.createQueryBuilder().insert().into('users').values([USER]).execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('users')
      .where('username = :username', { username: USER.username })
      .execute();
  }
}

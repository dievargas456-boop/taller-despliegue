import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1787087969468 implements MigrationInterface {
    name = 'Initial1787087969468'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "test" SET DEFAULT 'test'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "test" SET DEFAULT true`);
    }

}

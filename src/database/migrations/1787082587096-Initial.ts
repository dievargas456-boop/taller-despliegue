import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1787082587096 implements MigrationInterface {
    name = 'Initial1787082587096'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "test"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "test" boolean NOT NULL DEFAULT true`);
    }

}

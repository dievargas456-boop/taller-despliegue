import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUsers1788207239470 implements MigrationInterface {
    name = 'UpdateUsers1788207239470'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "vargas" TO "profe"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "profe" TO "vargas"`);
    }

}

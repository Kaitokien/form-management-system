import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSubmission1777918500209 implements MigrationInterface {
    name = 'UpdateSubmission1777918500209'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "submission_values" RENAME COLUMN "subVal_id_form" TO "fieldFieldId"`);
        await queryRunner.query(`ALTER TABLE "submissions" DROP COLUMN "submission_id_employee"`);
        await queryRunner.query(`ALTER TABLE "submissions" DROP COLUMN "submission_user_id"`);
        await queryRunner.query(`ALTER TABLE "submissions" DROP COLUMN "submission_id_form"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "stripe_customer_id"`);
        await queryRunner.query(`ALTER TABLE "submission_values" ALTER COLUMN "fieldFieldId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "forms" DROP CONSTRAINT "UQ_2969074e680edd6f6b815688c06"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_9e06c4dded662a3d0b18401c1ea"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_0c0a7b15b9fd7e259148faf7b4c"`);
        await queryRunner.query(`ALTER TABLE "forms" ADD CONSTRAINT "UQ_ace16523cc9b232e590b21413f9" UNIQUE ("creatorUserId", "form_order")`);
        await queryRunner.query(`ALTER TABLE "submission_values" ADD CONSTRAINT "FK_ef27f2077d9cf262d224593de2c" FOREIGN KEY ("fieldFieldId") REFERENCES "fields"("field_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "submission_values" DROP CONSTRAINT "FK_ef27f2077d9cf262d224593de2c"`);
        await queryRunner.query(`ALTER TABLE "forms" DROP CONSTRAINT "UQ_ace16523cc9b232e590b21413f9"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_0c0a7b15b9fd7e259148faf7b4c" UNIQUE ("user_role")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_9e06c4dded662a3d0b18401c1ea" UNIQUE ("user_password")`);
        await queryRunner.query(`ALTER TABLE "forms" ADD CONSTRAINT "UQ_2969074e680edd6f6b815688c06" UNIQUE ("form_description")`);
        await queryRunner.query(`ALTER TABLE "submission_values" ALTER COLUMN "fieldFieldId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "stripe_customer_id" character varying`);
        await queryRunner.query(`ALTER TABLE "submissions" ADD "submission_id_form" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "submissions" ADD "submission_user_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "submissions" ADD "submission_id_employee" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "submission_values" RENAME COLUMN "fieldFieldId" TO "subVal_id_form"`);
    }

}

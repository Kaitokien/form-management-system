import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDb1777883814684 implements MigrationInterface {
    name = 'InitDb1777883814684'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "fields" ("field_id" SERIAL NOT NULL, "field_label" character varying NOT NULL, "field_type" character varying NOT NULL, "field_order" integer NOT NULL, "field_required" boolean NOT NULL, "field_options" character varying, "field_created_at" TIMESTAMP NOT NULL DEFAULT now(), "field_updated_at" TIMESTAMP NOT NULL DEFAULT now(), "field_deleted_at" TIMESTAMP, "formFormId" integer, CONSTRAINT "PK_0dc8113416a6981f5146b9ae11c" PRIMARY KEY ("field_id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("user_id" SERIAL NOT NULL, "user_username" character varying NOT NULL, "user_password" character varying NOT NULL, "user_role" character varying NOT NULL, "stripe_customer_id" character varying, "user_created_at" TIMESTAMP NOT NULL DEFAULT now(), "user_updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_b75b17f36f1b000823ddac45946" UNIQUE ("user_username"), CONSTRAINT "UQ_9e06c4dded662a3d0b18401c1ea" UNIQUE ("user_password"), CONSTRAINT "UQ_0c0a7b15b9fd7e259148faf7b4c" UNIQUE ("user_role"), CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "forms" ("form_id" SERIAL NOT NULL, "form_title" character varying NOT NULL, "form_description" character varying NOT NULL, "form_order" integer NOT NULL, "form_status" character varying NOT NULL, "form_deleted_at" TIMESTAMP, "form_created_at" TIMESTAMP NOT NULL DEFAULT now(), "form_updated_at" TIMESTAMP NOT NULL DEFAULT now(), "creatorUserId" integer, CONSTRAINT "UQ_219ad6fa63f46ee69505311d69e" UNIQUE ("form_title"), CONSTRAINT "UQ_2969074e680edd6f6b815688c06" UNIQUE ("form_description"), CONSTRAINT "PK_6cce0aa5db66c09b5118fc06cbc" PRIMARY KEY ("form_id"))`);
        await queryRunner.query(`CREATE TABLE "submissions" ("submission_id" SERIAL NOT NULL, "submission_id_employee" integer NOT NULL, "submission_user_id" integer NOT NULL, "submission_id_form" integer NOT NULL, "submission_created_at" TIMESTAMP NOT NULL DEFAULT now(), "submission_updated_at" TIMESTAMP NOT NULL DEFAULT now(), "formFormId" integer, "employeeUserId" integer, CONSTRAINT "PK_9d2b514f747142635edb10c1d3d" PRIMARY KEY ("submission_id"))`);
        await queryRunner.query(`CREATE TABLE "submission_values" ("subVal_id" SERIAL NOT NULL, "subVal_id_form" integer NOT NULL, "subVal_value" character varying NOT NULL, "subVal_created_at" TIMESTAMP NOT NULL DEFAULT now(), "subVal_updated_at" TIMESTAMP NOT NULL DEFAULT now(), "submissionSubmissionId" integer, CONSTRAINT "PK_eb54e57470aded9d667fb500abe" PRIMARY KEY ("subVal_id"))`);
        await queryRunner.query(`ALTER TABLE "fields" ADD CONSTRAINT "FK_1deb6b186d83f2825fd447c1266" FOREIGN KEY ("formFormId") REFERENCES "forms"("form_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "forms" ADD CONSTRAINT "FK_39555a3be990af0acc62ce2a7a3" FOREIGN KEY ("creatorUserId") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "submissions" ADD CONSTRAINT "FK_c61ccd0c73290405c4aa5541b0b" FOREIGN KEY ("formFormId") REFERENCES "forms"("form_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "submissions" ADD CONSTRAINT "FK_68ea79260dcb4893794db9b567d" FOREIGN KEY ("employeeUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "submission_values" ADD CONSTRAINT "FK_f869ec73bd3953b19543e8758d9" FOREIGN KEY ("submissionSubmissionId") REFERENCES "submissions"("submission_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "submission_values" DROP CONSTRAINT "FK_f869ec73bd3953b19543e8758d9"`);
        await queryRunner.query(`ALTER TABLE "submissions" DROP CONSTRAINT "FK_68ea79260dcb4893794db9b567d"`);
        await queryRunner.query(`ALTER TABLE "submissions" DROP CONSTRAINT "FK_c61ccd0c73290405c4aa5541b0b"`);
        await queryRunner.query(`ALTER TABLE "forms" DROP CONSTRAINT "FK_39555a3be990af0acc62ce2a7a3"`);
        await queryRunner.query(`ALTER TABLE "fields" DROP CONSTRAINT "FK_1deb6b186d83f2825fd447c1266"`);
        await queryRunner.query(`DROP TABLE "submission_values"`);
        await queryRunner.query(`DROP TABLE "submissions"`);
        await queryRunner.query(`DROP TABLE "forms"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "fields"`);
    }

}

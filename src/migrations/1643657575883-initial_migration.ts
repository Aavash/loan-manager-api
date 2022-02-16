import {MigrationInterface, QueryRunner} from "typeorm";

export class initialMigration1643657575883 implements MigrationInterface {
    name = 'initialMigration1643657575883'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "idx" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_obsolete" boolean NOT NULL DEFAULT false, "created_on" TIMESTAMP NOT NULL DEFAULT now(), "modified_on" TIMESTAMP NOT NULL DEFAULT now(), "first_name" character varying(150) NOT NULL, "password" character varying(150), "is_password_set" boolean NOT NULL DEFAULT false, "google_id" character varying(150), "fb_id" character varying(150), "apple_id" character varying(150), "email" character varying(150), "balance" character varying(150), "gender" character varying(150), "mobile_number_ext" character varying(150) NOT NULL, "mobile_number" character varying(150) NOT NULL, "date_of_birth" date, "is_active" boolean NOT NULL DEFAULT true, "is_completely_registered" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "loan" ("id" SERIAL NOT NULL, "idx" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_obsolete" boolean NOT NULL DEFAULT false, "created_on" TIMESTAMP NOT NULL DEFAULT now(), "modified_on" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(150) NOT NULL, "ledger_type" character varying(150) NOT NULL, "person_of_interest" character varying(150) NOT NULL, "payback_completed" boolean NOT NULL DEFAULT false, "userId" integer, CONSTRAINT "PK_4ceda725a323d254a5fd48bf95f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "loan" ADD CONSTRAINT "FK_ef7a63b4c4f0edd90e389edb103" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "loan" DROP CONSTRAINT "FK_ef7a63b4c4f0edd90e389edb103"`);
        await queryRunner.query(`DROP TABLE "loan"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class PlaylistsAddUserFix21688438003142 implements MigrationInterface {
    name = 'PlaylistsAddUserFix21688438003142'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "playlist" ADD "userId" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "playlist" DROP COLUMN "userId"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPlaylistsFix1688437899665 implements MigrationInterface {
    name = 'AddPlaylistsFix1688437899665'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "movie" ("id" integer NOT NULL, "adult" boolean NOT NULL, "backdrop_path" character varying, "original_language" character varying NOT NULL, "original_title" character varying NOT NULL, "overview" character varying NOT NULL, "popularity" double precision NOT NULL, "poster_path" character varying, "release_date" character varying, "title" character varying NOT NULL, "video" boolean NOT NULL, "vote_average" double precision NOT NULL, "vote_count" integer NOT NULL, CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "playlist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_538c2893e2024fabc7ae65ad142" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "actor" ("id" integer NOT NULL, "adult" boolean NOT NULL, "gender" integer NOT NULL, "known_for_department" character varying NOT NULL, "name" character varying NOT NULL, "original_name" character varying NOT NULL, "popularity" double precision NOT NULL, "profile_path" character varying, "cast_id" integer NOT NULL, "character" character varying NOT NULL, "credit_id" character varying NOT NULL, "order" integer NOT NULL, CONSTRAINT "PK_05b325494fcc996a44ae6928e5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "genre" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_0285d4f1655d080cfcf7d1ab141" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movie_genres_genre" ("movieId" integer NOT NULL, "genreId" integer NOT NULL, CONSTRAINT "PK_aee18568f9fe4ecca74f35891af" PRIMARY KEY ("movieId", "genreId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_985216b45541c7e0ec644a8dd4" ON "movie_genres_genre" ("movieId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1996ce31a9e067304ab168d671" ON "movie_genres_genre" ("genreId") `);
        await queryRunner.query(`CREATE TABLE "movie_actors_actor" ("movieId" integer NOT NULL, "actorId" integer NOT NULL, CONSTRAINT "PK_a69e570bd35d7cd2139d12270e9" PRIMARY KEY ("movieId", "actorId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_992f9af300d8c96c46fea4e541" ON "movie_actors_actor" ("movieId") `);
        await queryRunner.query(`CREATE INDEX "IDX_65be8ded67af2677acfd19854c" ON "movie_actors_actor" ("actorId") `);
        await queryRunner.query(`CREATE TABLE "playlist_movies_movie" ("playlistId" uuid NOT NULL, "movieId" integer NOT NULL, CONSTRAINT "PK_76b9c84e158dcfa7567f3b73915" PRIMARY KEY ("playlistId", "movieId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5aeeadcb93252f2fbd65053cbb" ON "playlist_movies_movie" ("playlistId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c1a6f297e49edb100c13c2ae1b" ON "playlist_movies_movie" ("movieId") `);
        await queryRunner.query(`ALTER TABLE "movie_genres_genre" ADD CONSTRAINT "FK_985216b45541c7e0ec644a8dd4e" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "movie_genres_genre" ADD CONSTRAINT "FK_1996ce31a9e067304ab168d6715" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" ADD CONSTRAINT "FK_992f9af300d8c96c46fea4e5419" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" ADD CONSTRAINT "FK_65be8ded67af2677acfd19854c2" FOREIGN KEY ("actorId") REFERENCES "actor"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "playlist_movies_movie" ADD CONSTRAINT "FK_5aeeadcb93252f2fbd65053cbbe" FOREIGN KEY ("playlistId") REFERENCES "playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "playlist_movies_movie" ADD CONSTRAINT "FK_c1a6f297e49edb100c13c2ae1b4" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "playlist_movies_movie" DROP CONSTRAINT "FK_c1a6f297e49edb100c13c2ae1b4"`);
        await queryRunner.query(`ALTER TABLE "playlist_movies_movie" DROP CONSTRAINT "FK_5aeeadcb93252f2fbd65053cbbe"`);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" DROP CONSTRAINT "FK_65be8ded67af2677acfd19854c2"`);
        await queryRunner.query(`ALTER TABLE "movie_actors_actor" DROP CONSTRAINT "FK_992f9af300d8c96c46fea4e5419"`);
        await queryRunner.query(`ALTER TABLE "movie_genres_genre" DROP CONSTRAINT "FK_1996ce31a9e067304ab168d6715"`);
        await queryRunner.query(`ALTER TABLE "movie_genres_genre" DROP CONSTRAINT "FK_985216b45541c7e0ec644a8dd4e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c1a6f297e49edb100c13c2ae1b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5aeeadcb93252f2fbd65053cbb"`);
        await queryRunner.query(`DROP TABLE "playlist_movies_movie"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_65be8ded67af2677acfd19854c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_992f9af300d8c96c46fea4e541"`);
        await queryRunner.query(`DROP TABLE "movie_actors_actor"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1996ce31a9e067304ab168d671"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_985216b45541c7e0ec644a8dd4"`);
        await queryRunner.query(`DROP TABLE "movie_genres_genre"`);
        await queryRunner.query(`DROP TABLE "genre"`);
        await queryRunner.query(`DROP TABLE "actor"`);
        await queryRunner.query(`DROP TABLE "playlist"`);
        await queryRunner.query(`DROP TABLE "movie"`);
    }

}

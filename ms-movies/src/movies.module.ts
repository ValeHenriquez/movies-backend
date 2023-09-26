import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesResolver } from './movies.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie, Actor, Genre, Playlist } from './entities';
import { DataSourceConfig } from './config/orm.config';
import { UsersResolver } from './users.resolver';
import { PlaylistResolver } from './playlist.resolver';
import { PlaylistService } from './playlist.service';
import { ActorResolver } from './actor.resolver';
import { ActorService } from './actor.service';
import { GenreResolver } from './genre.resolver';
import { GenreService } from './genre.service';
import { DatabaseController } from './database/database.controller';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...DataSourceConfig
    }),
    TypeOrmModule.forFeature([Movie, Actor, Genre, Playlist]),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2
      }
    }),
  ],
  controllers: [DatabaseController],
  providers: [MoviesResolver, MoviesService, UsersResolver, PlaylistResolver, PlaylistService, ActorResolver, GenreResolver, ActorService, GenreService, DatabaseService]
})

export class MoviesModule { } 

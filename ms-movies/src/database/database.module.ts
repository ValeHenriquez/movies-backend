import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DatabaseController } from './database.controller';
import { MoviesModule } from 'src/movies.module';

@Module({
  imports: [MoviesModule],
  controllers: [DatabaseController],
  providers: [DatabaseService]
})
export class DatabaseModule { }

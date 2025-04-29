import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokedexModule } from './pokedex/pokedex.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiduration } from './config/env.config';
import { JoiValidatioSchema } from './config/joi.validation';

@Module({ 
  imports: [ 
    ConfigModule.forRoot({
      load: [EnvConfiduration],
      validationSchema: JoiValidatioSchema,
    }),
    
    ServeStaticModule.forRoot({ 
       rootPath: join(__dirname,'..','public'), 
      }), 
      MongooseModule.forRoot(process.env.MONGODB!, {
        dbName: 'pokemonsdb'
      }), 
       
      PokedexModule,
      
      CommonModule,
      
      SeedModule,
    ], 
  }) 
  export class AppModule {} 

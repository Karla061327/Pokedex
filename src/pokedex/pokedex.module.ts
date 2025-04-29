import { Module } from '@nestjs/common';
import { PokedexService } from './pokedex.service';
import { PokedexController } from './pokedex.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokedex, PokedexSchema } from './entities/pokedex.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [PokedexController],
  providers: [PokedexService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Pokedex.name,
        schema: PokedexSchema
      }
    ]
  )
  ],
  exports: [MongooseModule]
})
export class PokedexModule {}

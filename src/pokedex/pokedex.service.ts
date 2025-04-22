import { Injectable } from '@nestjs/common';
import { CreatePokedexDto } from './dto/create-pokedex.dto';
import { UpdatePokedexDto } from './dto/update-pokedex.dto';
import { Pokedex } from './entities/pokedex.entity';
import { Model } from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';

@Injectable()
export class PokedexService {

  constructor(
    @InjectModel(Pokedex.name)
    private readonly pokemonModel: Model<Pokedex>,
  ){}

  async create(createPokedexDto: CreatePokedexDto) {

    createPokedexDto.name = createPokedexDto.name.toLocaleLowerCase();
    const pokemon = await this.pokemonModel.create(createPokedexDto);
    console.log(pokemon);
    
    return pokemon;
  }


  findAll() {
    return `This action returns all pokedex`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pokedex`;
  }

  update(id: number, updatePokedexDto: UpdatePokedexDto) {
    return `This action updates a #${id} pokedex`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokedex`;
  }
}

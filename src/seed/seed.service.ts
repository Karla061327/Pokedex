import { Injectable } from '@nestjs/common';
import { CreateSeedDto } from './dto/create-seed.dto';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke.response.interface';
import { Pokedex } from 'src/pokedex/entities/pokedex.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePokedexDto } from 'src/pokedex/dto/create-pokedex.dto';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance;

  constructor(
    @InjectModel(Pokedex.name)
    private readonly pokemonModel: Model<Pokedex>,
    private readonly http: AxiosAdapter
  ){}

  async load() {  
    
    await this.pokemonModel.deleteMany();

    //dependencia oculta, por eso hay que declrara arriba, para saber que es una dependencia
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')
    
    //solucion 1: const insertPromisesArray:any = [];
    const pokemonS: CreatePokedexDto[] = [];

    data.results.forEach(async ({name, url}) =>{

      const segment = url.split('/');
      const no = +segment[6];

      //solucion 1
      // insertPromisesArray.push(
      //   this.pokemonModel.create({name, no})
      // )
      //await Promise.all(insertPromisesArray);

      pokemonS.push({name, no});
    });
    await this.pokemonModel.insertMany(pokemonS);
    return "seed executed";
  } 
}

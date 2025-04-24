import { Injectable } from '@nestjs/common';
import { CreateSeedDto } from './dto/create-seed.dto';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke.response.interface';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance;

  async loadDataBase() {  
    //dependencia oculta, por eso hay que declrara arriba, para saber que es una dependencia
    const {data} = await axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')
    
    data.results.forEach(({name, url}) =>{

      const segment = url.split('/');
      console.log(`pokemon: ${name} numero: ${segment[6]}`);
    })

    return;
  } 
}

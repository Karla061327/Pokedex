import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException,  } from '@nestjs/common';
import { CreatePokedexDto } from './dto/create-pokedex.dto';
import { UpdatePokedexDto } from './dto/update-pokedex.dto';
import { Pokedex } from './entities/pokedex.entity';
import { isValidObjectId, Model } from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import { error } from 'console';

@Injectable()
export class PokedexService {

  constructor(
    @InjectModel(Pokedex.name)
    private readonly pokemonModel: Model<Pokedex>,
  ){}

  async create(createPokedexDto: CreatePokedexDto) {
   
    try { 
      createPokedexDto.name = createPokedexDto.name.toLocaleLowerCase();
      const pokemon = await this.pokemonModel.create(createPokedexDto);
      return pokemon;

    } catch (error) {
        this.handleExeptions(error)
    }
  }


  findAll() {
    return `This action returns all pokedex`;
  }

  async findOne(term: string) {

    let pokemon: Pokedex |undefined |null = undefined;

    //pokemon by id
    if (!isNaN(+term)) {
      pokemon = (await this.pokemonModel.findOne({no: term}))!;
    }
    // pokemon by mongo id
    if (!pokemon && isValidObjectId(term)){
      pokemon = await this.pokemonModel.findById(term);
    }
    // pokemon name
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({name: term.toLowerCase().trim()})
    }
      
    if(!pokemon){
      throw new NotFoundException(`pokemon with id, name or no "${term}" not found`)
    }
    return pokemon;
  }

  async update(term: string, updatePokedexDto: UpdatePokedexDto) {

    const pokemon = await this.findOne(term);

    try {
      if (updatePokedexDto.name)
        updatePokedexDto.name = updatePokedexDto.name.toLowerCase();
        await pokemon.updateOne(updatePokedexDto);
        return {...pokemon.toJSON, ...updatePokedexDto};

    } catch (error) {
      this.handleExeptions(error)
    }
  }
    
  handleExeptions(error: any){
    if (error.code === 11000){
      throw new BadRequestException(`Pokemon exists in db ${JSON.stringify(error.keyValue)}`)
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`);
  }
  
  async remove(id: string) {

    // con este codigo, si enviamos algo parecido a un id validado, tendremos un status 200, aunque no exista
    //const pokemon = await this.pokemonModel.findByIdAndDelete(id);

    const {deletedCount} = await this.pokemonModel.deleteOne({_id: id});
    if (deletedCount === 0)throw new BadRequestException(`Pokemon with id:${id} "not found"`)
   
    return; 
  }
}

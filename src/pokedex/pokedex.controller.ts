import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PokedexService } from './pokedex.service';
import { CreatePokedexDto } from './dto/create-pokedex.dto';
import { UpdatePokedexDto } from './dto/update-pokedex.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';

@Controller('pokemon')
export class PokedexController {
  constructor(private readonly pokedexService: PokedexService) {}

  @Post()
  create(@Body() createPokedexDto: CreatePokedexDto) {
    return this.pokedexService.create(createPokedexDto);
  }
  
  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.pokedexService.findOne(term);
  }
  
  @Patch(':term')
  update(@Param('term') term: string, @Body() updatePokedexDto: UpdatePokedexDto) {
    return this.pokedexService.update(term, updatePokedexDto);
  }

  @Get()
  findAll() {
    return this.pokedexService.findAll();
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.pokedexService.remove(id);
  }
}

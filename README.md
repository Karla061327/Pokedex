<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecular 
```
npm i
```

3. Tener Nest CLI instalado, para el desarollo
```
npm i -g @nestjs/cli
```

4. levantar base de datos 
```
docker-compose up -d
```

5. Clonar el archivo .env.temple y llenar las variables de entorno

6. correr node en desarrollo 
```
npm run start:dev
```

7. Reconstruir la base de datos con la semilla
```
http://localhost:3000/api/v2/seed
```

## Stack usado
- Mongo
- Nest
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TOKEN_SECRET } from 'src/users/ENUMS/secret.enum';
import { verify } from 'jsonwebtoken';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('...ESTE ES MI MIDDLE WARE');

    const token = req.header('token');
    if (!token)
      res.status(401).json({
        error: "Incluya el token en la cabeceras| ** token: 'su token' **",
      });
    try {
      const verified = verify(token, TOKEN_SECRET.TOKEN_SECRET);

      //   const admin = verified.role.includes('ADMIN');
      //   const user = verified.role.includes('USER');
      if (verified) {
        next();
      } else {
        res.status(401).json({
          error: `Tiene que estar Registrado para poder disponer de esta ruta`,
        });
      }
    } catch (error) {
      console.log(
        '\x1b[31m%s\x1b[0m',
        `********* FALTA EL TOKEN EN LA CABECERA ***************`,
      );
      res.status(401).json({ error: 'incorrect token credentials' });
    }

    // next();
  }
}
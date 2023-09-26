import { UnauthorizedException } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';

export const authContext = async ({ req }) => {
    const publicRoutes = ['login', 'signup', 'GetMovies', 'getMovieByID'];
    if (publicRoutes.includes(req.body.operationName)) return;
    const token = req.headers.authorization || '';
    if (!token) throw new UnauthorizedException();
    const newToken = token.replace('Bearer ', '');
    const user = jwt.verify(newToken, 'abc123proyectotopicos');
    if (!user) throw new UnauthorizedException();

    return {
        user
    }

};
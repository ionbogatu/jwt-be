import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  private readonly secret = 'secret123';

  constructor(private jwtService: JwtService) {}

  login(payload: any) {
    if (payload?.username !== 'admin' || payload?.password !== 'admin') {
      throw new ForbiddenException();
    }

    const jwt = this.jwtService.sign(
      {
        username: payload.username,
      },
      {
        secret: this.secret,
      },
    );

    return jwt;
  }

  authorize(authorization: string) {
    if (!authorization) {
      throw new ForbiddenException();
    }

    const jwt = authorization.replace('Bearer ', '');

    let result = false;
    try {
      result = !!this.jwtService.verify(jwt, {
        secret: this.secret + '2',
      });
    } catch (error: any) {
      result = false;
    }

    return result;
  }
}

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(" ")[0];
      const token = authHeader.split(" ")[1];
      if (bearer != "Bearer" || !token) {
        throw new UnauthorizedException({
          message: "Unauthorized User(user guard)",
        });
      }
      const user = this.jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });
      if (!user.sub) {
        throw new UnauthorizedException({
          message: "Unauthorized User(user guard)",
        });
      }
      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException({
        message: "Unauthorized User(user guard)",
      });
    }
  }
}

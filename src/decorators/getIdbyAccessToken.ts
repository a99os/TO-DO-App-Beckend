import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

export const IdGetterUser = createParamDecorator(
  async (_: undefined, context: ExecutionContext) => {
    // const request = context.switchToHttp().getRequest();
    // const refreshToken = request.cookies["refresh_token"];
    // if (!refreshToken) {
    //   throw new UnauthorizedException("User unathorized");
    // }
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
      return token;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException({
        message: "Unauthorized User(user guard)",
      });
    }
  }
);

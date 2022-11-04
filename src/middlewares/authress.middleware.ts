import * as express from "express"
import { BaseMiddleware } from "inversify-express-utils";
import { injectable, inject } from "inversify";
import { Logger } from "../logger";
import { LoginClient } from "authress-login";

@injectable()
export class AuthressMiddleware extends BaseMiddleware {
    
    constructor(@inject(LoginClient) private _loginClient: LoginClient) {
        super()
    }
    public async handler(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const isUserLoggedIn = await this._loginClient.userSessionExists();
        if (!isUserLoggedIn) {
          window.location.assign('/auth/login');
        }
    }
}

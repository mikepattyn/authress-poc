import * as express from "express"
import { BaseMiddleware } from "inversify-express-utils";
import { injectable, inject } from "inversify";
import { Logger } from "../logger";
import { LoginClient } from "authress-login";

@injectable()
export class AuthressMiddleware extends BaseMiddleware {
    private _loginClient: LoginClient;
    constructor(@inject(Logger) private _logger: Logger) {
        super()
        this._loginClient = new LoginClient({ authressLoginHostUrl: 'https://hkqhd2lt2b4o9wisuxsph46og5h14p1i.login.authress.io', applicationId: 'app_txSV8xQhQehRFqNtw8Zg3s' })
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

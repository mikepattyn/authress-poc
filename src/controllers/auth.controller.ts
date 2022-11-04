import { Request, Response } from "express"
import { inject } from "inversify"
import { BaseHttpController, controller, httpGet, httpPost, interfaces } from "inversify-express-utils"
import { Logger } from "../logger"
import { LoginClient, AuthenticationParameters } from 'authress-login';
import { AuthressLoginClient } from "../clients/authress-login.client";

@controller('/auth')
export class LoginController extends BaseHttpController implements interfaces.Controller {
    constructor(@inject(Logger) private logger: Logger, @inject(AuthressLoginClient) private authressLoginClient: AuthressLoginClient) { 
        super() 
    }

    @httpGet('/')
    private index(req: Request, res: Response) {
        return res.render('login', {  })
    }

    @httpGet('/login')
    private async login(req: Request, res: Response) {
        this.logger.log(`${req.query}`)
        let authParams: AuthenticationParameters;
        if (typeof window !== 'undefined') {
            authParams = {
                connectionId: 'app_txSV8xQhQehRFqNtw8Zg3s', 
                redirectUrl: window.location.href
            }
        } else {
            authParams = {
                connectionId: 'app_txSV8xQhQehRFqNtw8Zg3s', 
                redirectUrl: "http://localhost:4444"
            }
        }
        await this.authressLoginClient.getInstance().authenticate(authParams);
        return res.render('login', {  })
    }
    
    @httpPost('/register')
    private register(req: Request, res: Response) {
        return res.render('register', {  })
    }
}
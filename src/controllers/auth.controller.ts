import { Request, Response } from "express"
import { inject } from "inversify"
import { BaseHttpController, controller, httpGet, interfaces } from "inversify-express-utils"
import { Logger } from "../logger"
import { LoginClient } from 'authress-login';

@controller('/auth')
export class LoginController extends BaseHttpController implements interfaces.Controller {
    constructor(@inject(Logger) private logger: Logger, @inject(LoginClient) private loginClient: LoginClient) { 
        super() 
    }

    @httpGet('/')
    private index(req: Request, res: Response) {
        return res.render('login', {  })
    }

    @httpGet('/post')
    private async login(req: Request, res: Response) {
        await this.loginClient.authenticate({ connectionId: 'SELECTED_CONNECTION_ID', redirectUrl: window.location.href });
        return res.render('login', {  })
    }
    
    @httpGet('/register')
    private register(req: Request, res: Response) {
        return res.render('register', {  })
    }
}
import { Request, Response } from "express"
import { inject } from "inversify"
import { BaseHttpController, controller, httpGet, interfaces } from "inversify-express-utils"
import { Logger } from "../logger"

@controller('/auth')
export class LoginController extends BaseHttpController implements interfaces.Controller {
    constructor(@inject(Logger) private logger: Logger) { 
        super() 
    }

    @httpGet('/login')
    private login(req: Request, res: Response) {
        return res.render('login', {  })
    }

    
    @httpGet('/register')
    private register(req: Request, res: Response) {
        return res.render('register', {  })
    }
}
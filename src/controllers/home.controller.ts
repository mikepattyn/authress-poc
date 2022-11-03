import { Request, Response } from "express"
import { inject } from "inversify"
import { BaseHttpController, controller, httpGet, interfaces } from "inversify-express-utils"
import { keyof } from "ts-keyof"
import { Logger } from "../logger"

@controller('/home')
export class HomeController extends BaseHttpController implements interfaces.Controller {
    constructor(@inject(Logger) private logger: Logger) { 
        super() 
    }

    @httpGet('/')
    private Index(req: Request, res: Response) {
        this.logger.log(`Received a ${req.method} request on: ${keyof({HomeController})}`)
        return res.render('index', {  })
    }
}
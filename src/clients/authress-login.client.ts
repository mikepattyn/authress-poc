import { LoginClient } from "authress-login";
import { injectable } from "inversify";

@injectable()
export class AuthressLoginClient {
    getInstance(): LoginClient {
        return new LoginClient({ authressLoginHostUrl: 'https://hkqhd2lt2b4o9wisuxsph46og5h14p1i.login.authress.io', applicationId: 'app_txSV8xQhQehRFqNtw8Zg3s' })
    }
}

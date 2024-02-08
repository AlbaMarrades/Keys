import Configuration from "../../services/configuration/configuration"

export class ConfigurationActions {

    public static retrieveName(): string {
        return new Configuration().retrieveDenomination()
    }
}



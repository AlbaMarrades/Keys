import Repository from "./repository"

export default class Configuration {
    repository: Repository = new Repository()

    public retrieveDenomination(): string {
        return this.repository.appName() + ' ' + this.repository.version()
    }
}
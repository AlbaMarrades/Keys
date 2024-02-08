export class Languages {

    static saveLanguage(language: string) {
        localStorage.setItem('language.selected', language)
    }

    static retrieveLanguage(): string {
        return localStorage.getItem('language.selected') || 'en'
    }

}
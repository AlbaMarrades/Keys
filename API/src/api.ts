import ConfigurationRouter from './routes/configuration/configuration-routes'
import AssetRouter from './routes/assets/asset-routes';
import express from 'express'
import cors from 'cors';
import Logger from './infrastructure/logger';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import i18nextMiddleware from 'i18next-http-middleware';
import TestRouter from './routes/maintenance/test-routes';
import Settings from './infrastructure/settings';
import UserRouter from './routes/users/user-routes';
import LanguagesRouter from './routes/languages/languages';

const app = express()

Logger.configure()

app.use(cors())
app.use(express.json({limit: '50mb'}))

i18next
    .use(Backend)
    .use(i18nextMiddleware.LanguageDetector)
    .init({
        initImmediate: false,
        backend: {
            loadPath: __dirname + '/locales/{{lng}}/{{ns}}.json'
        },
        fallbackLng: 'es',
        preload: ['es', 'en'],
    })
app.use(i18nextMiddleware.handle(i18next));

app.use(ConfigurationRouter)
app.use('/users', UserRouter)
app.use('/assets', AssetRouter)
app.use('/languages', LanguagesRouter)

if(Settings.atTestingMode()){
    app.use('/test', TestRouter)
}

export default app
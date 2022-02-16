import * as dotenv from 'dotenv';

let path: string;


switch (process.env.NODE_ENV) {
    case 'test':
        path = `${__dirname}/../../env/test.env`;
        break;
    case 'prod':
        path = `${__dirname}/../../env/prod.env`;
        break;
    default:
        path = `${__dirname}/../../env/dev.env`;
}

dotenv.config({ path, debug: false });


export const APP_PORT = process.env.APP_PORT


export const DATABASE_CONFIG = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    url: process.env.POSTGRES_CONNECTION_STRING
}
console.log(DATABASE_CONFIG)
export const JWT_CONFIG = {
    expiry: '30d',
    secret_key: process.env.JWT_SECRET_KEY
}
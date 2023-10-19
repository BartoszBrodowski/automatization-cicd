const dotenv = require('dotenv');
dotenv.config();

export const DB_URL: string = process.env.DB_URI || '';
export const USER: string = process.env.DB_USERNAME || '';
export const PASSWORD: string = process.env.DB_PASSWORD || '';

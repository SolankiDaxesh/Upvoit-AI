import dotenv from 'dotenv';
dotenv.config();

import sql from 'mssql/msnodesqlv8';

const dbConfig: sql.config = {
    server: process.env.DB_SERVER || '',
    database: process.env.DB_NAME || '',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true,
        trustServerCertificate: true,
        encrypt: true,

    },
};


export const connectToDb = async () => {
    try {
        await sql.connect(dbConfig);
        console.log('✅ Connected to MSSQL using Windows Authentication');
    } catch (err) {
        console.error('❌ Database connection failed:');
        console.dir(err, { depth: 1 }); // <-- show full object
        throw err;
    }
};

export default sql;

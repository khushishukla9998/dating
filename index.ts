import express, { Application } from 'express';
import mongoose from 'mongoose';
import path from 'path';
import config from '../dating/config/dev.json'
import appStrings from "../dating/src/components/utils/appString";
// const adminIndex = require("../dating/src/components/admin/index")
// const doctorIndex = require("../dating/src/components/doctor/index")
// const patientIndex = require("../dating/src/components/patient/index")
const http = require("http")
const app: Application = express();
const port: number | string = config.PORT;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'components', 'user', 'views'));
console.log('======== SERVER FILE LOADED=========');

app.use(express.json());

// Routes
// app.use('/api/admin', adminIndex);
// app.use('/api/doctor', doctorIndex);
// app.use('/api/patient', patientIndex);



const connectDb = async () => {
    try {
        await mongoose.connect(config.MONGO_DB_URL);
        console.log(appStrings.DATABASE_CONNECT);
    } catch (err: any) {
        console.log(err.message);
    }
};

async function startServer() {
    try {
        app.listen(port, () => {
            console.log(`${appStrings.SERVER_RUNNING}${port}`);
        });
    } catch (err: any) {
        console.log(err.message, appStrings.SERVER_ERROR);
    }
}

startServer();
connectDb();

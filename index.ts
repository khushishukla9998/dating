import express, { Application } from 'express';
import mongoose from 'mongoose';
import path from 'path';
import config from '../dating/config/dev.json'
import appStrings from "../dating/src/components/utils/appString";
import userIndex from "../dating/src/components/user/index"
const app: Application = express();
const port: number | string = config.PORT;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'components', 'user', 'views'));
console.log('======== SERVER FILE LOADED=========');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
// Routes
app.use('/api/user', userIndex);

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

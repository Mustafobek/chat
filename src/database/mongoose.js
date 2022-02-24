import * as mongoose from "mongoose";
import {errorMessage, infoMessage} from "../utils/message.js";

const DB_URI = process.env.DB_URI || 'mongodb://127.0.0.1:27017/chat-app'

mongoose
.connect(DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
.then(r => console.log(infoMessage('Database is serving')))
.catch(err => console.log(errorMessage(`Database connection error ${err.message}`)))

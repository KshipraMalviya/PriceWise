import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import morgan from 'morgan'
import kpiRoutes from "./routes/kpi.js"
import KPI from "./models/KPI.js"
import {kpis, products, transactions} from './data/data.js'
import productRoutes from "./routes/product.js"
import transactionRoutes from "./routes/transaction.js"
import Product from "./models/Product.js"
import Transaction from "./models/Transaction.js"

// // Configurations

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

// Routes

app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);
app.use("/transaction", transactionRoutes)

// // Mongoose setup

const PORT = process.env.PORT || 9000 // backup port 9000
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(async() => {
    app.listen(PORT, () => console.log(`Server runnnig on port ${PORT}`));

    // await mongoose.connection.db.dropDatabase(); // For one time data entry into the database
    // KPI.insertMany(kpis); 
    // Product.insertMany(products);
    // Transaction.insertMany(transactions);
})
.catch((error) => console.log(`${error}`));
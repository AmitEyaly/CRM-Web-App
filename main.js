const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require("./connectDB");

const usersRouter = require('./Routes/usersRouter');
const clientsRouter = require('./Routes/clientsRouter');
const reservationsRouter = require('./Routes/reservationsRouter');
connectDB();

//middlewares
app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true, // Ensures that the `Access-Control-Allow-Credentials` header is set to `true`
    methods: ['GET', 'POST', 'DELETE', 'PUT']
};

app.use(cors(corsOptions));
// app.use(session({
//     secret: 'your-secret-key', 
//     resave: false,
//     saveUninitialized: true,
//     cookie:{
//         maxAge: 1000*60*60*24 
//     }
//   }));

//routers
app.use('/clients', clientsRouter);
app.use('/reservations', reservationsRouter);
app.use('/users', usersRouter);


const PORT = 1913;
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
})
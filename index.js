const express = require('express');
const mongoose=require("mongoose");
const routes = require('./routes/routes');
const cors=require("cors");
const app = express()
app.use(express.json());
app.use(cors())
app.use('/uploads',express.static(__dirname+"/uploads"));
app.use('/api',routes);
const port = 3001
mongoose.connect("mongodb+srv://mohamad-nassar:zI927zEwkayyRz37@dashboard.30gdlmu.mongodb.net/?retryWrites=true&w=majority");
app.listen(port)
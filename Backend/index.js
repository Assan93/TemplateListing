// importing express
const express = require('express');
require('dotenv').config();
const UserRouter = require('./routers/UserRouters');
const TemplateRouter = require('./routers/templateRouters');
const orderRouter = require('./routers/orderRouter');
const cors = require('cors');

// initialize express
const app = express();

const port = process.env.PORT || 5000;

// middlewares
app.use(cors({
    origin : '*'
}))
app.use(express.json());
app.use('/user', UserRouter);
app.use('/template', TemplateRouter);
app.use('/order', orderRouter);

// endpoints or routes
app.get('/', (req, res) => {
    res.send('response from express');
})

app.get('/add', (req, res) => {
    res.send('response from add');
})

// getall
 app.get('/getall', (req, res) => {
    res.send('response from getall');
})
// delete
app.get('/getbydelete', (req, res) => {
    res.send('response from delete');
})
// update
app.get('/getbyupdate', (req, res) => {
    res.send('response from update');
})

// starting the server
app.listen(port, () => {
    console.log('server started');

} );
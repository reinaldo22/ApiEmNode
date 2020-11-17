import express from  'express';
import morgan from 'morgan';
import produtosRoutes from './routes/produtos.routes';
import userRoutes from './routes/usuario.routes';
import authRouthes from './routes/auth.routes';
import { createRoles }  from './libs/setupInicial';


const app = express();
const cors = require('cors');

createRoles();

app.use((req, res, next) =>{
    //console.log("acessou essa bagaça");
    
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
})
app.use(morgan('dev'));
app.use(express.json());
app.get('/', (req,res)=>{
    res.json('Principal');
});


app.use('/products',produtosRoutes)
app.use('/auth', authRouthes)
app.use('/users',userRoutes)
export default app;
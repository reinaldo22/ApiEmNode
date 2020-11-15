import express from  'express';
import morgan from 'morgan';
import produtosRoutes from './routes/produtos.routes';
import authRouthes from './routes/auth.routes';
import { createRoles }  from './libs/setupInicial';

const app = express();
createRoles();

app.use(morgan('dev'));
app.use(express.json());
app.get('/', (req,res)=>{
    res.json('Principal');
});

app.use('/products',produtosRoutes)
app.use('/auth', authRouthes)

export default app;
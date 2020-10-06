import express from  'express';
import morgan from 'morgan';
import produtosRoutes from './routes/produtos.routes'
import authRouthes from './routes/auth.routes'

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.get('/', (req,res)=>{
    res.json('Principal');
});

app.use('/products',produtosRoutes)
app.use('/auth', authRouthes)

export default app;
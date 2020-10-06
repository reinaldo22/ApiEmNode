import Product from '../model/Product';



export const createProdutos = async (req, res)=> {

    const {name, category, price, imgUrl} = req.body

    const newProduct = new Product({name, category, price, imgUrl});

    const productSave = await newProduct.save();
    
    res.status(201).json(productSave);
}
export const getProdutos = async (req, res)=> {
    const todosProdutos = await Product.find();
    res.json(todosProdutos);
}
export const deletaProdutos = async (req, res)=> {
    const {id} = req.params;

    await Product.findByIdAndDelete(id);
    res.send("Deletado com sucesso");
} 
export const atualizaProdutos = async (req, res)=> {
    const updateProduct = await Product.findByIdAndUpdate(req.params.id, req.body,{
        new:true
    });
    res.json(updateProduct);

}
export const getByIdProdutos = async (req, res)=> {
       const buscaId = await Product.findById(req.params.id);
       res.json(buscaId);
}
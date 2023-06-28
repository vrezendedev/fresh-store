import './../styles/products.css';

import RegisterProduct from '~/components/RegisterProduct';

export default function Products() {
    return (
        <div style={{ 'overflow-x': 'hidden' }}>
            <div class="product-header-div">
                <h1>Produtos</h1>
                <p>Cadastro e Listagem</p>
            </div>
            <div>
                <h3>
                    Cadastrar
                    {'↷'}
                </h3>
                <RegisterProduct />
            </div>
        </div>
    );
}

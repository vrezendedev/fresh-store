import './../styles/products.css';

import RegisterProduct from '~/components/RegisterProduct';

export default function Products() {
    return (
        <div
            style={{
                'overflow-x': 'hidden',
                'overflow-y': 'scroll',
                height: '100%',
                width: '95%',
                'padding-left': '16px',
            }}
        >
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
            <div>
                <h3>
                    Listagem de Produtos
                    {'↷'}
                </h3>
            </div>
        </div>
    );
}

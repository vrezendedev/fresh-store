import './../styles/registerproduct.css';

import Add from '../_imgs/add.svg';

export default function RegisterProduct() {
    return (
        <div class="register-product-main-div">
            <div class="product-name-price-div">
                <div class="input-flex-column">
                    <label for="productName">Produto</label>
                    <input
                        id="productName"
                        type="text"
                        placeholder="Digite o nome."
                    />
                </div>
                <div class="product-price-div">
                    <div class="input-flex-column">
                        <div class="input-flex-column">
                            <div>
                                <label for="productPrice">Preço</label>
                            </div>
                            <div class="price-value-div">
                                <div class="price-raw-value-div">
                                    <input
                                        id="productPrice"
                                        type="number"
                                        step={0.1}
                                        placeholder="Digite o preço."
                                    />
                                </div>
                                <div class="price-value-modifier-div">
                                    <input
                                        id="discountCalc"
                                        type="number"
                                        step="1"
                                        min={-100}
                                        max={100}
                                        placeholder="+/- 0%"
                                    />
                                </div>
                            </div>
                            <div>
                                <label>{'Valor com mod. % aplicado: '}</label>
                                <label>R$...</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="product-description-div">
                <label for="productName">Descrição</label>
                <textarea
                    style={{ height: '100%', resize: 'none' }}
                    id="productName"
                    placeholder="Digite a descrição."
                />
            </div>
            <div class="product-confirm-button-div">
                <button class="add-product-button">
                    <img src={Add} />
                </button>
            </div>
        </div>
    );
}

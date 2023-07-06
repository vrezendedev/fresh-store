import { createEffect, createSignal } from "solid-js";

import Hider from "~/components/Hider/Hider";
import Table from "~/components/Table/Table";
import ClientCard from "~/layouts/ClientCard/ClientCard";
import Select from "~/components/Select/Select";

import Placeholder from "@phosphor-icons/core/assets/regular/placeholder.svg";
import Add from "@phosphor-icons/core/assets/regular/plus.svg";

import "./sales-page.css";
import TextInput from "~/components/TextInput/TextInput";

export default function SalesPage() {
    const labels = [
        { label: "Cód.", key: "productCode" },
        { label: "Nome", key: "productName" },
        { label: "Qtd.", key: "quantity" },
        { label: "Preço", key: "price" },
        { label: "Desconto", key: "discount" },
        { label: "Total", key: "total" },
    ];

    const [productList, setProductList] = createSignal([
        {
            productCode: 312312,
            productName: "Toy",
            quantity: 2,
            price: 50,
            discount: "10%",
            total: 45,
        },
    ]);

    const [client, setClient] = createSignal({});

    const [searchOptions, setSearchOptions] = createSignal([]);
    const [searchedProduct, setSearchedProduct] = createSignal("");
    const [selectedSearchProduct, setSelectedSearchProduct] = createSignal("");
    const [isSelectLoading, setIsSelectLoading] = createSignal(false);
    const [isScanMode, setIsScanMode] = createSignal(false);

    const [productImage, setProductImage] = createSignal(null);
    const [productQnt, setProductQnt] = createSignal(0);
    const [productDiscount, setProductDiscount] = createSignal(0);
    const [productPrice, setProductPrice] = createSignal(0);
    const [productIdentification, setProductIdentification] = createSignal(null);

    const [clientIncome, setClientIncome] = createSignal(0);

    const productListTotal = productList().reduce((acc, obj) => acc + obj.price, 0);

    async function handleSearchTextChange() {
        //fetch options
        setIsSelectLoading(true);
        setTimeout(() => {
            setSearchOptions([
                { id: 1, description: "teste" },
                { id: 2, description: "teste2" },
            ]);
            setSearchedProduct("");
            if (isScanMode()) {
                setSearchOptions((prev) => [prev[0]]);
                setSelectedSearchProduct(searchOptions()[0]);
            }
            setIsSelectLoading(false);
        }, 2000);
    }

    async function handleSearchSelectChange() {
        console.log(selectedSearchProduct());
    }

    async function handleSelectButtonClick() {
        setIsScanMode((prev) => !prev);
    }

    function AddProductToList() {}

    createEffect(() => {
        if (!isScanMode()) return;
        console.log(selectedSearchProduct());
    }, [selectedSearchProduct]);

    return (
        <div style={{ "padding-left": "0.5rem", "padding-right": "1rem" }}>
            <h1 class="title-page">Vendas</h1>
            <div style={{ "padding-left": "1.5rem", "padding-top": "0.5rem" }}>
                <h3 style={{ margin: "0" }}>Cadastro</h3>
                <Hider content="Abrir o Cadastro" show={true}>
                    <div class="sales-components-container">
                        <div
                            style={{
                                display: "flex",
                                "flex-direction": "column",
                                flex: "1",
                                gap: "0.5rem",
                            }}
                        >
                            <Table
                                title="Lista de Produtos"
                                labels={labels}
                                data={productList}
                                remove={(obj) =>
                                    setProductList((prev) =>
                                        prev.filter(
                                            (o) => o.productCode != obj.productCode
                                        )
                                    )
                                }
                            />
                            <div class="total-container">
                                <span
                                    style={{
                                        "align-self": "center",
                                        "padding-top": "0.5rem",
                                    }}
                                >
                                    Total: R${productListTotal.toFixed(2)}
                                </span>
                                <div class="total-change-container">
                                    <TextInput
                                        title="Recebido para Pagamento"
                                        required={false}
                                        placeholder="Digite o valor recebido."
                                        placeholderOnError="Qtd. recebida é inválida."
                                        onChange={(e) => setClientIncome(e)}
                                        onValidate={(e) => {}}
                                        value={clientIncome}
                                        containerProps={{ style: "flex: 1" }}
                                        labelProps={{
                                            style: "font-size: 0.9rem",
                                        }}
                                        inputProps={{
                                            type: "number",
                                            min: "0",
                                            step: "0.5",
                                        }}
                                    />
                                    <TextInput
                                        title="Troco"
                                        required={false}
                                        placeholder="Valor do Troco"
                                        placeholderOnError="Qtd. recebida é inválida."
                                        value={() =>
                                            (
                                                clientIncome() - productListTotal
                                            ).toFixed(2)
                                        }
                                        containerProps={{ style: "flex: 1" }}
                                        labelProps={{
                                            style: "font-size: 0.9rem",
                                        }}
                                        inputProps={{
                                            type: "number",
                                            min: "0",
                                            step: "0.5",
                                            disabled: "true",
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                "flex-direction": "column",
                                flex: "1",
                                gap: "0.1rem",
                            }}
                        >
                            <div
                                style={{
                                    flex: 2,
                                    display: "flex",
                                    "flex-direction": "row",
                                }}
                            >
                                <ClientCard getClientData={(e) => setClient(e)} />
                            </div>
                            <div
                                style={{
                                    flex: 0.5,
                                    display: "flex",
                                    "flex-direction": "row",
                                    "align-items": "flex-start",
                                }}
                            >
                                <Select
                                    valueKey="id"
                                    descriptionKey="description"
                                    isLoading={isSelectLoading}
                                    options={searchOptions}
                                    textInputValue={searchedProduct}
                                    onTextInput={() => setSearchOptions([])}
                                    onTextChange={(e) => {
                                        setSearchedProduct(e);
                                        handleSearchTextChange();
                                    }}
                                    onSelectChange={(e) => {
                                        setSelectedSearchProduct(
                                            searchOptions().filter(
                                                (obj) => obj.id == e
                                            )[0]
                                        );
                                        handleSearchSelectChange();
                                    }}
                                    hasButton={true}
                                    onButtonClick={() => handleSelectButtonClick()}
                                />
                            </div>
                            <div class="add-product-container">
                                <span
                                    style={{
                                        "font-size": "1rem",
                                        "font-weight": "bold",
                                    }}
                                >
                                    Produto
                                </span>
                                <div class="add-product-info-container">
                                    <div
                                        style={{
                                            flex: 1,
                                            display: "flex",
                                            "flex-direction": "column",
                                            gap: "1rem",
                                            "justify-content": "center",
                                            "align-items": "center",
                                        }}
                                    >
                                        <img
                                            class="product-img"
                                            src={
                                                productImage() == null
                                                    ? Placeholder
                                                    : productImage()
                                            }
                                            draggable={false}
                                            alt="Imagem do Produto"
                                            style={{
                                                "align-self": "center",
                                            }}
                                        />

                                        <div style={{ "text-align": "center" }}>
                                            <span
                                                style={{
                                                    "font-size": "0.9rem",
                                                    "font-weight": "bold",
                                                }}
                                            >
                                                {() =>
                                                    productIdentification() != null
                                                        ? productIdentification()
                                                        : "Código/Nome do Produto"
                                                }
                                            </span>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            flex: 2,
                                            display: "flex",
                                            "flex-direction": "column",
                                            "justify-content": "center",
                                        }}
                                    >
                                        <div>
                                            <TextInput
                                                title="Quantidade"
                                                required={true}
                                                placeholder="Digite a qtd. do produto."
                                                placeholderOnError="Qtd. é inválida."
                                                onChange={(e) => setProductQnt(e)}
                                                onValidate={(e) => {}}
                                                value={productQnt}
                                                inputProps={{
                                                    type: "number",
                                                    step: "1",
                                                    min: "1",
                                                }}
                                            />
                                            <TextInput
                                                title="Desconto"
                                                required={false}
                                                placeholder="Digite a qtd. do produto."
                                                placeholderOnError="Qtd. é inválida."
                                                onChange={(e) =>
                                                    setProductDiscount(e)
                                                }
                                                onValidate={(e) => {}}
                                                value={productDiscount}
                                                inputProps={{
                                                    type: "number",
                                                    max: "1",
                                                    min: "0",
                                                    step: "0.1",
                                                }}
                                            />
                                            <TextInput
                                                title="Preço"
                                                required={true}
                                                placeholder="Digite a qtd. do produto."
                                                placeholderOnError="Qtd. é inválida."
                                                onChange={(e) => setProductPrice(e)}
                                                onValidate={(e) => {}}
                                                value={productPrice}
                                                inputProps={{
                                                    type: "number",
                                                    min: "1",
                                                    step: "0.5",
                                                }}
                                            />
                                            <div
                                                style={{
                                                    display: "flex",
                                                    "justify-content": "center",
                                                }}
                                            >
                                                <img
                                                    src={Add}
                                                    role="button"
                                                    alt="Adicionar Produto à lista"
                                                    onClick={() =>
                                                        AddProductToList()
                                                    }
                                                    style={{
                                                        width: "24px",
                                                        height: "24px",
                                                        "background-color":
                                                            "transparent",
                                                        border: "none",
                                                        "box-shadow": "none",
                                                        cursor: "pointer",
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Hider>
            </div>
        </div>
    );
}

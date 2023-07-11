import { createEffect, createSignal } from "solid-js";

import Hider from "~/components/Hider/Hider";
import Table from "~/components/Table/Table";
import ClientCard from "~/layouts/ClientCard/ClientCard";
import Select from "~/components/Select/Select";
import RadioController from "~/components/RadioController/RadioController";
import TextInput from "~/components/TextInput/TextInput";

import Placeholder from "@phosphor-icons/core/assets/regular/placeholder.svg";
import Add from "@phosphor-icons/core/assets/regular/plus.svg";

import "./sales-page.css";

export default function SalesPage() {
    const labels = [
        { label: "Cód.", key: "productCode" },
        { label: "Nome", key: "productName" },
        { label: "Qtd.", key: "quantity" },
        { label: "Preço", key: "price" },
        { label: "Desconto", key: "discount" },
        { label: "Total", key: "total" },
    ];

    const installments = () => {
        let arr = [];
        for (let i = 1; i < 13; i++) {
            arr.push({ number: i });
        }
        return arr;
    };

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
    const [total, setTotal] = createSignal(0);
    const [paymentMethod, setPaymentMethod] = createSignal("");
    const [numberOfInstallments, setNumberOfInstallments] = createSignal(0);
    const [monthlyInterest, setMonthlyInterest] = createSignal(0);
    const [isFinishing, setIsFinishing] = createSignal(false);

    const [cancelled, setCancelled] = createSignal(false);

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

    function handleCancelSale() {
        console.log("Sale cancelled!");
        setCancelled(true);
        setClient({});
        setProductList([]);
        setSearchOptions([]);
        setSearchedProduct("");
        setSelectedSearchProduct({});
        setProductImage(null);
        setProductQnt(0);
        setProductDiscount(0);
        setProductPrice(0);
        setProductIdentification(null);
        setClientIncome(0);
        setCancelled(false);
        setPaymentMethod("");
        setNumberOfInstallments(0);
        setMonthlyInterest(0);
    }

    async function handleFinishSale() {}

    function AddProductToList() {}

    createEffect(() => {
        if (!isScanMode()) return;
        console.log(selectedSearchProduct());
    }, [selectedSearchProduct]);

    createEffect(() => {
        setTotal(productList().reduce((acc, obj) => acc + obj.total, 0));
    }, [productList]);

    return (
        <div style={{ "padding-left": "0.5rem", "padding-right": "1rem" }}>
            <h1 class="title-page">Vendas</h1>
            <div style={{ "padding-left": "1.5rem", "padding-top": "0.5rem" }}>
                <h3 style={{ margin: "0" }}>Cadastrar</h3>
                <Hider content="Abrir e Cadastrar" show={false}>
                    <div
                        style={{
                            display: "flex",
                            "flex-direction": "column",
                            width: "100%",
                            gap: "0.5rem",
                            "margin-bottom": "1rem",
                        }}
                    >
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
                                                (o) =>
                                                    o.productCode != obj.productCode
                                            )
                                        )
                                    }
                                />
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
                                    <ClientCard
                                        getClientData={(e) => setClient(e)}
                                        clean={() => cancelled()}
                                    />
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
                                        onButtonClick={() =>
                                            handleSelectButtonClick()
                                        }
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
                                                        productIdentification() !=
                                                        null
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
                                                    onChange={(e) =>
                                                        setProductQnt(e)
                                                    }
                                                    onValidate={(e) => {}}
                                                    value={productQnt}
                                                    inputProps={{
                                                        type: "number",
                                                        step: "1",
                                                        min: "1",
                                                    }}
                                                    labelProps={{
                                                        style: "font-size: 0.9rem",
                                                    }}
                                                />
                                                <TextInput
                                                    title="Desconto (%)"
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
                                                        max: "100",
                                                        min: "0",
                                                        step: "1",
                                                    }}
                                                    labelProps={{
                                                        style: "font-size: 0.9rem",
                                                    }}
                                                />
                                                <TextInput
                                                    title="Preço"
                                                    required={true}
                                                    placeholder="Digite a qtd. do produto."
                                                    placeholderOnError="Qtd. é inválida."
                                                    onChange={(e) =>
                                                        setProductPrice(e)
                                                    }
                                                    onValidate={(e) => {}}
                                                    value={productPrice}
                                                    inputProps={{
                                                        type: "number",
                                                        min: "1",
                                                        step: "0.5",
                                                    }}
                                                    labelProps={{
                                                        style: "font-size: 0.9rem",
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
                        <div class="total-finish-container">
                            <div class="total-child-container">
                                <span
                                    style={{
                                        flex: "1",
                                        padding: "0.5rem",
                                    }}
                                >
                                    Total: R$ {total()}
                                </span>
                                <div
                                    style={{
                                        display: "flex",
                                        "flex-direction": "column",
                                        padding: "0.5rem",
                                        flex: "1",
                                        gap: "1rem",
                                    }}
                                >
                                    <RadioController
                                        rbLabels={[
                                            "Dinheiro",
                                            "Débito",
                                            "Crédito",
                                            "Boleto",
                                            "Pix",
                                        ]}
                                        controllerContainerProps={{
                                            style: "margin-bottom: 0",
                                        }}
                                        setCurrentOption={(option) => {
                                            setPaymentMethod(option);
                                            setMonthlyInterest(0);
                                        }}
                                        clean={() => cancelled()}
                                    />
                                    <Show when={paymentMethod() === "Crédito"}>
                                        <div class="credit-installment-container">
                                            <div
                                                style={{
                                                    display: "flex",
                                                    "flex-direction": "column",
                                                    flex: "1",
                                                    gap: "0.2rem",
                                                }}
                                            >
                                                <label
                                                    style={{ "font-size": "0.9rem" }}
                                                >
                                                    Parcelado em:
                                                    <span
                                                        style={{
                                                            "font-size": "0.8rem",
                                                            "font-weight": "normal",
                                                        }}
                                                    >
                                                        {" "}
                                                        *
                                                    </span>
                                                </label>
                                                <Select
                                                    valueKey="number"
                                                    descriptionKey="number"
                                                    options={installments}
                                                    onTextInput={null}
                                                    onTextChange={null}
                                                    onSelectChange={(e) =>
                                                        setNumberOfInstallments(e)
                                                    }
                                                />
                                            </div>

                                            <TextInput
                                                title="Juros ao mês (%):"
                                                required={true}
                                                placeholder="Digite o valor do juros mensal."
                                                placeholderOnError="O valor do juros é inválido."
                                                disabled={false}
                                                onChange={(e) =>
                                                    setMonthlyInterest(e)
                                                }
                                                onValidate={(e) => {}}
                                                value={monthlyInterest}
                                                containerProps={{
                                                    style: "flex: 1; margin: 0",
                                                }}
                                                labelProps={{
                                                    style: "font-size: 0.9rem",
                                                }}
                                                inputProps={{
                                                    type: "number",
                                                    min: "0",
                                                    max: "100",
                                                    step: "1",
                                                }}
                                            />
                                        </div>
                                    </Show>
                                </div>
                                <div class="total-change-container">
                                    <TextInput
                                        title="Recebido"
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
                                            (clientIncome() - total()).toFixed(2)
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
                            <div class="total-buttons-container">
                                <button
                                    class="finish-buttons"
                                    onClick={() => handleCancelSale()}
                                >
                                    Cancelar
                                </button>
                                <button
                                    class="finish-buttons"
                                    onClick={() => handleFinishSale()}
                                >
                                    Finalizar
                                </button>
                            </div>
                        </div>
                    </div>
                </Hider>
            </div>
        </div>
    );
}

import { createEffect, createSignal } from "solid-js";

import Hider from "~/components/Hider/Hider";
import Table from "~/components/Table/Table";
import TextInput from "~/components/TextInput/TextInput";

import "./sales-page.css";

import ClientCard from "~/layouts/ClientCard/ClientCard";
import Select from "~/components/Select/Select";

export default function SalesPage() {
    const labels = [
        { label: "Cód.", key: "productCode" },
        { label: "Nome", key: "productName" },
        { label: "Qtd.", key: "quantity" },
        { label: "Preço", key: "price" },
        { label: "Desconto", key: "discount" },
        { label: "Total", key: "total" },
    ];

    const [productList, setProductList] = createSignal([]);

    const [client, setClient] = createSignal({});

    const [searchOptions, setSearchOptions] = createSignal([]);
    const [searchedProduct, setSearchedProduct] = createSignal("");
    const [selectedSearchProduct, setSelectedSearchProduct] = createSignal("");
    const [isSelectLoading, setIsSelectLoading] = createSignal(false);
    const [isScanMode, setIsScanMode] = createSignal(false);

    async function handleSearchTextChange() {
        //fetch options
        setIsSelectLoading(true);
        setTimeout(() => {
            setSearchOptions([
                { id: 1, description: "teste" },
                { id: 2, description: "teste2" },
            ]);
            setSearchedProduct("");
            if (isScanMode()) setSearchOptions((prev) => [prev[0]]);
            setIsSelectLoading(false);
        }, 2000);
    }

    async function handleSearchSelectChange() {
        console.log(selectedSearchProduct());
    }

    async function handleSelectButtonClick() {
        setIsScanMode((prev) => !prev);
    }

    createEffect(() => {
        console.log(client());
    }, [client]);

    return (
        <div style={{ "padding-left": "0.5rem", "padding-right": "1rem" }}>
            <h1 class="title-page">Vendas</h1>
            <div style={{ "padding-left": "1.5rem", "padding-top": "0.5rem" }}>
                <h3 style={{ margin: "0" }}>Cadastro</h3>
                <Hider content="Abrir o Cadastro" show={false}>
                    <div class="sales-components-container">
                        <div
                            style={{
                                display: "flex",
                                "flex-direction": "column",
                                flex: "1",
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
                        </div>
                        <div
                            style={{
                                display: "flex",
                                "flex-direction": "column",
                                flex: "1",
                            }}
                        >
                            <div
                                style={{
                                    flex: 1,
                                    display: "flex",
                                    "flex-direction": "row",
                                }}
                            >
                                <ClientCard getClientData={(e) => setClient(e)} />
                            </div>
                            <div
                                style={{
                                    flex: 1,
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
                            <div
                                style={{
                                    flex: 2,
                                    display: "flex",
                                    "flex-direction": "row",
                                }}
                            ></div>
                        </div>
                    </div>
                </Hider>
            </div>
        </div>
    );
}

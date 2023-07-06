import { createSignal } from "solid-js";

import Hider from "~/components/Hider/Hider";
import Table from "~/components/Table/Table";
import TextInput from "~/components/TextInput/TextInput";

import "./sales-page.css";

import ClientCard from "~/layouts/ClientCard/ClientCard";

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
            productCode: "3095820",
            productName: "Switch Lite",
            quantity: 1,
            price: (1920.5).toFixed(2),
            discount: 0.2,
            total: 1536.4,
        },
        {
            productCode: "3095232",
            productName: "Playstation 4",
            quantity: 1,
            price: (3900.0).toFixed(2),
            discount: 0.1,
            total: 3510,
        },
        {
            productCode: "3094198",
            productName: "Costela Bovina Wagyu",
            quantity: 1,
            price: (1000.0).toFixed(2),
            discount: 0,
            total: 1000,
        },
    ]);

    const [searchProduct, setSearchProduct] = createSignal("");

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
                                <ClientCard />
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

import { createSignal } from "solid-js";

import Hider from "~/components/Hider/Hider";
import Table from "~/components/Table/Table";

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

    return (
        <div style={{ "padding-left": "0.5rem", "padding-right": "1rem" }}>
            <h1 class="title-page">Vendas</h1>
            <div style={{ "padding-left": "1.5rem", "padding-top": "0.5rem" }}>
                <h3 style={{ margin: "0" }}>Cadastro</h3>
                <Hider content="Abrir o Cadastro" show={false}>
                    <Table
                        title="Lista de Produtos"
                        labels={labels}
                        data={productList}
                        remove={(obj) =>
                            setProductList((prev) =>
                                prev.filter((o) => o.productCode != obj.productCode)
                            )
                        }
                    />
                </Hider>
            </div>
        </div>
    );
}

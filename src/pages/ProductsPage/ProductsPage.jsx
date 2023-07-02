import { Show, createSignal } from "solid-js";

import ProductCard from "~/layouts/ProductCard/ProductCard";
import Hider from "~/components/Hider/Hider";

import ShowTab from "@phosphor-icons/core/assets/regular/caret-circle-right.svg";
import HideTab from "@phosphor-icons/core/assets/regular/caret-circle-down.svg";

import "./products-page.css";

export default function ProductsPage() {
    return (
        <div
            style={{
                "padding-left": "0.5rem",
                "padding-right": "1rem",
            }}
        >
            <h1 class="title-page">Produtos</h1>
            <div style={{ "padding-left": "1.5rem", "padding-top": "0.5rem" }}>
                <h3 style={{ margin: "0" }}>Cadastro</h3>
                <Hider content="Abrir o Cadastro">
                    <ProductCard />
                </Hider>
                <br />
                <h3 style={{ margin: "0" }}>Listagem</h3>
                <Hider content="Abrir a Listagem"></Hider>
            </div>
        </div>
    );
}

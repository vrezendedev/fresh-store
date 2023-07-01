import ProductCard from "~/layouts/ProductCard/ProductCard";

import ShowTab from "@phosphor-icons/core/assets/regular/caret-circle-right.svg";
import HideTab from "@phosphor-icons/core/assets/regular/caret-circle-down.svg";

import "./products.css";
import { Show, createSignal } from "solid-js";

export default function Products() {
    const [showCreateProduct, setShowCreateProduct] = createSignal(false);

    return (
        <div
            style={{
                width: "97%",
            }}
        >
            <h1 class="title-page">Produtos</h1>
            <div style={{ "padding-left": "1rem" }}>
                <h3 style={{ margin: "0" }}>Cadastro</h3>
                <div class="create-product-show-btn-div">
                    <div>
                        <button
                            onClick={() => {
                                setShowCreateProduct((prev) => !prev);
                            }}
                        >
                            <img
                                src={showCreateProduct() ? HideTab : ShowTab}
                                draggable={false}
                                role="button"
                                alt="Abrir aba Cadastro"
                            />
                        </button>
                    </div>

                    <div
                        style={{
                            "background-color": "black",
                            width: "100vw",
                            height: "2px",
                            "box-shadow": showCreateProduct()
                                ? "0px 4px 10px 1px rgba(0,0,0, 0.25)"
                                : "none",
                        }}
                    ></div>
                </div>

                <Show when={showCreateProduct()}>
                    <div class="create-product-div">
                        <ProductCard />
                    </div>
                </Show>
            </div>
        </div>
    );
}

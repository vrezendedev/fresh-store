import { createEffect, createSignal, onMount } from "solid-js";

import View from "@phosphor-icons/core/assets/regular/info.svg";
import Update from "@phosphor-icons/core/assets/regular/floppy-disk.svg";
import Delete from "@phosphor-icons/core/assets/regular/trash.svg";
import Create from "@phosphor-icons/core/assets/regular/plus.svg";
import SearchImage from "@phosphor-icons/core/assets/regular/image-square.svg";
import Placeholder from "@phosphor-icons/core/assets/regular/placeholder.svg";

import TextInput from "~/components/TextInput/TextInput";
import TextArea from "~/components/TextArea/TextArea";

import "./product-card.css";

const modesButtons = [
    {
        mode: "view",
        alternateMode: "view",
        img: View,
        alt: "Usuário só pode visualizar os dados do produto.",
    },
    {
        mode: "update",
        alternateMode: "update",
        img: Update,
        alt: "Usuário pode alterar os dados do produto.",
    },
    {
        mode: "update",
        alternateMode: "delete",
        img: Delete,
        alt: "Usuário pode deletar o produto.",
    },
    {
        mode: "create",
        alternateMode: "create",
        img: Create,
        alt: "Usuário pode criar um novo produto.",
    },
];

export default function ProductCard({
    id = null,
    name = "",
    code = "",
    description = "",
    price = 0,
    stock = 0,
    mode = "create",
}) {
    const [productImage, setProductImage] = createSignal(Placeholder);
    const [productName, setProductName] = createSignal(name);
    const [productCode, setProductCode] = createSignal(code);
    const [productDescription, setProductDescription] = createSignal(description);
    const [productPrice, setProductPrice] = createSignal(price);
    const [productStock, setProductStock] = createSignal(stock);
    const [productDataChange, setProductDataChanged] = createSignal(false);

    onMount(async () => {
        if (id != null) {
            //fetch img
        }
    });

    function updateProduct() {
        console.log("Product updated.");
    }

    function deleteProduct() {
        console.log("Product deleted.");
    }

    function createProduct() {
        console.log("Product created.");
    }

    function changeProductImage() {
        console.log("Product image changed.");
    }

    function generateModeButtons(obj) {
        if (obj.mode != mode) return;

        let btnFunction = () => {};

        switch (obj.alternateMode) {
            case "update":
                btnFunction = updateProduct;
                break;

            case "delete":
                btnFunction = deleteProduct;
                break;

            case "create":
                btnFunction = createProduct;
                break;

            default:
                btnFunction = () => {};
                break;
        }

        return (
            <button
                disabled={
                    mode == "view" ||
                    (obj.alternateMode == "update" && !productDataChange())
                }
                onClick={() => btnFunction()}
            >
                <img
                    draggable={false}
                    src={obj.img}
                    style={{
                        opacity:
                            obj.alternateMode == "update" && !productDataChange()
                                ? "0.5"
                                : "1",
                        cursor: obj.mode != "view" ? "pointer" : "default",
                    }}
                />
            </button>
        );
    }

    return (
        <div class="product-card-div">
            <div class="product-info-div">
                <div class="product-left-div">
                    <div class="product-img-div">
                        <img
                            class="product-img"
                            src={
                                productImage() == null ? Placeholder : productImage()
                            }
                            draggable={false}
                            alt="Imagem do Produto"
                        />
                        <img
                            class="product-change-img"
                            src={SearchImage}
                            draggable={false}
                            alt="Alterar Imagem do Produto"
                            role="button"
                            onClick={() => changeProductImage()}
                        />
                    </div>
                </div>
                <div class="product-name-description-div">
                    <div class="product-name-div">
                        <div class="product-name-div-inputs">
                            <TextInput
                                title="Nome"
                                required={["create", "update"].includes(mode)}
                                placeholder="Nome do Produto."
                                placeholderOnError="Nome é inválido."
                                onChange={(e) => setProductName(e)}
                                onValidate={(e) => {}}
                                inputProps={{
                                    type: "text",
                                    value: productName(),
                                }}
                            />
                            <TextInput
                                title="Código"
                                required={false}
                                placeholder="Código do Produto."
                                placeholderOnError="Nome é inválido."
                                onChange={(e) => setProductCode(e)}
                                onValidate={(e) => {}}
                                inputProps={{
                                    type: "text",
                                    value: productCode(),
                                }}
                            />
                        </div>
                        <div class="product-name-div-inputs">
                            <TextInput
                                title="Preço"
                                required={false}
                                placeholder="0"
                                placeholderOnError="Preço é inválido."
                                onChange={(e) => setProductPrice(e)}
                                onValidate={(e) => {}}
                                inputProps={{
                                    type: "number",
                                    step: "0.1",
                                    value: productPrice(),
                                }}
                            />
                            <TextInput
                                title="Qtd."
                                required={false}
                                placeholder="0"
                                placeholderOnError="Qtd. é inválida."
                                onChange={(e) => setProductStock(e)}
                                onValidate={(e) => {}}
                                inputProps={{
                                    type: "number",
                                    step: "1",
                                    value: productStock(),
                                }}
                            />
                        </div>
                    </div>
                    <div class="product-description">
                        <TextArea
                            title="Descrição"
                            required={false}
                            placeholder="Campo para descrição ou observações."
                            placeholderOnError="Descrição ultrapassou o limite de caractéres"
                            onChange={(e) => setProductDescription(e)}
                            onValidate={(e) => {}}
                            inputProps={{
                                value: productDescription(),
                                style: "height: 194px",
                            }}
                            containerProps={{
                                style: "padding-left: 0.2rem",
                            }}
                        />
                    </div>
                </div>
            </div>
            <div class="product-mode-div">
                <For each={modesButtons}>{(obj) => generateModeButtons(obj)}</For>
            </div>
        </div>
    );
}

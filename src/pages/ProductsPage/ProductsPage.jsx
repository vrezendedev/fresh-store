import { createEffect, createSignal, onMount } from "solid-js";

import ProductCard from "~/layouts/ProductCard/ProductCard";
import RadioController from "~/components/RadioController/RadioController";
import Hider from "~/components/Hider/Hider";
import TextInput from "~/components/TextInput/TextInput";
import InfiniteScroll from "~/components/InfiniteScroll/InfiniteScroll";

import Search from "@phosphor-icons/core/assets/regular/magnifying-glass.svg";

import "./products-page.css";

export default function ProductsPage() {
    const [productFilterBy, setProductFilterBy] = createSignal("");
    const [filterContent, setFilterContent] = createSignal("");
    const [page, setPage] = createSignal(1);
    const [isLoading, setIsLoading] = createSignal(false);
    const [fetchedListData, setFetchedListData] = createSignal([]);

    onMount(() => {
        setIsLoading(true);
        fetchListData();
    });

    async function fetchListData() {
        if (page() == -1) return;

        if (filterContent().length > 0) await searchFiltered();
        //else fetchNonFiltered
        //await fetch
        //if returns [] then setPage(-1)
        //else setPage((prev) => prev + 1)
        //setIsLoading(false)
        else
            setTimeout(() => {
                for (let i = 0; i < page(); i++) {
                    setFetchedListData((prev) => [...prev, { id: i }]);
                }
                setPage((prev) => prev + 1);
                setIsLoading(false);

                if (page() == 5) setPage(-1);
            }, 3000);
    }

    async function searchFiltered() {
        console.log("Searching filtered");
    }

    function setListFilter() {
        return (
            <div
                style={{
                    display: "flex",
                    "flex-direction": "row",
                    "align-items": "center",
                    "margin-right": 0,
                }}
            >
                <TextInput
                    title=""
                    required={false}
                    placeholder={""}
                    placeholderOnError="Filtro inválido."
                    onChange={(e) => setFilterContent(e)}
                    containerProps={{
                        style: "margin-left: 0; padding-left: 0;",
                    }}
                    inputProps={{
                        type: "text",
                        value: filterContent(),
                        style: "margin: 0; padding: 0; padding-left:0.5rem;  ",
                    }}
                />
                <img
                    class="clickable-image"
                    src={Search}
                    role="button"
                    alt="Pesquisar"
                    onClick={() => searchFiltered()}
                    style={{
                        width: "24px",
                        padding: "0.2rem",
                        "margin-right": "1rem",
                    }}
                />
            </div>
        );
    }

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
                <Hider content="Abrir o Cadastro" show={true}>
                    <ProductCard />
                </Hider>
                <br />
                <h3 style={{ margin: "0" }}>Listagem</h3>
                <Hider content="Abrir a Listagem" show={true}>
                    <div class="list-filter-div">
                        <RadioController
                            isFilter={true}
                            filter={() => setListFilter()}
                            rbLabels={["Código", "Nome"]}
                            setCurrentOption={(option) => setProductFilterBy(option)}
                        />
                    </div>
                    <InfiniteScroll
                        isLoading={isLoading}
                        setLoading={(value) => setIsLoading(value)}
                        goFetch={() => fetchListData()}
                        isEnded={() => page() == -1}
                        children={() => (
                            <For each={fetchedListData()}>
                                {(obj) => (
                                    <ProductCard
                                        id={obj.id}
                                        mode="update"
                                    ></ProductCard>
                                )}
                            </For>
                        )}
                    />
                </Hider>
            </div>
        </div>
    );
}

import { createSignal, onMount } from "solid-js";

import Hider from "~/components/Hider/Hider";
import CreateExchange from "~/layouts/CreateExchange/CreateExchange";
import ExchangeCard from "~/layouts/ExchangeCard/ExchangeCard";
import TextInput from "~/components/TextInput/TextInput";
import InfiniteScroll from "~/components/InfiniteScroll/InfiniteScroll";

import Search from "@phosphor-icons/core/assets/regular/magnifying-glass.svg";
import Filter from "@phosphor-icons/core/assets/regular/funnel.svg";

import "./exchanges-page.css";
export default function ExchangesPage() {
    const [filterContent, setFilterContent] = createSignal("");
    const [page, setPage] = createSignal(1);
    const [isLoading, setIsLoading] = createSignal(false);
    const [fetchedListData, setFetchedListData] = createSignal([]);

    onMount(() => {
        setIsLoading(true);
        fetchListData();
    });

    async function searchFiltered() {
        //reset page to 0
        console.log("Searching filtered");
    }

    async function fetchListData() {
        if (page() == -1) return;
        //if (filterContent().length > 0) fetchFiltered
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

    return (
        <div style={{ "padding-left": "0.5rem", "padding-right": "1rem" }}>
            <h1 class="title-page">Trocas </h1>
            <div style={{ "padding-left": "1.5rem", "padding-top": "0.5rem" }}>
                <h3 style={{ margin: "0" }}>Cadastrar {`(1:1)`}</h3>
                <Hider content="Abrir e Cadastrar" show={false}>
                    <CreateExchange />
                </Hider>
                <br />
                <h3 style={{ margin: "0" }}>Consultar</h3>
                <Hider
                    content="Abrir e Consultar"
                    show={false}
                    childrenStyle={{
                        style: "flex: 1; flex-direction: row; display: flex;",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            "flex-direction": "column",
                            width: "100%",
                            gap: "1rem",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                "flex-direction": "row",
                                "justify-content": "center",
                                "align-self": "center",
                                padding: "1rem",
                                "border-radius": "10px",
                                "box-shadow": "0px 5px 10px 0px rgba(0, 0, 0, 0.2)",
                            }}
                        >
                            <img
                                src={Filter}
                                draggable={false}
                                alt="Filtro"
                                style={{
                                    width: "16px",
                                    height: "16px",
                                    "align-self": "center",
                                    "padding-right": "1rem",
                                }}
                            />
                            <TextInput
                                title=""
                                required={false}
                                placeholder={"Buscar por cód. da venda."}
                                placeholderOnError="Inválido."
                                onChange={(e) => setFilterContent(e)}
                                value={filterContent}
                                containerProps={{
                                    style: "margin-left: 0; padding-left: 0;",
                                }}
                                inputProps={{
                                    type: "text",
                                    style: "margin: 0; padding: 0; padding-left:0.5rem;",
                                }}
                            />
                            <img
                                src={Search}
                                role="button"
                                alt="Pesquisar"
                                onClick={() => searchFiltered()}
                                style={{
                                    width: "24px",
                                    height: "24px",
                                    "align-self": "center",
                                    cursor: "pointer",
                                }}
                            />
                        </div>
                        <InfiniteScroll
                            isLoading={isLoading}
                            setLoading={(value) => setIsLoading(value)}
                            goFetch={() => fetchListData()}
                            isEnded={() => page() == -1}
                            infiniteScrollContainerProps={{
                                style: "gap: 1rem",
                            }}
                            children={() => (
                                <For each={fetchedListData()}>
                                    {(obj) => <ExchangeCard />}
                                </For>
                            )}
                        />
                    </div>
                </Hider>
            </div>
        </div>
    );
}

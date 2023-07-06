import { For, onMount } from "solid-js";

import Delete from "@phosphor-icons/core/assets/regular/trash.svg";

import "./table.css";

export default function Table({
    title = "",
    labels = [],
    data = [],
    remove = null,
    tableContainerProps,
}) {
    const columns = labels.length + 1 + +(remove != null);

    return (
        <div class="table-component-div" {...tableContainerProps}>
            <p style={{ "font-size": "1rem", "font-weight": "bold" }}>{title}</p>
            <div
                class="table-container"
                style={{
                    "grid-template-columns": `repeat(${columns}, 1fr)`,
                }}
            >
                <span class="table-header">Núm.</span>
                <For each={labels}>
                    {(obj) => <span class="table-header">{obj.label}</span>}
                </For>
                <Show when={remove != null}>
                    <span class="table-header">Excluir</span>
                </Show>
            </div>
            <For each={data()}>
                {(obj, index) => (
                    <div
                        class="table-container"
                        style={{
                            "grid-template-columns": `repeat(${columns}, 1fr)`,
                            "background-color":
                                index() % 2 == 0 ? "rgba(0, 0, 0, 0.05)" : "white",
                        }}
                    >
                        <span class="table-row">{index() + 1}</span>
                        {labels.map(({ key }) => (
                            <span class="table-row">{obj[key]}</span>
                        ))}
                        <Show when={remove != null}>
                            <div
                                class="table-row"
                                style={{ "justify-content": "center" }}
                            >
                                <img
                                    src={Delete}
                                    role="button"
                                    alt="Deletar"
                                    onClick={() => remove(obj)}
                                    style={{
                                        width: "24px",
                                        cursor: "pointer",
                                    }}
                                />
                            </div>
                        </Show>
                    </div>
                )}
            </For>
        </div>
    );
}

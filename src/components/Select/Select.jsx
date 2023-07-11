import { Show, createSignal } from "solid-js";

import Barcode from "@phosphor-icons/core/assets/regular/barcode.svg";
import Spinner from "@phosphor-icons/core/assets/regular/spinner.svg";

import "./select.css";

export default function Select({
    valueKey = "",
    descriptionKey = "",
    isLoading = () => {},
    options = () => {},
    textInputValue = () => {},
    onTextInput = () => {},
    onTextChange = () => {},
    onSelectChange = () => {},
    hasButton = false,
    onButtonClick = () => {},
    containerProps = {},
}) {
    const [buttonPressed, setButtonPressed] = createSignal(false);

    return (
        <div class="select-container" {...containerProps}>
            <Show when={onTextInput != null}>
                <input
                    value={textInputValue()}
                    onInput={() => onTextInput()}
                    onChange={(e) => {
                        e.target.value = e.target.value.trim();
                        if (e.target.value.length == 0) return;
                        onTextChange(e.target.value);
                    }}
                />
            </Show>
            <select onChange={(e) => onSelectChange(e.target.value)}>
                <For each={options()}>
                    {(obj) => (
                        <option value={obj[valueKey]}>{obj[descriptionKey]}</option>
                    )}
                </For>
            </select>
            <Show when={isLoading()}>
                <img
                    class="loading"
                    draggable={false}
                    src={Spinner}
                    style={{ width: "24px", "align-self": "center" }}
                />
            </Show>
            <Show when={hasButton && !isLoading()}>
                <img
                    src={Barcode}
                    role="button"
                    alt="Modo Barras"
                    draggable={false}
                    onClick={() => {
                        setButtonPressed((prev) => !prev);
                        onButtonClick();
                    }}
                    style={{
                        width: "24px",
                        height: "24px",
                        padding: "0.1rem",
                        cursor: "pointer",
                        "align-self": "center",
                        "border-radius": "5px",
                        "background-color": buttonPressed()
                            ? "rgba(0, 0, 0, 0.2)"
                            : "",
                    }}
                />
            </Show>
        </div>
    );
}

import { For, createEffect, createSignal } from "solid-js";

import Filter from "@phosphor-icons/core/assets/regular/funnel.svg";
import RadioButton from "../RadioButton/RadioButton";

import "./radio-controller.css";

export default function RadioController({
    rbLabels = [],
    filter = null,
    setCurrentOption = () => {},
    controllerContainerProps,
    radioContainerProps,
}) {
    const [currentChecked, setCurrentChecked] = createSignal("");

    createEffect(() => {
        setCurrentOption(currentChecked());
    }, [currentChecked]);

    return (
        <div class="radio-controller-container" {...controllerContainerProps}>
            <Show when={filter != null}>
                <img
                    src={Filter}
                    draggable={false}
                    alt="Filtro"
                    style={{ width: "16px" }}
                />
            </Show>
            <For each={rbLabels}>
                {(label) => (
                    <RadioButton
                        label={label}
                        checked={currentChecked}
                        onCheck={(value) => setCurrentChecked(value)}
                        containerProps={radioContainerProps}
                    />
                )}
            </For>
            {filter()}
        </div>
    );
}

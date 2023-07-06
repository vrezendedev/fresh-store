import { Show, createSignal, createEffect } from "solid-js";

import ShowTab from "@phosphor-icons/core/assets/regular/caret-circle-right.svg";
import HideTab from "@phosphor-icons/core/assets/regular/caret-circle-down.svg";

import "./hider.css";

export default function Hider(props) {
    const [showComponent, setShowComponent] = createSignal(props.show ?? false);

    return (
        <div>
            <div class="hider-show-btn-div">
                <div>
                    <button
                        onClick={() => {
                            setShowComponent((prev) => !prev);
                        }}
                    >
                        <img
                            src={showComponent() ? HideTab : ShowTab}
                            draggable={false}
                            role="button"
                            alt={props.content}
                        />
                    </button>
                </div>
                <div
                    style={{
                        "background-color": "black",
                        width: "100vw",
                        height: "2px",
                        "box-shadow": showComponent()
                            ? "0px 4px 10px 1px rgba(0,0,0, 0.25)"
                            : "none",
                    }}
                />
            </div>
            <Show when={showComponent()}>
                <div class="children-div" {...props.childrenStyle}>
                    {props.children}
                </div>
            </Show>
        </div>
    );
}

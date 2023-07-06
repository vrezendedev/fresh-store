import { createSignal, onMount } from "solid-js";

import { useLogger } from "../../_contexts/UserContext";

import Palette from "@phosphor-icons/core/assets/regular/palette.svg";

import Logo from "./../../_resources/imgs/freshStoreLogo.png";

import "./header.css";

export default function Header() {
    const [user, { login, logout, setUserColor }] = useLogger();
    const [chooseColor, setChooseColor] = createSignal(false);
    const [colorChoosed, setColorChoosed] = createSignal(user().color);
    const [scroll, setScroll] = createSignal(window.scrollY);

    const scrollHandler = (e) => {
        setScroll(e.target.scrollTop);
    };

    const handleScroll = () => Math.abs(1 + (58 - scroll()) / 100 - 1);

    onMount(() => {
        let od = document.getElementById("overflow-div");
        od.addEventListener("scroll", scrollHandler);
    });

    return (
        <div
            class="header-div"
            style={{
                "background-color":
                    colorChoosed() != null ? colorChoosed() : "white",
            }}
        >
            <img
                src={
                    user().image != null
                        ? `data:image/jpeg;base64, ` + user().image
                        : Logo
                }
                alt="Logo da Empresa"
                draggable={false}
                style={{ width: "12rem", height: "auto" }}
            />
            <Show when={!chooseColor() && scroll() < 58}>
                <button
                    style={{
                        position: "absolute",
                        right: "8px",
                        width: "auto",
                        "background-color": "transparent",
                    }}
                    onClick={() => setChooseColor((prev) => !prev)}
                >
                    <img
                        src={Palette}
                        role="button"
                        draggable={false}
                        style={{
                            width: "24px",
                            opacity: scroll() == 0 ? 1 : handleScroll(),
                        }}
                    />
                </button>
            </Show>

            <Show when={chooseColor() && scroll() < 58}>
                <input
                    class="color-picker"
                    value={colorChoosed()}
                    onChange={(e) => {
                        setColorChoosed(e.target.value);
                        setUserColor(e.target.value);
                        setChooseColor(false);
                    }}
                    type="color"
                    style={{ opacity: scroll() == 0 ? 1 : handleScroll() }}
                />
            </Show>
        </div>
    );
}

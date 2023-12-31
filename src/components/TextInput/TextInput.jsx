import { createSignal } from "solid-js";

import EyeOpened from "@phosphor-icons/core/assets/regular/eye.svg";
import EyeClosed from "@phosphor-icons/core/assets/regular/eye-slash.svg";

import "./text-input.css";

export default function TextInput({
    title,
    required = false,
    placeholder,
    placeholderOnError = "Obrigatório preencher esse campo.",
    onChange = (e) => {},
    onValidate = () => {
        return false;
    },
    value = () => {},
    labelProps,
    containerProps,
    inputProps,
}) {
    const [hasError, setHasError] = createSignal(false);
    const [showPassword, setShowPassword] = createSignal(false);

    return (
        <div class="text-input-div" {...containerProps}>
            <Show when={typeof title == "function" ? title() != "" : title != 0}>
                <label {...labelProps}>
                    {typeof title == "function" ? title() : title}
                    <span
                        style={{
                            "font-size": "0.8rem",
                            "font-weight": "normal",
                        }}
                    >
                        {required ? " *" : ""}
                    </span>
                </label>
            </Show>
            <div
                style={{
                    display: "flex",
                    "flex-direction": "row",
                    "align-items": "center",
                    gap: "0.3rem",
                }}
            >
                <input
                    value={value()}
                    placeholder={!hasError() ? placeholder : placeholderOnError}
                    onChange={(e) => {
                        e.target.value = e.target.value.trim();
                        onChange(e.target.value);
                        setHasError(onValidate(e.target.value));
                    }}
                    style={{
                        border: !hasError() ? "none" : "red solid 1px",
                        flex: "10",
                    }}
                    {...inputProps}
                    type={
                        inputProps.type == "password" && showPassword()
                            ? "text"
                            : inputProps.type
                    }
                    class={inputProps.type == "password" ? "has-password" : ""}
                />
                <Show when={inputProps.type == "password"}>
                    <button class="btn-password-visibility">
                        <img
                            draggable={false}
                            alt="Mostrar ou Esconder Senha"
                            onClick={() => setShowPassword((prev) => !prev)}
                            src={showPassword() ? EyeOpened : EyeClosed}
                        />
                    </button>
                </Show>
            </div>
        </div>
    );
}

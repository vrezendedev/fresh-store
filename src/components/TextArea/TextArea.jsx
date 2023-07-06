import { createSignal } from "solid-js";

import "./textarea.css";

export default function TextArea({
    title,
    required = false,
    placeholder,
    placeholderOnError = "Obrigatório preencher esse campo.",
    onChange = (e) => {},
    onValidate = () => {
        return false;
    },
    value,
    containerProps,
    inputProps,
}) {
    const [hasError, setHasError] = createSignal(false);

    return (
        <div class="text-area-div" {...containerProps}>
            <label>
                {title}
                <span
                    style={{
                        "font-size": "0.8rem",
                        "font-weight": "normal",
                    }}
                >
                    {required ? " *" : ""}
                </span>
            </label>
            <div
                style={{
                    display: "flex",
                    "flex-direction": "column",
                    "align-items": "center",
                }}
            >
                <textarea
                    placeholder={!hasError() ? placeholder : placeholderOnError}
                    onChange={(e) => {
                        e.target.value = e.target.value.trim();
                        onChange(e.target.value);
                        setHasError(onValidate(e.target.value));
                    }}
                    style={{
                        border: !hasError() ? "none" : "red solid 1px",
                    }}
                    value={value()}
                    {...inputProps}
                    class="text-area-input"
                />
            </div>
        </div>
    );
}

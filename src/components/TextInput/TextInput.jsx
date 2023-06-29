import { createEffect, createSignal } from "solid-js";
import "./text-input.css";

export default function TextInput({
  title = "",
  required = false,
  placeholder,
  placeholderOnError = "Obrigatório preencher esse campo.",
  onChange = (e) => {},
  onValidate = () => {
    return false;
  },
  containerProps,
  inputProps,
}) {
  const [hasError, setHasError] = createSignal(false);

  return (
    <div class="text-input-div" {...containerProps}>
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
      <input
        placeholder={!hasError() ? placeholder : placeholderOnError}
        onChange={(e) => {
          e.target.value = e.target.value.trim();
          onChange(e.target.value);
          setHasError(onValidate(e.target.value));
        }}
        style={{
          border: !hasError() ? "none" : "red solid 1px",
        }}
        {...inputProps}
      />
    </div>
  );
}

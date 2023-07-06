import RadioCircle from "@phosphor-icons/core/assets/regular/radio-button.svg";
import CheckCircle from "@phosphor-icons/core/assets/regular/check-circle.svg";

import "./radio-button.css";

export default function RadioButton({
    label = "Label",
    checked,
    onCheck = () => {},
    containerProps,
}) {
    return (
        <div class="radio-button-container" {...containerProps}>
            <img
                class="clickable-image"
                src={checked() == label ? CheckCircle : RadioCircle}
                draggable={false}
                role="button"
                onClick={() => {
                    if (checked() == label) onCheck("");
                    else onCheck(label);
                }}
                alt={`Selecionar ${label}`}
            />
            <span>{label}</span>
        </div>
    );
}

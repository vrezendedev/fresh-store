import { createEffect, createSignal } from "solid-js";

import { useLogger } from "../../_contexts/UserContext";

import TextInput from "../../components/TextInput/TextInput";

import LoginImg from "../../_resources/imgs/login.png";

import "./login.css";

export default function Login() {
    const [user, { login, logout }] = useLogger();
    const [email, setEmail] = createSignal("");
    const [password, setPassword] = createSignal("");
    const [cannotAccess, setCannotAccess] = createSignal(true);

    function onValidate(e) {
        if (e == undefined || e?.trim().length == 0) return true;
        else return false;
    }

    async function handleClickOnAccessButton() {
        let res = await login(email(), password());
        if (res != null) {
            //show error modal
        }
    }

    createEffect(() => {
        if (email().length == 0 || password().length == 0) setCannotAccess(true);
        else setCannotAccess(false);
    }, [email, password]);

    return (
        <div class="login-card">
            <div style={{ display: "flex", "justify-content": "center" }}>
                <img
                    id="login-img"
                    src={LoginImg}
                    alt="Colaboradora confirmando entrega."
                    draggable={false}
                />
            </div>
            <TextInput
                title="E-mail"
                required={true}
                placeholder="Digite seu e-mail."
                placeholderOnError="Campo necessário para Login."
                onChange={(e) => setEmail(e)}
                onValidate={(e) => onValidate(e)}
                inputProps={{ type: "text" }}
            />
            <TextInput
                title="Senha"
                required={true}
                placeholder="Digite sua senha."
                placeholderOnError="Campo necessário para Login."
                onChange={(e) => setPassword(e)}
                onValidate={(e) => onValidate(e)}
                inputProps={{ type: "password" }}
                containerProps={{
                    style: "margin-top: 0; margin-bottom: 0.2rem",
                }}
            />
            <div style={{ margin: "0.5rem" }}>
                <button
                    disabled={cannotAccess()}
                    onClick={() => handleClickOnAccessButton()}
                >
                    Acessar
                </button>
            </div>
        </div>
    );
}

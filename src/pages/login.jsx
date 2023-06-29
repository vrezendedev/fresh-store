import { createSignal, onMount } from "solid-js";

import { useLogger } from "../_contexts/UserContext";

import TextInput from "../components/TextInput/TextInput";

import "./../styles/login.css";

import LoginImg from "../_resources/imgs/login.png";

export default function Login() {
  const [user, { login, logout }] = useLogger();
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");

  function onValidate(e) {
    if (e == undefined || e?.trim().length == 0) return true;
    else return false;
  }

  async function handleClickOnAccessButton() {
    if (email().length == 0 || password().length == 0) return;
    let res = await login(email(), password());
    if (res != null) {
      //show error modal
    }
  }

  onMount(() => {
    onValidate(" ");
  });

  return (
    <main>
      <div class="login-card">
        <div style={{ display: "flex", "justify-content": "center" }}>
          <img src={LoginImg} style={{ width: "250px" }} />
        </div>
        <TextInput
          title="E-mail"
          required={true}
          placeholder="Digite seu e-mail."
          placeholderOnError="Insira esse campo para realizar o Login."
          onChange={(e) => setEmail(e)}
          onValidate={(e) => onValidate(e)}
          inputProps={{ type: "text" }}
        />
        <TextInput
          title="Senha"
          required={true}
          placeholder="Digite sua senha."
          placeholderOnError="Insira esse campo para realizar o Login."
          onChange={(e) => setPassword(e)}
          onValidate={(e) => onValidate(e)}
          inputProps={{ type: "password" }}
          containerProps={{ style: "margin-top: 0; margin-bottom: 0.2rem" }}
        />
        <div style={{ margin: "0.5rem" }}>
          <button style={{}} onClick={() => handleClickOnAccessButton()}>
            Acessar
          </button>
        </div>
      </div>
    </main>
  );
}

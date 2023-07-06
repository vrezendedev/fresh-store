import { createEffect, createSignal } from "solid-js";

import TextInput from "~/components/TextInput/TextInput";

import New from "@phosphor-icons/core/assets/regular/user-plus.svg";
import Found from "@phosphor-icons/core/assets/regular/user-focus.svg";
import Question from "@phosphor-icons/core/assets/regular/question.svg";
import Spinner from "@phosphor-icons/core/assets/regular/spinner.svg";

import "./client-card.css";

export default function ClientCard() {
    const [isSearching, setIsSearching] = createSignal(false);
    const [isNewClient, setIsNewClient] = createSignal(false);
    const [clientName, setClientName] = createSignal("");
    const [clientEmail, setClientEmail] = createSignal("");
    const [clientCPF, setClientCPF] = createSignal("");
    const [clientContact, setClientContact] = createSignal("");

    const currentImage = () => {
        if (clientCPF().length == 0) return Question;
        else if (isNewClient()) return New;
        else return Found;
    };

    async function fetchClient() {
        //fetch
        if (clientCPF().length == 0) return;
        console.log(clientCPF());
        setIsSearching(true);
        setTimeout(() => {
            setIsNewClient(true);
            setIsSearching(false);
        }, 2000);
    }

    return (
        <div class="client-card-div">
            <div class="client-card-header">
                <p style={{ "font-size": "1rem", "font-weight": "bold" }}>Cliente</p>
                <div
                    style={{
                        display: "flex",
                        "align-items": "center",
                        "justify-content": "center",
                    }}
                >
                    <Show when={isSearching()}>
                        <img
                            class="loading"
                            draggable={false}
                            src={Spinner}
                            style={{ width: "24px" }}
                        />
                    </Show>
                    <Show when={!isSearching()}>
                        <img
                            draggable={false}
                            style={{ width: "24px" }}
                            src={currentImage()}
                        />
                    </Show>
                </div>
            </div>
            <div class="client-info-div">
                <TextInput
                    title="Nome"
                    required={false}
                    placeholder="Digite o nome do cliente."
                    placeholderOnError="Nome do cliente inválido."
                    onChange={(e) => setClientName(e)}
                    onValidate={(e) => {}}
                    value={clientName}
                    containerProps={{
                        style: "padding-left: 0; margin-left: 0.5; flex: 1",
                    }}
                    labelProps={{
                        style: "font-size: 0.9rem",
                    }}
                    inputProps={{
                        type: "text",
                    }}
                />
                <TextInput
                    title="E-mail"
                    required={false}
                    placeholder="Digite o e-mail do cliente."
                    placeholderOnError="E-mail do cliente inválido."
                    onChange={(e) => setClientEmail(e)}
                    onValidate={(e) => {}}
                    value={clientEmail}
                    containerProps={{
                        style: "padding-left: 0; margin-left: 0.5; flex: 1",
                    }}
                    labelProps={{
                        style: "font-size: 0.9rem",
                    }}
                    inputProps={{
                        type: "text",
                    }}
                />
            </div>
            <div class="client-info-div">
                <TextInput
                    title="CPF"
                    required={true}
                    placeholder="Digite o CPF do cliente."
                    placeholderOnError="CPF do cliente inválido."
                    onChange={(e) => {
                        setClientCPF(e);
                        fetchClient();
                    }}
                    onValidate={(e) => {}}
                    value={clientCPF}
                    containerProps={{
                        style: "padding-left: 0; margin-left: 0.5; flex: 1;",
                    }}
                    labelProps={{
                        style: "font-size: 0.9rem",
                    }}
                    inputProps={{
                        type: "text",
                    }}
                />
                <TextInput
                    title="Contato"
                    required={false}
                    placeholder="Digite o tel. do cliente."
                    placeholderOnError="Tel. do cliente inválido."
                    onChange={(e) => setClientContact(e)}
                    onValidate={(e) => {}}
                    value={clientContact}
                    containerProps={{
                        style: "padding-left: 0; margin-left: 0.5; flex: 1",
                    }}
                    labelProps={{
                        style: "font-size: 0.9rem",
                    }}
                    inputProps={{
                        type: "text",
                    }}
                />
            </div>
        </div>
    );
}

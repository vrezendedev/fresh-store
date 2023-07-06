import { Title } from "solid-start";

import { HttpStatusCode } from "solid-start/server";

export default function NotFound() {
    return (
        <div>
            <Title>[404] Recurso não Encontrado.</Title>
            <HttpStatusCode code={404} />
            <h1 class="title-page">Ops, não foi encontrado o que procura...</h1>
            <div
                style={{
                    "padding-top": "1rem",
                    "padding-left": "1.25rem",
                    "padding-right": "1.25rem",
                    "text-align": "justify",
                }}
            >
                <p>A página requisitada não existe.</p>
                <p>
                    Caso tenha certeza do endereço da página inserido, informe seu
                    supervisor a fim que este entre em contato com a equipe Fresh
                    Store.
                </p>
                <span style={{ "padding-top": "1rem" }}>
                    <a href="/" style={{ color: "black" }}>
                        Clique aqui e retorne à página principal.
                    </a>
                </span>
            </div>
        </div>
    );
}

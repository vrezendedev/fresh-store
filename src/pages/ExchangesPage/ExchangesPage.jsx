import Hider from "~/components/Hider/Hider";
import CreateExchange from "~/layouts/CreateExchange/CreateExchange";

import "./exchanges-page.css";

export default function ExchangesPage() {
    return (
        <div style={{ "padding-left": "0.5rem", "padding-right": "1rem" }}>
            <h1 class="title-page">Trocas</h1>
            <div style={{ "padding-left": "1.5rem", "padding-top": "0.5rem" }}>
                <h3 style={{ margin: "0" }}>Cadastrar</h3>
                <Hider content="Abrir e Cadastrar" show={false}>
                    <CreateExchange />
                </Hider>
                <br />
                <h3 style={{ margin: "0" }}>Consultar</h3>
                <Hider content="Abrir e Consultar" show={false}></Hider>
            </div>
        </div>
    );
}

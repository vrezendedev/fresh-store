import TextArea from "~/components/TextArea/TextArea";
import "./exchange-card.css";

export default function ExchangeCard({
    exchangeID = "0",
    saleID = "0",
    seller = "",
    client = "",
    replaceableProduct = "",
    subtituteProduct = "",
    diff = "0",
    reason = "",
}) {
    return (
        <div class="exchange-card">
            <div class="title-exchange-card">
                <label>{`Venda [${saleID}]`}</label>
                <label>{`Troca [${exchangeID}]`}</label>
            </div>
            <div class="info-exchange-card">
                <div class="info-exchange-card-child">
                    <label class="info-exchange-card-child-lb">
                        Vendedor: {`${seller}`}
                    </label>
                    <label class="info-exchange-card-child-lb">
                        Cliente: {`${client}`}
                    </label>
                    <label class="info-exchange-card-child-lb">
                        Prod. Substituído: {`${replaceableProduct}`}
                    </label>
                    <label class="info-exchange-card-child-lb">
                        Novo Prod.: {`${subtituteProduct}`}
                    </label>
                </div>
                <div class="info-exchange-card-child" style={{ gap: "0 " }}>
                    <TextArea
                        title="Motivo"
                        required={true}
                        placeholder=""
                        placeholderOnError=""
                        onChange={(e) => {}}
                        onValidate={(e) => {}}
                        value={() => reason}
                        labelProps={{
                            style: "padding-left: 0.2rem; font-size: 0.8rem; box-shadow: none",
                        }}
                        inputProps={{
                            disabled: true,
                            style: "height: 165px; padding: 0.5rem; padding-bottom: 0; box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.2)",
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

import { createSignal } from "solid-js";

import RadioController from "~/components/RadioController/RadioController";
import Select from "~/components/Select/Select";

import "./create-exchange.css";
import TextArea from "~/components/TextArea/TextArea";
import TextInput from "~/components/TextInput/TextInput";

export default function CreateExchange() {
    const [searchOption, setSearchOption] = createSignal("");
    const [cancelled, setCancelled] = createSignal(false);

    const [searchedSale, setSearchedSale] = createSignal("");
    const [selectedSearchSale, setSelectedSearchSale] = createSignal(null);
    const [optionsSearchSale, setOptionsSearchSale] = createSignal([]);
    const [isSearchSaleLoading, setIsSearchSaleLoading] = createSignal(false);

    const [replaceableOptions, setReplaceableOptions] = createSignal([]);
    const [replaceableProduct, setReplaceableProduct] = createSignal(null);
    const [replaceableProductQuant, setReplaceableProductQuant] = createSignal(0);

    const [searchedSubtitute, setSearchedSubstitute] = createSignal("");
    const [selectedSubstitute, setSelectedSubstitute] = createSignal(null);
    const [optionsSubstitute, setOptionsSubstitute] = createSignal([]);
    const [isSearchSubsLoading, setIsSearchSubsLoading] = createSignal(false);
    const [isSearchSubScanMode, setIsSearchSubScanMode] = createSignal(false);
    const [substituteQuant, setSubstituteQuant] = createSignal(0);

    const [reason, setReason] = createSignal("");

    async function handleSearchSale() {}

    async function handleSearchSaleChange() {}

    async function handleReplaceableProductChange() {}

    async function handleSearchedSubstitute() {
        if (isSearchSubScanMode()) {
            setOptionsSubstitute((prev) => [prev[0]]);
            selectedSubstitute(optionsSubstitute()[0]);
        }
    }

    async function handleSubsituteProductChange() {}

    function handleSelectSubButtonClick() {
        setIsSearchSubScanMode((prev) => !prev);
    }

    function handleCancelExchange() {
        setCancelled(true);
        setSearchOption("");
        setSearchedSale("");
        setSelectedSearchSale(null);
        setOptionsSearchSale([]);
        setReplaceableOptions([]);
        setReplaceableProduct(null);
        setSearchedSubstitute("");
        setSelectedSubstitute(null);
        setOptionsSubstitute([]);
        setReason("");
        setCancelled(false);
    }

    function handleFinishExchange() {}

    return (
        <div class="create-exchange-container">
            <div
                style={{
                    display: "flex",
                    "flex-direction": "row",
                    "justify-content": "center",
                }}
            >
                <div class="create-exchange-search-container">
                    <div class="create-exchange-search-label-container ">
                        <label style={{ "font-size": "0.9rem" }}>
                            Buscar Venda por:{" "}
                        </label>
                        <RadioController
                            rbLabels={["Código", "CPF"]}
                            radioContainerProps={{
                                style: "margin-right: 0.5rem",
                            }}
                            controllerContainerProps={{
                                style: "margin-bottom: 0; box-shadow: none",
                            }}
                            setCurrentOption={(option) => {
                                setSearchOption(option);
                            }}
                            clean={() => cancelled()}
                        />
                    </div>
                    <div class="create-exchange-search-sbar-container">
                        <Select
                            valueKey="id"
                            descriptionKey="description"
                            isLoading={isSearchSaleLoading}
                            options={optionsSearchSale}
                            textInputValue={searchedSale}
                            onTextInput={() => setOptionsSearchSale([])}
                            onTextChange={(e) => {
                                setSearchedSale(e);
                                handleSearchSale();
                            }}
                            onSelectChange={(e) => {
                                setSelectedSearchSale(
                                    optionsSearchSale().filter(
                                        (obj) => obj.id == e
                                    )[0]
                                );
                                handleSearchSaleChange();
                            }}
                            hasButton={false}
                        />
                    </div>
                </div>
            </div>

            <div class="create-exchange-products-container">
                <div class="create-exchange-product ">
                    <label style={{ "font-size": "0.9rem" }}>
                        Produto Substituído
                    </label>
                    <Select
                        valueKey="id"
                        descriptionKey="productName"
                        options={replaceableOptions}
                        onTextInput={null}
                        onTextChange={null}
                        onSelectChange={(e) => {
                            setReplaceableProduct(
                                replaceableOptions().filter((obj) => obj.id == e)[0]
                            );
                            handleReplaceableProductChange();
                        }}
                    />
                    <div class="create-exchange-product-description">
                        <label style={{ "margin-top": "0.8rem" }}>Nome:</label>
                        <label>Código:</label>
                        <label>Preço:</label>
                        <TextInput
                            title="Quantidade:"
                            required={false}
                            placeholder="0"
                            placeholderOnError="Qtd. é inválida."
                            onChange={(e) => setReplaceableProductQuant(e)}
                            onValidate={(e) => {}}
                            value={replaceableProductQuant}
                            containerProps={{
                                style: "box-shadow: 0px 5px 10px 5px rgba(0, 0, 0, 0.2); border-radius: 5px;  padding: 0.5rem; margin: 0",
                            }}
                            labelProps={{
                                style: "box-shadow: none; padding-left: 0",
                            }}
                            inputProps={{
                                type: "number",
                                step: "1",
                            }}
                        />
                    </div>
                </div>
                <div class="create-exchange-product ">
                    <label style={{ "font-size": "0.9rem" }}>Novo Produto</label>
                    <Select
                        valueKey="id"
                        descriptionKey="description"
                        isLoading={isSearchSubsLoading}
                        options={optionsSubstitute}
                        textInputValue={searchedSubtitute}
                        onTextInput={() => setOptionsSubstitute([])}
                        onTextChange={(e) => {
                            setSearchedSubstitute(e);
                            handleSearchedSubstitute();
                        }}
                        onSelectChange={(e) => {
                            setSelectedSubstitute(
                                optionsSubstitute().filter((obj) => obj.id == e)[0]
                            );
                            handleSubsituteProductChange();
                        }}
                        hasButton={true}
                        onButtonClick={() => handleSelectSubButtonClick()}
                    />
                    <div class="create-exchange-product-description">
                        <label style={{ "margin-top": "0.8rem" }}>Nome:</label>
                        <label>Código:</label>
                        <label>Preço:</label>
                        <TextInput
                            title="Quantidade:"
                            required={false}
                            placeholder="0"
                            placeholderOnError="Qtd. é inválida."
                            onChange={(e) => setSubstituteQuant(e)}
                            onValidate={(e) => {}}
                            value={substituteQuant}
                            containerProps={{
                                style: "box-shadow: 0px 5px 10px 5px rgba(0, 0, 0, 0.2); border-radius: 5px;  padding: 0.5rem; margin: 0",
                            }}
                            labelProps={{
                                style: "box-shadow: none; padding-left: 0",
                            }}
                            inputProps={{
                                type: "number",
                                step: "1",
                            }}
                        />
                    </div>
                </div>
            </div>
            <div class="create-exchange-reason">
                <TextArea
                    title="Motivo"
                    required={true}
                    placeholder="Digite o motivo da troca."
                    placeholderOnError="Descrição do motivo ultrapassou o limite de caractéres."
                    onChange={(e) => setReason(e)}
                    onValidate={(e) => {}}
                    value={reason}
                    labelProps={{
                        style: "font-size: 0.9rem",
                    }}
                    inputProps={{
                        style: "height: 75px; padding: 0.5rem; padding-bottom: 0",
                    }}
                />
            </div>
            <div class="create-exchange-resume">
                <div class="create-exchange-resume-info">
                    <label style={{ "font-size": "0.9rem" }}>
                        {"Valor Final (Diferença)"}
                    </label>
                    <span>Preço Prod. Substituído: R$</span>
                    <span>Preço Novo Prod.: R$</span>
                    <span>Total: R$</span>
                </div>
                <div class="create-exchange-resume-buttons">
                    <button
                        class="finish-buttons"
                        onClick={() => handleCancelExchange()}
                    >
                        Cancelar
                    </button>
                    <button
                        class="finish-buttons"
                        onClick={() => handleFinishExchange()}
                    >
                        Finalizar
                    </button>
                </div>
            </div>
        </div>
    );
}

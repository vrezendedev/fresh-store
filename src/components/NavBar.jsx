import ProductsIcon from '../imgs/products.svg';
import SaleIcon from '../imgs/sale.svg';
import ExchangeIcon from '../imgs/exchange.svg';
import SalesDetailIcon from '../imgs/sale_detail.svg';
import Menu from '../imgs/menu.svg';

import { A } from 'solid-start';

import { createEffect, createSignal } from 'solid-js';

import './../styles/navbar.css';

export default function NavBar() {
    const [isMobileNavBar, setIsMobileNavBar] = createSignal(false);
    const [isShowingMenu, setIsShowingMenu] = createSignal(true);

    createEffect(() => {
        if (window.innerWidth <= 600) {
            setIsMobileNavBar(true);
            setIsShowingMenu(false);
        }
    }, []);

    function HandleMenuOnMobile() {
        if (!isMobileNavBar()) return;
        setIsShowingMenu(false);
    }

    return (
        <div class="nav-bar-main-div">
            <div class="nav-bar-main-icons">
                <Show
                    when={isMobileNavBar() == true && isShowingMenu() == false}
                >
                    <img
                        src={Menu}
                        draggable={false}
                        onClick={() => setIsShowingMenu(true)}
                    />
                </Show>
                <Show when={isShowingMenu()}>
                    <A href="/products" onClick={() => HandleMenuOnMobile()}>
                        <img
                            src={ProductsIcon}
                            alt="Acessar Produtos"
                            draggable={false}
                        />
                    </A>
                    <A href="/sales" onClick={() => HandleMenuOnMobile()}>
                        <img
                            src={SaleIcon}
                            alt="Acessar Vendas"
                            draggable={false}
                        />
                    </A>
                    <A href="/exchanges" onClick={() => HandleMenuOnMobile()}>
                        <img
                            src={ExchangeIcon}
                            alt="Acessar Trocas"
                            draggable={false}
                        />
                    </A>
                    <A
                        href="/sales-details"
                        onClick={() => HandleMenuOnMobile()}
                    >
                        <img
                            src={SalesDetailIcon}
                            alt="Acessar Histórico de Vendas"
                            draggable={false}
                        />
                    </A>
                </Show>
            </div>
        </div>
    );
}

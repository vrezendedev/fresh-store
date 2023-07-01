import { createSignal } from 'solid-js';

import { A } from 'solid-start';

import Home from '@phosphor-icons/core/assets/regular/house.svg';
import Products from '@phosphor-icons/core/assets/regular/package.svg';
import Sales from '@phosphor-icons/core/assets/regular/money.svg';
import Exchanges from '@phosphor-icons/core/assets/regular/swap.svg';
import SalesDetails from '@phosphor-icons/core/assets/regular/chart-line-up.svg';

import ShowNavBar from '@phosphor-icons/core/assets/regular/caret-circle-right.svg';
import HideNavBar from '@phosphor-icons/core/assets/regular/caret-circle-left.svg';

const navItems = [
    {
        icon: Home,
        href: '/',
        alt: 'Acessar aba principal',
    },
    {
        icon: Products,
        href: '/products',
        alt: 'Acessar aba de Produtos',
    },
    {
        icon: Sales,
        href: '/sales',
        alt: 'Acessar aba de Vendas',
    },
    {
        icon: Exchanges,
        href: '/exchanges',
        alt: 'Acessar aba de Trocas',
    },
    {
        icon: SalesDetails,
        href: '/sales-history',
        alt: 'Acessar aba de Histórico de Vendas',
    },
];

import './navbar.css';

export default function NavBar() {
    const [showNavBar, setShowNavBar] = createSignal(true);

    return (
        <div class="navbar-div">
            <Show when={showNavBar()}>
                <div class="navbar-icon-div">
                    {navItems.map((obj) => (
                        <A href={obj.href}>
                            <img
                                class="navbar-icon"
                                src={obj.icon}
                                draggable={false}
                                role="button"
                                alt={obj.alt}
                            />
                        </A>
                    ))}
                </div>
            </Show>
            <button
                class={
                    showNavBar()
                        ? `navbar-hide-button`
                        : `navbar-hide-button navbar-hide-onMobile`
                }
                style={{ left: showNavBar() ? '64px' : '-18px' }}
            >
                <img
                    src={showNavBar() ? HideNavBar : ShowNavBar}
                    onClick={() => setShowNavBar((prev) => !prev)}
                    draggable={false}
                    role="button"
                    alt="Esconder ou Mostrar barra de navegação"
                />
            </button>
        </div>
    );
}

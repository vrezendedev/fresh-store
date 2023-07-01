import { createSignal } from 'solid-js';

import { useLogger } from '../../_contexts/UserContext';

import Palette from '@phosphor-icons/core/assets/regular/palette.svg';

import Logo from './../../_resources/imgs/freshStoreLogo.png';

import './header.css';

export default function Header() {
    const [user, { login, logout, setUserColor }] = useLogger();
    const [chooseColor, setChooseColor] = createSignal(false);
    const [colorChoosed, setColorChoosed] = createSignal(user().color);

    return (
        <div
            class="header-div"
            style={{
                'background-color':
                    colorChoosed() != null ? colorChoosed() : 'white',
            }}
        >
            <img
                src={
                    user().image != null
                        ? `data:image/jpeg;base64, ` + user().image
                        : Logo
                }
                alt="Logo da Empresa"
                draggable={false}
                style={{ width: '12rem', height: 'auto' }}
            />
            <Show when={!chooseColor()}>
                <button
                    style={{
                        position: 'absolute',
                        right: '8px',
                        width: 'auto',
                        'background-color': 'transparent',
                    }}
                    onClick={() => setChooseColor((prev) => !prev)}
                >
                    <img
                        src={Palette}
                        role="button"
                        draggable={false}
                        style={{ width: '24px' }}
                    />
                </button>
            </Show>

            <Show when={chooseColor()}>
                <input
                    class="color-picker"
                    value={colorChoosed()}
                    onChange={(e) => {
                        setColorChoosed(e.target.value);
                        setUserColor(e.target.value);
                        setChooseColor(false);
                    }}
                    type="color"
                />
            </Show>
        </div>
    );
}

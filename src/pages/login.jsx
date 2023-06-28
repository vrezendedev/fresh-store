import { useLogger } from '../_contexts/UserContext';

import './../styles/login.css';

import LoginImg from '../_imgs/login.png';

export default function Login() {
    const [user, { login, logout }] = useLogger();

    async function handleClickOnAccessButton() {
        let userEmail = document.getElementById('userEmail');
        let userPassword = document.getElementById('userPassword');

        let err = false;

        if (userEmail.value.length == 0) {
            userEmail.style.border = 'red solid thin';
            userEmail.placeholder = 'Obrigatório preencher esse campo.';
            err = true;
        }

        if (userPassword.value.length == 0) {
            userPassword.style.border = 'red solid thin';
            userPassword.placeholder = 'Obrigatório preencher esse campo.';
            err = true;
        }

        if (err == true) return;

        let res = await login(userEmail.value, userPassword.value);

        if (res != null) {
            //show error modal
        }
    }

    return (
        <main>
            <div class="login-main">
                <div id="login-div-img-card">
                    <img
                        id="login-img"
                        draggable={false}
                        alt="Colaboradora confirmando entrega."
                        src={LoginImg}
                    />
                    <div class="login-div">
                        <div id="title-div">
                            <h1 id="login-title">Fresh Store</h1>
                            <p id="login-subtitle">
                                O controle sem limites de sua loja.
                            </p>
                        </div>
                        <div class="login-card">
                            <h3>Já está cadastrado?</h3>
                            <label for="userEmail">E-mail</label>
                            <input
                                id="userEmail"
                                type="text"
                                class="input"
                                placeholder="Digite seu e-mail."
                                onChange={(e) => {
                                    if (e.target.value.length == 0) return;
                                    e.target.style.border = 'none';
                                    e.target.placeholder = 'Digite seu e-mail.';
                                }}
                            />
                            <label for="userPassword">Senha</label>
                            <input
                                id="userPassword"
                                type="password"
                                class="input"
                                placeholder="Digite sua senha."
                                onChange={(e) => {
                                    if (e.target.value.length == 0) return;
                                    e.target.style.border = 'none';
                                    e.target.placeholder = 'Digite sua senha.';
                                }}
                            />
                            <button
                                onClick={() => handleClickOnAccessButton()}
                                id="access-btn"
                            >
                                Acessar
                            </button>
                        </div>
                        <div class="signup-card">
                            <p>Ainda não possui uma conta ?</p>
                            <p id="createAccount">
                                Entre em contato com seu Gestor
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

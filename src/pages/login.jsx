import { createSignal } from 'solid-js';
import './../styles/login.css';

export default function Login() {
    createSignal();

    return (
        <main>
            <div class="login-main">
                <div class="login-div">
                    <div id="title-div">
                        <h1 id="login-title">Fresh Store</h1>
                        <p id="login-subtitle">Sua loja sem limites.</p>
                    </div>
                    <div class="login-card">
                        <h3>Já está cadastrado?</h3>
                        <label for="userEmail">E-mail</label>
                        <input
                            id="userEmail"
                            type="text"
                            class="input"
                            placeholder="Digite seu e-mail."
                        />
                        <label for="userPassword">Senha</label>
                        <input
                            id="userPassword"
                            type="password"
                            class="input"
                            placeholder="Digite sua senha."
                        />
                        <button id="access-btn">Acessar</button>
                    </div>
                    <div class="signup-card">
                        <p>Ainda não possui uma conta ?</p>
                        <p id="createAccount">
                            Entre em contato com seu Gestor
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

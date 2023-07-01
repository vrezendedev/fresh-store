import Login from '~/layouts/Login/Login';

import './access.css';

export default function Access() {
    return (
        <div class="access-div">
            <div>
                <h1 style={{ margin: '0.2rem, 0, 0, 0' }}>
                    <span class="initial-letter">F</span>resh Store
                </h1>
                <p> Stay Fresh.</p>
                <p> Stay on the Market.</p>
            </div>
            <Login />
        </div>
    );
}

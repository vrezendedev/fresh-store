import { createSignal, createContext, useContext } from 'solid-js';

import { FetchUser } from '../_fetch/UserFetch';

const UserContext = createContext();

export function GetUserOnSessionStorage() {
    return JSON.parse(sessionStorage.getItem('user'));
}

function SetUserOnSessionStorage(user) {
    sessionStorage.setItem('user', JSON.stringify(user));
}

export function UserContextProvider(props) {
    const [user, setUser] = createSignal(props.user || null),
        logger = [
            user,
            {
                async login(username, password) {
                    if (username.length == 0 || password.length == 0)
                        return 'Necessário inserir o nome de usuário e senha.';

                    await FetchUser(username, password)
                        .then((res) => {
                            setUser(res);
                            SetUserOnSessionStorage(res);
                            return null;
                        })
                        .catch((res) => {
                            return res;
                        });
                },
                async logout() {
                    setUser(null);
                },
            },
        ];

    return (
        <UserContext.Provider value={logger}>
            {props.children}
        </UserContext.Provider>
    );
}

export function useLogger() {
    return useContext(UserContext);
}

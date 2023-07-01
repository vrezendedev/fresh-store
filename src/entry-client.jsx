import { mount, StartClient } from "solid-start/entry-client";
import { UserContextProvider } from "./_contexts/UserContext";

mount(
    () => (
        <UserContextProvider user={null}>
            <StartClient />
        </UserContextProvider>
    ),
    document
);

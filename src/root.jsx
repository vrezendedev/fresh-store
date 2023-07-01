// @refresh reload
import {
    A,
    Body,
    ErrorBoundary,
    Routes,
    FileRoutes,
    Head,
    Html,
    Meta,
    Scripts,
    Title,
} from "solid-start";

import { Show, Suspense, createSignal } from "solid-js";

import { useLogger } from "./_contexts/UserContext";

import Access from "./pages/Access/Access";
import NavBar from "./layouts/Navbar/NavBar";
import Header from "./layouts/Header/Header";

import Spinner from "@phosphor-icons/core/assets/regular/spinner.svg";

import "./root.css";

export default function Root() {
    const [user] = useLogger();
    const [navbarOpened, setNavbarOpened] = createSignal(false);

    return (
        <Html lang="en">
            <Head>
                <Title>Fresh Store</Title>
                <Meta charset="utf-8" />
                <Meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <Body>
                <Suspense>
                    <ErrorBoundary>
                        <Show when={user() == null}>
                            <Access />
                        </Show>
                        <Show when={user() != null}>
                            <div class="main-app-div">
                                <NavBar setNavbarOpened={setNavbarOpened} />
                                <div id="overflow-div" style={{}}>
                                    <Header />
                                    <Show when={!navbarOpened()}>
                                        <Routes>
                                            <FileRoutes />
                                        </Routes>
                                    </Show>
                                    <Show when={navbarOpened()}>
                                        <div class="on-navbar-div">
                                            <img
                                                class="loading"
                                                draggable={false}
                                                src={Spinner}
                                            />
                                        </div>
                                    </Show>
                                </div>
                            </div>
                        </Show>
                    </ErrorBoundary>
                </Suspense>
                <Scripts />
            </Body>
        </Html>
    );
}

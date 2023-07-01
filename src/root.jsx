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
} from 'solid-start';

import { Suspense } from 'solid-js';

import { useLogger } from './_contexts/UserContext';

import Access from './pages/Access/Access';
import NavBar from './layouts/Navbar/NavBar';
import Header from './layouts/Header/Header';

import './root.css';

export default function Root() {
    const [user] = useLogger();

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
                                <NavBar />
                                <div style={{ width: '100%' }}>
                                    <Header />
                                    <Routes>
                                        <FileRoutes />
                                    </Routes>
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

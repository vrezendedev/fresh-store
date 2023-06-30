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

import { Suspense } from "solid-js";

import { useLogger } from "./_contexts/UserContext";

import Access from "./pages/Access/Access";

import "./root.css";

export default function Root() {
  const [user] = useLogger();

  return (
    <Html lang="en">
      <Head>
        <Title>Fresh Store</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <Show when={user() == null}>
              <Access />
            </Show>
            <Show when={user() != null}>
              <Routes>
                <FileRoutes />
              </Routes>
            </Show>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}

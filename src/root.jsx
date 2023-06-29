// @refresh reload
import {
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";

import { Suspense } from "solid-js";

import { useLogger } from "./_contexts/UserContext";

import Login from "./pages/Login";

import LogoExample from "./_imgs/logo_example.png";

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
              <Login />
            </Show>
            <Show when={user() != null}></Show>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}

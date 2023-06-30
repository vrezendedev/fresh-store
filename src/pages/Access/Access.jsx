import Login from "~/layouts/Login/Login";

import "./access.css";

export default function Access() {
  return (
    <div
      class="container-flex-center access-div"
      style={{ "flex-direction": "column" }}
    >
      <div>
        <h1 style={{ margin: "0.2rem, 0, 0, 0" }}>
          <span class="initial-letter">F</span>resh Store
        </h1>
        <p> O controle sem limites de sua loja.</p>
      </div>
      <Login />
    </div>
  );
}

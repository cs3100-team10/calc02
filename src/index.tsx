import { render } from "react-dom";
import * as React from "react";

if (module.hot)
{
    module.hot.accept();
}

import "./style";

import App from "./App/App";

render(<App />, document.getElementById("render"));

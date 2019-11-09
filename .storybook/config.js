import { configure } from "@storybook/react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
// automatically import all files ending in *.stories.js
configure(require.context("../components", true, /\.stories\.js$/), module);

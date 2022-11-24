"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// index.ts
var import_cors = __toESM(require("cors"));
var import_express = __toESM(require("express"));
var dotenv = __toESM(require("dotenv"));
dotenv.config();
var app = (0, import_express.default)();
app.use(import_express.default.json());
app.use((0, import_cors.default)());
var port = process.env.SERVER_PORT || 3e3;
app.get("/", (req, res) => res.send("\u{1F3E0}"));
app.listen(port, () => console.log("Silence, \xE7a tourne." + port));

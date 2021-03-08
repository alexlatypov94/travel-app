import React from "react";
import { ISwitchLang } from "../interfaces";

export const contextLang: ISwitchLang = {
  en: "en",
  ru: "ru",
  es: "es"
};

export const LangContext: React.Context<ISwitchLang> = React.createContext(contextLang);

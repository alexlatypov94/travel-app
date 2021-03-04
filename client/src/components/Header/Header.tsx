import React, { ReactElement } from "react";

export const Header = ({ title }: { title: string }): ReactElement => <h1 className="app-header">{title}</h1>;

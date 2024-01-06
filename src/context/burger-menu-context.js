import React, { useState } from "react";

const BurgerMenuContext = React.createContext();

export function BurgerMenuProvider(props) {
  const [open, setOpen] = useState(null);

  return <BurgerMenuContext.Provider value={{ open, setOpen }} {...props} />;
}

export function useBurgerMenu() {
  const context = React.useContext(BurgerMenuContext);
  if (context === undefined) {
    throw new Error(`useBurgerMenu must be used within a BurgerMenuProvider`);
  }
  return context;
}

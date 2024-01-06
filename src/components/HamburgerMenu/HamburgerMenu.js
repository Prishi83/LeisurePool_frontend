import React from "react";
import Menu from "react-burger-menu/lib/menus/slide";
import NavigationLinks from "./../NavigationLinks/NavigationLinks";
import "./HamburgerMenu.css";
import menuIcon from "../../assets/menu-icon.svg";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import NavigationButtons from "./../NavigationButtons/NavigationButtons";
import { useBurgerMenu } from "../../context/burger-menu-context";

// TODO: Add functionality to close hamburger menu on link/button click.

export default function HamburgerMenu() {
  const { open, setOpen } = useBurgerMenu();

  function handleStateChange(state) {
    setOpen(!state.isOpen);

    const targetElement = document.querySelector(".bm-menu-wrap");
    if (open) {
      disableBodyScroll(targetElement);
    } else {
      enableBodyScroll(targetElement);
    }
  }

  return (
    <Menu
      right
      customBurgerIcon={<img src={menuIcon} alt="Hamburger menu icon" />}
      width={"100%"}
      onStateChange={handleStateChange}
    >
      <NavigationLinks customStyleClasses="text-4xl" />
      <NavigationButtons customStyleClasses="flex flex-col items-center mt-4" />
    </Menu>
  );
}

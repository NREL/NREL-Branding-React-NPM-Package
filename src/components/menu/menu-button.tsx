import * as React from 'react';
import { ReactNode, MouseEvent } from 'react';
import * as PropTypes from 'prop-types';

import './style.scss';

MenuButton.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
}

export type IMenuButtonProps = {
  children: ReactNode,
  onClick: (event: MouseEvent) => {},
  toggleMenu: () => void,
  className?: string,
}

/**
 * Menu item holding a button.
 *
 * @param {object} props
 * @param {string} className Optional className for custom styling
 * @param {function} toggleMenu Function to close menu (only used in mobile) passed from menu component in package
 * @param {function}
 * @param {string} children JSX of HTML elements, or in most cases just text
 */
function MenuButton({
  toggleMenu,
  children,
  onClick,
  className = ''
}: IMenuButtonProps) {

  const handleClick = (e: MouseEvent): void => {
    onClick(e);
    toggleMenu();
  }

  return (
    <li className={`menu-item ${className}`} onClick={handleClick}>
      <button>{children}</button>
    </li>
  );
}

export default MenuButton;
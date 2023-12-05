import * as React from 'react';
import { ReactNode } from 'react';
import * as PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import { extractJustPathnameFromString } from '../../utils';
import './style.scss';

MenuLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  toggleMenu: PropTypes.func,
  className: PropTypes.string,
  isCurrent: PropTypes.bool,
}

export type IMenuLinkProps = {
  toggleMenu?: () => void,
  children: ReactNode,
  to: string,
  className?: string,
  isCurrent?: boolean,
}

/**
 * Menu item holding a react-router Link.
 *
 * @param {object} props
 * @param {string} to The target link
 * @param {string} children JSX of HTML elements, or in most cases just text
 * @param {string} className Optional className for custom styling
 * @param {string} toggleMenu Function to close menu (only used in mobile) passed from menu component in package
 * @param {boolean} isCurrent Whether or not this is active, default (undefined) is to infer from the current path
 */
function MenuLink({
  children,
  to,
  className = '',
  isCurrent,
  toggleMenu,
}: IMenuLinkProps) {
  const location = useLocation();
  const history = useHistory();

  // Use the pathname by default
  const isCurrentClass = (isCurrent === undefined && extractJustPathnameFromString(to) === location.pathname) ||
    isCurrent ? 'current' : '' ;

  const handleClick = (e: React.MouseEvent | React.TouchEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    e.preventDefault();
    history.push(to);
    toggleMenu?.();
  }

  return (
    // TODO: Figure out why onTouchEnd is needed https://github.com/NREL/NREL-Branding-React-NPM-Package/issues/19
    <li tabIndex={0} onKeyDown={(e) => e.key === "Enter" && handleClick(e)} className={`menu-item ${isCurrentClass} ${className}`} onClick={handleClick} onTouchEnd={handleClick}>
      <span>{children}</span>
    </li>
  );
}

export default MenuLink;
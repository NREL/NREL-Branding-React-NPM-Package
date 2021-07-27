import * as React from 'react';
import {
  ReactNode,
  useState,
  isValidElement,
  ReactElement,
  Children,
  cloneElement,
} from 'react';
import * as PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import Menu from './menu';
import './style.scss';

import { ReactComponent as ChevronLeft } from './chevron-left.svg';

SubMenu.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  toggleMenu: PropTypes.func,
}

export type ISubMenuProps = {
  children: ReactNode,
  label: string,
  className?: string,
  toggleMenu?: () => void,
}

/**
 * Menu item holding another menu.
 *
 * @param {object} props
 * @param {string} children JSX or html elements - Should really just be MenuLinks
 * @param {string} label The text label of the submenu
 * @param {string} toggleMenu Function to close menu (only used in mobile)
 * @param {string} className Optional className for custom styling
 */
function SubMenu({
  children,
  label,
  toggleMenu,
  className = ''
}: ISubMenuProps) {
  const location = useLocation();
  const [showItems, setShowItems] = useState(false);

  /**
   * Check to see if we on on the page one of the children goes to
  */
  const childIsCurrent = (): boolean => {
    const childrenArray = Children.toArray(children);

    return childrenArray.some(child => {
      if (isValidElement(child)) {
        return child?.props.to === location.pathname
      }
      return false;
    });
  }

  /**
   * Only used on Mobile
   */
  const toggleShowItems = () => setShowItems(!showItems);


  let isCurrent = childIsCurrent() ? 'current' : '';
  // On mobile, the sub-menu should stay open if a user is on one of the links in that menu
  let showItemsClass = showItems || childIsCurrent() ? 'show' : '';
  return (
    <li
      onClick={toggleShowItems}
      className={`menu-item ${isCurrent} ${className} ${showItemsClass}`}
    >
      <span>
        {label}
        <ChevronLeft className="submenu-chevron" />
      </span>
      <Menu isSubMenu>
        {/* Need to pass through toggleMenu so that the menu closes when a MenuLink is clicked */}
        {Children.map(children, child => (
          cloneElement(child as ReactElement, { toggleMenu })
        ))}
      </Menu>
    </li>
  );
}

export default SubMenu;
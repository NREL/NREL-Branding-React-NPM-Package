import * as React from 'react';
import { ReactNode, useState, isValidElement, ReactElement, Children, cloneElement } from 'react';
import * as PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { extractJustPathnameFromString } from '../../utils';
import Menu from './menu';
import './style.scss';

import { ReactComponent as ChevronLeft } from './chevron-left.svg';
import MenuContext from './menu-context';

SubMenu.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  toggleMenu: PropTypes.func,
};

export type ISubMenuProps = {
  children: ReactNode;
  label: string;
  className?: string;
  toggleMenu?: () => void;
};

const SUPPORTED_KEYS = ['Enter'];

const arrayIsCurrent = (children: React.ReactNode, locationPathname: string, includeDescendants: boolean ): boolean => {
  return Children.toArray(children).some((child) => {
    if (!isValidElement(child)) return false;

    const to = extractJustPathnameFromString(child?.props?.to);
    const success = to === locationPathname
    if (includeDescendants && child?.props?.['children']) { 
      return success || arrayIsCurrent(child.props['children'], locationPathname, includeDescendants)
    } else {
      return success;
    }
  });
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
function SubMenu({ children, label, toggleMenu, className = '' }: ISubMenuProps) {
  const location = useLocation();
  const [showItems, setShowItems] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [active, setActive] = useState(false);
  const hideMenuTimeoutRef = React.useRef<ReturnType<typeof setTimeout>>();
  const { menuCloseDelay } = React.useContext(MenuContext);

  /**
   * Check to see if we on on the page one of the children goes to
  */
  const childIsCurrent = (includeDescendants: boolean): boolean => {
    return arrayIsCurrent(children, location.pathname, includeDescendants)
  }

  /**
   * Only used on Mobile
   */
  const toggleShowItems: React.MouseEventHandler<HTMLLIElement>  = () => { 
    // avoid edge case of showItems = false and showSubMenu = true
    if (showSubMenu && showItems) {
      setShowSubMenu(false);
      setShowItems(false);
    } else {
      setShowItems(!showItems);
    }
  };

  React.useEffect(() => {
    const handleCloseMenu = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(false);
      if (SUPPORTED_KEYS.includes(e.key) && active) {
        setActive(false);
      }
    };
    document.addEventListener('keydown', handleCloseMenu);
    return () => {
      document.removeEventListener('keydown', handleCloseMenu);
    };
  }, [active]);

  const handleShowSubMenu = (newState: boolean, isHoverEvent: boolean) => () => {
    if (!isHoverEvent) {
      setShowSubMenu(newState);
    } else {
      const { innerWidth } = window;
      // do no op if on mobile screen size and a hover event
      if (innerWidth > 767) {
        // Clear any previous close events before handling it
        clearTimeout(hideMenuTimeoutRef.current);
        if (newState) {
          // instantly show the menu
          setShowSubMenu(true);
        } else {
          // Handle a possible delay
          hideMenuTimeoutRef.current = setTimeout(() => {
            setShowSubMenu(false);
          }, menuCloseDelay);
        }
      }
    }
  };
  React.useEffect(() => {
    const eventHandler = () => active && setActive(false);
    document.addEventListener('click', eventHandler);
    return () => {
      document.removeEventListener('click', eventHandler);
    };
  }, [active]);

  let isCurrent = childIsCurrent(true) ? 'current' : '';
  // On mobile, the sub-menu should stay open if a user is on one of the links in that menu
  let showItemsClass = showItems || childIsCurrent(true) ? 'show' : '';
  return (
    <>
      {/* desktop submenu */}
      <li
        tabIndex={0}
        onKeyDown={(e) => SUPPORTED_KEYS.includes(e.key) && setActive(!active)}
        onClick={toggleShowItems}
        onMouseEnter={handleShowSubMenu(true, true)}
        onMouseLeave={handleShowSubMenu(false, true)}
        onTouchEnd={handleShowSubMenu(!showSubMenu, false)}
        className={`desktop-menu menu-item ${isCurrent} ${className} ${
          active || showSubMenu ? 'active' : ''
        } ${showItemsClass}`}
      >
        <span>
          {label}
          <ChevronLeft className="submenu-chevron" />
        </span>
        <Menu isSubMenu>
          {/* Need to pass through toggleMenu so that the menu closes when a MenuLink is clicked */}
          {Children.map(children, (child) => cloneElement(child as ReactElement, { toggleMenu }))}
        </Menu>
      </li>
    </>
  );
}

export default SubMenu;

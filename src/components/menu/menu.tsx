import * as React from 'react';
import { useState, useEffect, useRef, ReactNode, Children, cloneElement, ReactElement } from 'react';
import * as PropTypes from 'prop-types';

import './style.scss';

Menu.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isSubMenu: PropTypes.bool,
  noStick: PropTypes.bool,
  scrollContainerId: PropTypes.string,
}

type containerType = {
  current: Window & typeof globalThis | HTMLElement | null,
}

export type IMenuProps = {
  children: ReactNode,
  className?: string,
  isSubMenu?: boolean,
  noStick?: boolean,
  scrollContainerId?: string,
}

/**
 * A wrapper Menu component.
 *
 * The eventual dom should end up looking something like:
 *
 *   <ul class="menu">
 *     <li class="menu-item">...</li>
 *   </ul>
 *
 * @param {object} props
 * @param {string} className Any additional class names to add to the menu
 * @param {node} children JSX of HTML elements (should really be either SubMenus or MenuLinks)
 * @param {boolean} isSubMenu Boolean saying if the parent is the sub menu or a main menu
 * @param {boolean} noStick Boolean determining if the menu bar should not be sticky to the top of the page
 * @param {string} scrollContainerId css selector id of container where scroll events occur on the dom. Used to apply the sticky class to the nav bar
 */
function Menu({
  children,
  isSubMenu,
  className = '',
  scrollContainerId,
  noStick,
}: IMenuProps) {
  const containerRef: containerType = useRef(window);

  const [stickyClass, setStickyClass] = useState('no-stick');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (scrollContainerId) {
      containerRef.current = document.getElementById(scrollContainerId);
    }

    containerRef.current?.addEventListener('scroll', handleStickyheader);
    return () => {
      containerRef.current?.removeEventListener('scroll', handleStickyheader);
    }
  }, [scrollContainerId])

  const handleStickyheader = () => {
    if (!noStick) {
      // Find the bottom of the NREL header
      // (height on mobile will depend on the length of the title)
      let headerBottom = document.querySelector('.vadr-header')?.getBoundingClientRect().bottom || 0;

      let newStickyClass = headerBottom <= 0
        ? 'stick'
        : 'no-stick';

      setStickyClass(newStickyClass);
    }
  }

  const toggleMenu = () => setMenuOpen(!menuOpen);

  let menuClass = isSubMenu ? 'sub-menu' : 'menu';
  let menuOpenClass = menuOpen ? 'open' : 'close';

  return (<>
    {
      isSubMenu ?
        <ul className={`${menuClass} ${className}`}>
          {children}
        </ul >
        :
        <>
          <div
            className={`menu-bar ${stickyClass} ${menuOpenClass}`}
            onClick={toggleMenu}
          >
            <div
              id="header-burger-btn"
              className={menuOpenClass}
            >
              <span className="header-burger-line-1"></span>
              <span className="header-burger-line-2"></span>
            </div>
          </div>
          <div className={`menu-container ${stickyClass} ${menuOpenClass}`}>
            <ul className={`${menuClass} ${className}`}>
              {Children.map(children, child => (
                cloneElement(child as ReactElement, { toggleMenu })
              ))}
            </ul>
          </div>
        </>
    }
  </>);
}

export default Menu;
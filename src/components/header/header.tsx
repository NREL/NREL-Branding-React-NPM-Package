import * as React from 'react';
import { Fragment, ReactNode, Children, cloneElement, ReactElement } from 'react';
import * as PropTypes from 'prop-types';
import DefaultLogo from './images/nrel-logo@2x-01.png';
import './style.scss';
import MenuContext from '../menu/menu-context';

NRELHeader.propTypes = {
  appTitle: PropTypes.any.isRequired,
  logoSrc: PropTypes.string,
  isSlim: PropTypes.bool,
  noStick: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  menuCloseDelay: PropTypes.number,
  logoSection: PropTypes.node,
}

export type INRELHeaderProps = {
  /** The title of the app (can be a string or JSX) */
  appTitle: string;
  /** Add a class to the header to be used for styling */
  className?: string;
  /** The source of the logo image file. This should probably live in the public dir of the app */
  logoSrc?: string;
  /** A collection of li items to be rendered as navigational items */
  children?: ReactNode;
  logoSection?: ReactNode;
  /**
   * Boolean for slimmer headers. Mostly used for data-viewer pages
   */
  isSlim?: boolean;
  /** Boolean determining if the menu bar should not be sticky to the top of the page */
  noStick?: boolean;
  /** Boolean used to turn on a mobile nav when in mobile resolutions */
  hasMobileNav?: boolean;
  /**
   * The delay on mouse out of menus and sub menus to until they close, default is 0, can be increased to
   * make it easier to interact with.
   */
  menuCloseDelay?: number;
};

/**
 * Renders a comms friendly header
 */
function NRELHeader({
  appTitle,
  className = '',
  logoSrc,
  children,
  isSlim,
  noStick,
  logoSection,
  hasMobileNav,
  menuCloseDelay = 0,
}: INRELHeaderProps) {

  let slimClass = isSlim ? 'slim' : '';
  let mobileClass = hasMobileNav ? 'mobile-nav' : '';

  return (
    <MenuContext.Provider value={{ menuCloseDelay }}>
      <nav id="shared-nrel-header" className={`nrel-header ${className} ${slimClass} ${mobileClass}`}>
        <header className="vadr-header">
          <h1 className="vadr-100-title">{appTitle}</h1>
          {logoSection ? (
            logoSection
          ) : (
            <a className="header-link" href="https://www.nrel.gov" target="_blank" rel="noopener noreferrer">
              <img src={logoSrc ? logoSrc : DefaultLogo} width="280px" alt="nrel-logo" className="nrel-logo-image" />
            </a>
          )}
        </header>
        {children ? (
          <>{Children.map(children, (child) => cloneElement(child as ReactElement, { isSlim, noStick }))}</>
        ) : (
          <Fragment />
        )}
      </nav>
    </MenuContext.Provider>
  );
}

export default NRELHeader;
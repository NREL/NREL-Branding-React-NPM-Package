import * as React from 'react';
import { Fragment, ReactNode, Children, cloneElement, ReactElement } from 'react';
import * as PropTypes from 'prop-types';
import DefaultLogo from './images/nrel-logo@2x-01.png';
import './style.scss';

NRELHeader.propTypes = {
  appTitle: PropTypes.any.isRequired,
  logoSrc: PropTypes.string,
  isSlim: PropTypes.bool,
  noStick: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node
}

export type INRELHeaderProps = {
  appTitle: string,
  className?: string,
  logoSrc?: string,
  children?: ReactNode,
  isSlim?: boolean,
  noStick?: boolean,
  hasMobileNav?: boolean,
}

/**
 * Renders a comms friendly header
 *
 * @param {object} props - React props passed to this component
 * @param {string} appTitle - The title of the app (can be a string or JSX)
 * @param {string} className - Add a class to the header to be used for styling
 * @param {string} logoSrc - The source of the logo image file. This should probably live in the public dir of the app
 * @param {node} children - A collection of li items to be rendered as navigational items
 * @param {boolean} isSlim Boolean for slimmer headers. Mostly used for data-viewer pages
 * @param {boolean} noStick Boolean determining if the menu bar should not be sticky to the top of the page
 * @param {boolean} hasMobileNav Boolean used to turn on a mobile nav when in mobile resolutions
 */
function NRELHeader({
  appTitle,
  className = '',
  logoSrc,
  children,
  isSlim,
  noStick,
  hasMobileNav,
}: INRELHeaderProps) {

  let slimClass = isSlim ? 'slim' : '';
  let mobileClass = hasMobileNav ? 'mobile-nav' : '';

  return (
    <nav
      id="shared-nrel-header"
      className={`nrel-header ${className} ${slimClass} ${mobileClass}`}
    >
      <header className="vadr-header">
        <h1 className="vadr-100-title">{appTitle}</h1>
        <a
          className="header-link"
          href="https://www.nrel.gov"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={logoSrc ? logoSrc : DefaultLogo}
            width="280px"
            alt="nrel-logo"
            className="nrel-logo-image"
          />
        </a>
      </header>
      {children ?
        <>
          {Children.map(children, child => (
            cloneElement(child as ReactElement, { isSlim, noStick })
          ))}
        </>
        :
        <Fragment />
      }

    </nav>
  );
}

export default NRELHeader;
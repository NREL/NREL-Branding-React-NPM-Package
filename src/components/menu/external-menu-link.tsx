import * as React from 'react';
import { ReactNode } from 'react';
import * as PropTypes from 'prop-types';

import './style.scss';

ExternalMenuLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
}

export type IExternalMenuLinkProps = {
  to: string,
  children: ReactNode,
  alt?: string,
  className?: string,
}

/**
 * Menu item holding an external link.
 *
 * @param {object} props
 * @param {string} to The target link
 * @param {string} children JSX of HTML elements, or in most cases just text
 * @param {string} alt the link title (similar to an image alt tag)
 * @param {string} className an optional classname for the link for special styling
 */
function ExternalMenuLink({
  to,
  children,
  alt,
  className = ''
}: IExternalMenuLinkProps) {
  return (
    <li className={`menu-item ${className}`}>
      <a
        href={to}
        title={alt}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    </li>
  );
}

export default ExternalMenuLink;
import * as React from 'react';
import * as PropTypes from 'prop-types';

import {
  facebook,
  instagram,
  linkedin,
  twitter,
  threads,
  youtube,
  AllianceLogo,
  DoeLogo,
} from './images';

import './style.scss';

NRELFooter.propTypes = {
  className: PropTypes.string,
  contact: PropTypes.string,
}

export type INRELFooterProps = {
  className?: string,
  contact?: string,
}

/**
 * Renders a comms friendly footer
 * See https://github.com/NREL/nrel-app-template-bootstrap4 for original code
 */
function NRELFooter({
  className = '',
  contact,
}: INRELFooterProps) {
  const contactUrl = contact ? contact : 'mailto:maps.help@nrel.gov';

  return (
    <div className={`nrel-footer-wrapper ${className}`}>
      <footer id="footer" className="hidden-print">

        <div className="footertop">
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-5">
                <a href="http://www.nrel.gov/index.html"><strong>National Laboratory of the Rockies</strong></a>
              </div>
              <div className="col col-lg-7">
                <div className="d-flex flex-column flex-lg-row justify-content-lg-start global">
                  <div><a href="http://www.nrel.gov/about/index.html">About</a></div>
                  <div><a href="http://www.nrel.gov/research/index.html">Research</a></div>
                  <div><a href="http://www.nrel.gov/index.html">Work with Us</a></div>
                  <div><a href="http://www.nrel.gov/news/index.html">News</a></div>
                  <div><a href="http://www.nrel.gov/careers/index.html">Careers</a></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footerbottom">
          <div className="container">
            <div className="row social-and-global-links">
              <div className="col-md-4 col-lg-5">
                <div><a href={contactUrl}>Contact Us</a></div>
                <div className="mt-2"><a href="http://www.nrel.gov/about/visiting-nrel.html">Visit</a></div>
                <div className="mt-2"><a href="http://www.nrel.gov/news/subscribe.html">Subscribe</a></div>
                <div className="mt-3">
                  <ul className="social-links list-inline">
                    <li className="list-inline-item"><a href="https://www.facebook.com/nationalrenewableenergylab" rel="noopener noreferrer" target="_blank" aria-label="Follow NRL on Facebook">
                      <img
                        aria-hidden
                        className="social-svg"
                        src={facebook}
                      />
                    </a></li>
                    <li className="list-inline-item"><a href="https://www.instagram.com/nationalrenewableenergylab/" rel="noopener noreferrer" target="_blank" aria-label="Follow NRL on Instagram">
                      <img
                        aria-hidden
                        className="social-svg"
                        src={instagram}
                      />
                    </a></li>
                    <li className="list-inline-item"><a href="https://www.linkedin.com/company/national-renewable-energy-laboratory" rel="noopener noreferrer" target="_blank" aria-label="Follow NRL on Linked In">
                      <img
                        aria-hidden
                        className="social-svg"
                        src={linkedin}
                      />
                    </a></li>
                    <li className="list-inline-item"><a href="https://www.youtube.com/user/NRELPR/" rel="noopener noreferrer" target="_blank" aria-label="Follow NRL on YouTube">
                      <img
                        aria-hidden
                        className="social-svg"
                        src={youtube}
                      />
                    </a></li>
                    <li className="list-inline-item"><a href="https://x.com/nrel/" rel="noopener noreferrer" target="_blank" aria-label="Follow NRL on X">
                      <img
                        aria-hidden
                        className="social-svg social-svg__twitter"
                        src={twitter}
                      />
                    </a></li>
                    <li className="list-inline-item"><a href="https://www.threads.net/@nationalrenewableenergylab" rel="noopener noreferrer" target="_blank" aria-label="Follow NRL on Threads">
                      <img
                        aria-hidden
                        className="social-svg social-svg__threads"
                        src={threads}
                      />
                    </a></li>
                  </ul>
                </div>
              </div>
              <div className="col-md-8 col-lg-7 globalsecondary">
                <div className="row">
                  <div className="col-sm-6 col-lg-3">
                    <div className="mt-1"><a href="http://www.nrel.gov/accessibility.html">Accessibility</a></div>
                    <div className="mt-1"><a href="http://www.nrel.gov/disclaimer.html">Disclaimer</a></div>
                    <div className="mt-1"><a href="http://www.nrel.gov/security.html">Security and Privacy</a></div>
                    <div className="mt-1"><a href="http://www.nrel.gov/webmaster.html">Site Feedback</a></div>
                  </div>
                  <div className="col-sm-6 col-lg-3">
                    <div className="mt-1"><a href="https://developer.nrel.gov/">Developers</a></div>
                    <div className="mt-1"><a href="https://thesource.nrel.gov/">Employees</a></div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="mt-4">
              <div className="row">
                <div className="col-sm-6 nrel-footer-logos-container">
                  <a href="https://www.allianceforsustainableenergy.org/">
                    <img className="mr-5 nrel-alliance-logo" src={AllianceLogo} alt="Alliance for Sustainable Energy, LLC" />
                  </a>
                  <a href="https://www.energy.gov">
                    <DoeLogo className="nrel-doe-logo"/>
                  </a>
                </div>
                <div className="col-12 col-sm-6">
                  <p className="nrel-attr">The National Laboratory of the Rockies is a national laboratory of the <a href="https://www.energy.gov/">U.S. Department of Energy</a>, <a href="https://www.energy.gov/eere/office-energy-efficiency-renewable-energy">Office of Critical Minerals and Energy Innovation</a>, operated under Contract No. DE-AC36-08GO28308.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </footer>
    </div>
  )
};

export default NRELFooter;

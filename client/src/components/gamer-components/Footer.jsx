import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-6">
            <h3>Quick Links</h3>
            <div className="links">
              <ul>
                <li>
                  <a href="catalog.html">Explore</a>
                </li>
                <li>
                  <a href="login.html">Login</a>
                </li>
                <li>
                  <a href="register.html">Register</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <h3>Snappcoins</h3>
            <div className="links">
              <ul>
                <li>
                  <a href="connect-wallet.html">Connect Wallet</a>
                </li>
                <li>
                  <a href="help.html">Faq</a>
                </li>
                <li>
                  <a href="become-partner.html">Become a Partner</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <h3>Resources</h3>
            <div className="links">
              <ul>
                <li>
                  <Link href="#">Community</Link>
                </li>
                <li>
                  <Link href="#">How it Works</Link>
                </li>
                <li>
                  <Link href="#">Latest Products</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <h3>Keep in touch</h3>
            <div id="newsletter">
              <div id="message-newsletter"></div>
              <form method="post" name="newsletter_form" id="newsletter_form">
                <div className="form-group">
                  <input
                    type="email"
                    name="email_newsletter"
                    id="email_newsletter"
                    className="form-control"
                    placeholder="Your email"
                  />
                  <button type="submit" id="submit-newsletter">
                    <i className="bi bi-chevron-right"></i>
                  </button>
                </div>
              </form>
            </div>
            <div className="follow_us">
              <ul>
                <li>
                  <Link to="#0">
                    <img
                      src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                      data-src="img/twitter_icon.svg"
                      alt=""
                      className="lazy"
                    />
                  </Link>
                </li>
                <li>
                  <Link to="#0">
                    <img
                      src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                      data-src="img/facebook_icon.svg"
                      alt=""
                      className="lazy"
                    />
                  </Link>
                </li>
                <li>
                  <Link to="#0">
                    <img
                      src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                      data-src="img/instagram_icon.svg"
                      alt=""
                      className="lazy"
                    />
                  </Link>
                </li>
                <li>
                  <Link to="#0">
                    <img
                      src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                      data-src="img/youtube_icon.svg"
                      alt=""
                      className="lazy"
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* <!-- /row--> */}
        <hr />
        <div className="row add_bottom_25">
          <div className="col-md-6">
            <ul className="footer-selector clearfix">
              <li>
                <div className="styled-select lang-selector">
                  <select>
                    <option value="English">English</option>
                    <option value="French">French</option>
                    <option value="Spanish">Spanish</option>
                    <option value="Russian">Russian</option>
                  </select>
                </div>
              </li>
            </ul>
          </div>
          <div className="col-md-6">
            <ul className="additional_links">
              <li>
                <Link to="#">Terms and conditions</Link>
              </li>
              <li>© 2023 Snappcoins</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

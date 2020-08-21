import React from 'react';
import "./Footer.styles.scss"

import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <div className="footer-container ">
      <div className="footer ">
        <div className="footer-info">
          <div className="footer-text">
            <p className="title">Rudaina Foundation</p>
            <p className="footerSection_aboutText">
              Rudaina Foundation is a Canadian charity devoted to helping pregnant women.Our Community Program will introduce professionals like registered nurses, nutritionists, doctors, midwives and therapists to an online message board available for instant access to our beneficiaries.
            </p>
            
          </div>
          <div className="footer-contact">
            <p className="title">Let's keep in touch!</p>
            <p className="title-subText">
              Here at Rudaina Foundation we are always up to something .Find us on any of these platforms to see what we are up to , current event , etc. Also you can join our mailing list !
            </p>
            <form onSubmit={()=>{}}  action="">
              <div className="formContainer">
                <input className="emailField" name="email" type="email" placeholder="Your email address" required/><br/>
                <input className="submitButton" type="submit" value="SUBSCRIBE"/>
              </div>
            </form>
            <div className="footer-social">
              <a href="mailto:rudainafoundation@gmail.com?Subject=Hello%20Rudaiana%20Foundation" target="_top">
                <i className="fas fa-envelope"></i>
              </a>
              <a className="link" href="https://www.facebook.com/RudainaFoundation/" rel="noopener noreferrer" target="_blank">
                <i className="fab fa-facebook"></i>
              </a>
              <a className="link" href="https://www.instagram.com/rudainafoundation/" rel="noopener noreferrer" target="_blank">
                <i className="fab fa-instagram"></i>
              </a>
              <a className="link" href="https://twitter.com/RudainaCharity" rel="noopener noreferrer" target="_blank">
                <i className="fab fa-twitter-square"></i>
              </a>
              <a className="link" href="https://ca.linkedin.com/company/rudaina-foundation" rel="noopener noreferrer" target="_blank">
                <i class="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="footerLinks-copyright">
          <p>© {new Date().getFullYear()} Rudaina Foundation - <span className="hideOnSmallScreen">Charitable Registration Number : 118830983 RR0001.</span> </p>
          {/*<a href="/privacy-policy" target="_blank">Privacy</a>
          <a href="/terms-of-service" target="_blank">Terms</a>
          <a href="/accesibility" target="_blank">Accessibility</a>*/}
          <div className="rudaina-link">
            <Link className="link" to="/privacy-policy" target="_blank">Privacy</Link>
            <Link className="link" to="/privacy-policy" target="_blank">Terms</Link>
            <Link className="link" to="/privacy-policy" target="_blank">Accessibility</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
import React from "react";
import { Link } from "react-router-dom";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const Footer = () => {

    const handleMailToClick = () => {
        window.location.href = "mailto:help@timekeepers.com";
      };
  return (
    <div className="footer">
      <div className="row contactus">
        <div className="col-md-6 mt-3 ms-5">
          <img
            src="/images/contactus.jpeg"
            alt="contactus" 
            style={{ width: "300px" }}
          />
        </div>
        <div className="col-md-4">
          {/* <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1> */}
          <p className="text-justify mt-2"> 
          Your satisfaction is our priority, and we look forward to hearing from you!
          </p>
          <p className="mt-3">
            <BiMailSend onClick={handleMailToClick}/> : www.help@timekeepers.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 012-3456789
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-0000-0000 (toll free)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
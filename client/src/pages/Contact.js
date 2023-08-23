import React from "react";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const Contact = () => {

    const handleMailToClick = () => {
        window.location.href = "mailto:help@timekeepers.com";
      };
  return (
    <>
    <br></br>
    <br></br>
    <br></br>
<div className="row contactus mt-5 ms-5">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4 ms-5">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
          Welcome to our Contact Us page! If you have any questions, feedback, or inquiries, 
          feel free to reach out to our dedicated customer support team. We are here to assist you 
          with any queries you may have regarding our products or services. 
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
    </>
  );
};

export default Contact;
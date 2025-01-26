import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { gsap } from "gsap";
import emailjs from "@emailjs/browser";

function Contact() {
  const titleRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(titleRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, delay: 0.3 });
    gsap.fromTo(formRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, delay: 0.6 });
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    const formElement = formRef.current;

    if (!(formElement instanceof HTMLFormElement)) {
      console.error("formRef.current is not an HTMLFormElement.");
      return;
    }

    const formData = new FormData(formElement);
    const emailData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phoneNumber: formData.get("phoneNumber"),
      companyName: formData.get("companyName"),
      message: formData.get("message"),
    };

    emailjs.send("service_xpwqmr5", "template_su4nquv", emailData, "bCd9QoG8ARzLhZhrP").then(
      (result) => {
        console.log("Email sent successfully:", result.text);
        alert("Your message has been sent successfully!");
      },
      (error) => {
        console.error("Error sending email:", error);
        alert("There was an error sending your message. Please try again.");
      }
    );

    formElement.reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col">
      <div className="flex-grow mt-18 flex flex-col lg:flex-row justify-center items-center px-4 sm:px-6 md:px-8 lg:px-16 pt-28 pb-10 md:py-16 space-y-8 lg:space-y-0 lg:space-x-12">
        {/* Contact Info Section */}
        <div className="bg-gradient-to-br from-blue-900 to-blue-700 text-white px-6 py-8 sm:px-8 sm:py-10 rounded-2xl w-full lg:w-1/2 max-w-lg shadow-2xl">
          <h2 ref={titleRef} className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-blue-100">
            Get in touch
          </h2>
          <div className="space-y-6 text-sm sm:text-base">
            <div className="flex items-center space-x-4">
              <FontAwesomeIcon icon={faPhone} className="text-blue-300" />
              <p>+91-1203107109</p>
            </div>
            <div className="flex items-center space-x-4">
              <FontAwesomeIcon icon={faEnvelope} className="text-blue-300" />
              <p>support@techkrate.com</p>
            </div>
            <div className="flex items-center space-x-4">
              <FontAwesomeIcon icon={faLocationDot} className="text-blue-300" />
              <p>416, Sector 1, Vasundhara, Ghaziabad - 201012 Delhi NCR</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-300 hover:text-blue-400">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
              <a href="#" className="text-blue-300 hover:text-blue-400">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-gray-900 text-gray-100 px-6 py-8 sm:px-8 sm:py-10 rounded-lg w-full lg:w-2/5 max-w-lg shadow-xl border border-gray-800">
          <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-xs sm:text-sm font-medium text-gray-400">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="w-full p-2 bg-transparent border-b border-gray-700 text-white text-sm focus:outline-none"
                  placeholder="First Name"
                />
              </div>
              <div>
                <label className="block mb-1 text-xs sm:text-sm font-medium text-gray-400">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="w-full p-2 bg-transparent border-b border-gray-700 text-white text-sm focus:outline-none"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div>
              <label className="block mb-1 text-xs sm:text-sm font-medium text-gray-400">Email</label>
              <input
                type="email"
                name="email"
                className="w-full p-2 bg-transparent border-b border-gray-700 text-white text-sm focus:outline-none"
                placeholder="Email"
              />
            </div>
            <div>
              <label className="block mb-1 text-xs sm:text-sm font-medium text-gray-400">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                className="w-full p-2 bg-transparent border-b border-gray-700 text-white text-sm focus:outline-none"
                placeholder="Phone Number"
              />
            </div>
            <div>
              <label className="block mb-1 text-xs sm:text-sm font-medium text-gray-400">Company Name</label>
              <input
                type="text"
                name="companyName"
                className="w-full p-2 bg-transparent border-b border-gray-700 text-white text-sm focus:outline-none"
                placeholder="Company Name"
              />
            </div>
            <div>
              <label className="block mb-1 text-xs sm:text-sm font-medium text-gray-400">Message</label>
              <textarea
                name="message"
                className="w-full p-2 bg-transparent border border-gray-700 text-white text-sm focus:outline-none"
                placeholder="Your Message"
                rows="4"
              ></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 text-sm sm:text-base">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;

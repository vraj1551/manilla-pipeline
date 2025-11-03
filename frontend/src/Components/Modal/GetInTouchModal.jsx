// src/Components/Modal/GetInTouchModal.jsx
import React, { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedin,
  faWhatsapp,
  faThreads,
} from "@fortawesome/free-brands-svg-icons";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwPP24-TpB16mjgD5brKJbgfsObFq9e9RUnnA3LZx8mWOVd6HwNu98PZqCJH18EVbI/exec";

const GetInTouchModal = () => {
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: formData,
      });

      const text = await response.text();
      console.log("Response from script:", text);

      if (text.toLowerCase().includes("form submitted successfully")) {
        setFeedback("✅ Your message has been sent successfully!");
        form.reset();

        // Auto clear after 5s
        setTimeout(() => setFeedback(""), 5000);
      } else {
        setFeedback("❌ Submission failed. Server response: " + text);
        setTimeout(() => setFeedback(""), 5000);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setFeedback("❌ There was an error. Please try again later.");
      setTimeout(() => setFeedback(""), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: faInstagram, url: "https://www.instagram.com/manilla_lawfirm/" },
    { icon: faLinkedin, url: "https://www.linkedin.com/company/manilla-law-firm/" },
    { icon: faThreads, url: "https://www.threads.net/@manilla_lawfirm" },
    { icon: faWhatsapp, url: "https://wa.me/7016934885" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-2 md:p-4">
      <div className="w-full max-w-3xl rounded-lg md:p-8 bg-white shadow-sm">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
          Contact Us & Schedule
        </h1>

        {/* Contact Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {/* Phone */}
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="p-4 bg-[#ff7300] text-white rounded-full shadow-md">
              <Phone size={28} />
            </div>
            <p className="font-semibold text-gray-700">Phone</p>
            <a href="tel:+917016934885" className="text-gray-600 hover:underline">
              +91 70169 34885
            </a>
          </div>

          {/* Email */}
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="p-4 bg-[#ff7300] text-white rounded-full shadow-md">
              <Mail size={28} />
            </div>
            <p className="font-semibold text-gray-700">Email</p>
            <a
              href="mailto:millie@manilla.co.in"
              className="text-gray-600 hover:underline"
            >
              millie@manilla.co.in
            </a>
          </div>

          {/* Address */}
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="p-4 bg-[#ff7300] text-white rounded-full shadow-md">
              <MapPin size={28} />
            </div>
            <p className="font-semibold text-gray-700">Address</p>
            <p className="text-gray-600 text-sm text-center">
              28 Pratham Enclave, Opp. Sun Pharma, Sun Pharma Road, Atladra,
              Vadodara, Gujarat - 390012
            </p>
          </div>
        </div>

        {/* Google Calendar Embed */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Schedule an Appointment
          </h2>
          <div className="rounded-lg overflow-hidden shadow-md border">
            <iframe
              src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0gGWfJvwWIbh95ORzF0fhxIBp7TLNkLHjbIOxlNov1axSmtl8YHyX9sDpWmkoE-6bedF85fkmT?gv=true"
              width="100%"
              height="400"
              frameBorder="0"
              title="Google Calendar Scheduling"
              className="w-full h-[400px]"
            />
          </div>
        </div>

        {/* Contact Form */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Send Us a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                className="mt-1 block w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition"
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                className="mt-1 block w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows="4"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition"
              />
            </div>

            <button
              type="submit"
              className={`w-full py-3 px-4 bg-[#ff7300] text-white font-medium rounded-md hover:bg-[#ff7300] transition ${
                isSubmitting ? "opacity-70 pointer-events-none" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending…" : "Send Message"}
            </button>
          </form>

          {/* Feedback below form */}
          {feedback && (
            <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-center transition-opacity duration-500">
              {feedback}
            </div>
          )}
        </div>

        {/* Social Icons */}
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Connect With Us
          </h3>
          <div className="flex justify-center space-x-6">
            {socialLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                className="text-gray-600 hover:text-[#ff7300] transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={link.icon} size="2x" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInTouchModal;

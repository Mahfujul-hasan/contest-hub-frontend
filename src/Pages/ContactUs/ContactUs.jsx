import React from "react";
import emailjs from "@emailjs/browser";

import { useForm } from "react-hook-form";
import { FaFacebookF, FaLinkedin, FaLinkedinIn } from "react-icons/fa";
import { IoShareSocialSharp } from "react-icons/io5";
import { MdAlternateEmail, MdHelp } from "react-icons/md";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID, 
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          time: new Date().toLocaleString(),
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY 
      )
      .then(
        () => {
          alert("Message sent successfully!");
          reset();
        },
        (error) => {
          console.error("EmailJS Error:", error);
          alert("Failed to send message. Try again!");
        }
      );
  };

  return (
    <div className=" max-w-[1440px] mx-auto px-4 lg:px-10 py-10">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-800 text-primary mb-4">
          Get in Touch
        </h1>
        <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
          Have questions about a contest or need technical assistance? Our team
          is here to help you succeed.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left section */}
        <div className="space-y-10">
          <div className="space-y-8">
            {/* Email */}
            <div className="flex items-center gap-6">
              <div className=" h-14 w-14 rounded-full flex items-center justify-center text-white bg-linear-135 from-[#6366f1] to-[#3b82f6]">
                <MdAlternateEmail size={26} />
              </div>
              <div>
                <h3 className="text-xl font-800 mb-1">Email Us</h3>
                <p className="text-slate-500 dark:text-slate-400 ">
                  For general inquiries and support.
                </p>
                <p className="text-brand-purple dark:text-primary font-700 hover:underline">
                  mahfujulsirat00@gmail.com
                </p>
              </div>
            </div>

            {/* Help Center */}
            <div className="flex items-center gap-6">
              <div className="h-14 w-14 rounded-full flex items-center justify-center text-white bg-linear-135 from-[#6366f1] to-[#3b82f6]">
                <MdHelp size={26} />
              </div>
              <div>
                <h3 className="text-xl font-800 mb-1">Support Center</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-2">
                  Browse our documentation and FAQs.
                </p>
                <a
                  href="#"
                  className="text-brand-purple dark:text-primary font-700 hover:underline"
                >
                  Visit Help Center
                </a>
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-6">
              <div className="h-14 w-14 rounded-full flex items-center justify-center text-white bg-linear-135 from-[#6366f1] to-[#3b82f6]">
                <IoShareSocialSharp size={26} />
              </div>
              <div>
                <h3 className="text-xl font-800 mb-3">Follow Us</h3>
                <div className="flex gap-4">
                  <a
                    href="https://www.linkedin.com/in/mahfujul-hasan-dev/"
                    className="w-10 h-10 text-primary bg-base-200 rounded-full  flex items-center justify-center hover:text-secondary"
                  >
                    <FaLinkedinIn size={20} />
                  </a>

                  <a
                    href="https://www.facebook.com/mahfujul.sirat"
                    className="w-10 h-10 text-primary bg-base-200 rounded-full  flex items-center justify-center hover:text-secondary"
                  >
                    <FaFacebookF size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-base-200  p-5 rounded-lg shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-bold text-base-content/70 ml-1"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  {...register("name", { required: "Full name is required" })}
                  className="w-full px-5 py-4 rounded-lg bg-base-100 outline-none"
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-bold text-base-content/70 ml-1"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email",
                    },
                  })}
                  className="w-full px-5 py-4 rounded-lg bg-base-100 outline-none"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label
                htmlFor="subject"
                className="text-sm font-bold text-base-content/70 ml-1"
              >
                Subject
              </label>
              <input
                id="subject"
                type="text"
                placeholder="How can we help you?"
                {...register("subject", { required: "Subject is required" })}
                className="w-full px-5 py-4 rounded-lg bg-base-100 outline-none"
              />
              {errors.subject && (
                <p className="text-sm text-red-500">{errors.subject.message}</p>
              )}
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-sm font-bold text-base-content/70 ml-1"
              >
                Your Message
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Tell us more about your inquiry..."
                {...register("message", {
                  required: "Message is required",
                  minLength: {
                    value: 10,
                    message: "Message must be at least 10 characters",
                  },
                })}
                className="w-full px-5 py-4 rounded-lg bg-base-100 outline-none"
              />
              {errors.message && (
                <p className="text-sm text-red-500">{errors.message.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full  text-white font-800 py-5 rounded-lg bg-linear-135 from-[#6366f1] to-[#3b82f6] flex items-center justify-center gap-2"
            >
              Send Message
              <span className="material-symbols-outlined">send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

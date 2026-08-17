"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FaPaperPlane } from "react-icons/fa";

const initialState = { name: "", email: "", subject: "", message: "" };

export default function ContactForm() {
  const [formData, setFormData] = useState(initialState);
  const [isPending, setIsPending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    // Frontend-only placeholder — no backend contact endpoint yet.
    await new Promise((resolve) => setTimeout(resolve, 900));

    toast.success("Message sent! We'll get back to you soon.");
    setFormData(initialState);
    setIsPending(false);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium text-gray-300">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-gray-500 transition focus:border-violet-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-sm font-medium text-gray-300"
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-gray-500 transition focus:border-violet-500"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <label
          htmlFor="subject"
          className="text-sm font-medium text-gray-300"
        >
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          value={formData.subject}
          onChange={handleChange}
          placeholder="How can we help?"
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-gray-500 transition focus:border-violet-500"
        />
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <label
          htmlFor="message"
          className="text-sm font-medium text-gray-300"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us more about your question or feedback..."
          className="resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-gray-500 transition focus:border-violet-500"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-violet-600 px-7 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isPending ? (
          "Sending..."
        ) : (
          <>
            Send Message <FaPaperPlane />
          </>
        )}
      </button>
    </form>
  );
}

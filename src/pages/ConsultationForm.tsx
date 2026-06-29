import { useForm } from "@formspree/react";
import React from "react";

const ConsultationForm = () => {
  const [state, handleSubmit] = useForm("xjgqrplq");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Bitcoin Consultation Request</h1>
          <p className="mb-6 text-muted-foreground">
            Please fill out the form below to request a consultation. We will respond within 24 hours.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-2 border border-input bg-background/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2 border border-input bg-background/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="phone">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-4 py-2 border border-input bg-background/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="message">
                Describe your inquiry
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                required
                className="w-full px-4 py-2 border border-input bg-background/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                disabled={state.status === "submitting"}
              >
                {state.status === "submitting" ? "Sending..." : "Transmit Inquiry"}
              </button>
            </div>
          </form>

          {state.status === "success" && (
            <p className="mt-4 text-sm text-success">
              Your inquiry has been sent! We will respond within 24 hours.
            </p>
          )}
          {state.status === "error" && (
            <p className="mt-4 text-sm text-destructive">
              Failed to send. Please try again.
            </p>
          )}

          <p className="mt-6 text-sm text-muted-foreground">
            SECURE CONNECTION ESTABLISHED. Response time: ~24 hours.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ConsultationForm;
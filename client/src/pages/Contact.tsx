import { useState } from "react";
import { useLocation } from "wouter";
import { Icons } from "@/lib/icons";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { Section } from "@/components/ui/section/Section";
import { SectionCard } from "@/components/ui/section/SectionCard";

import { PremiumButton } from "@/components/ui/button/PremiumButton";
import { setSEOHead } from "@/components/SEOHead";

import { getContent } from "@/lib/content";

const Mail = Icons.Mail;
const CheckCircle = Icons.CheckCircle;
const AlertCircle = Icons.AlertCircle;

export default function Contact() {
  const [location] = useLocation();
  const lang = location.split("/")[1] || "pt";

  const content = getContent("contact", lang);

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("message", form.message);
      formData.append("_captcha", "false");

      const res = await fetch("https://formsubmit.co/sapiente.ai.oficial@gmail.com", {
        method: "POST",
        body: formData
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        throw new Error();
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">

      <Header />

      {/* HERO */}
      <Section className="pt-32 pb-20 text-center">
        <div className="max-w-3xl mx-auto">

          <h1 className="text-4xl md:text-6xl font-semibold mb-6">
            {content.title}
          </h1>

          <p className="text-lg text-gray-600">
            {content.subtitle}
          </p>

        </div>
      </Section>

      {/* FORM */}
      <Section>
        <div className="max-w-3xl mx-auto">

          <SectionCard className="p-8">

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* NAME */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  {content.form.name}
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="
                    w-full px-4 py-3 rounded-xl
                    border border-gray-300
                    focus:outline-none focus:ring-2 focus:ring-cyan-400/30
                  "
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  {content.form.email}
                </label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  className="
                    w-full px-4 py-3 rounded-xl
                    border border-gray-300
                    focus:outline-none focus:ring-2 focus:ring-cyan-400/30
                  "
                />
              </div>

              {/* MESSAGE */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  {content.form.message}
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  className="
                    w-full px-4 py-3 rounded-xl
                    border border-gray-300
                    focus:outline-none focus:ring-2 focus:ring-cyan-400/30
                  "
                />
              </div>

              {/* STATUS */}
              {status === "success" && (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  {content.success}
                </div>
              )}

              {status === "error" && (
                <div className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="w-5 h-5" />
                  {content.error}
                </div>
              )}

              {/* CTA */}
              <PremiumButton>
                {status === "loading" ? content.sending : content.button}
              </PremiumButton>

            </form>

          </SectionCard>

        </div>
      </Section>

      <Footer />
    </div>
  );
}
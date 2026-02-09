import React, { useState, useEffect } from 'react';
import { Content } from '../types';
import { GlassCard } from './ui/GlassCard';
import { ArrowLeft, Send, CheckCircle, AlertCircle } from 'lucide-react';
import SEO from './SEO';

interface ContactProps {
  text: Content['contactPage'];
  onBack?: () => void;
}

const Contact: React.FC<ContactProps> = ({ text, onBack }) => {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('sending');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mvzglldv", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormState('success');
        form.reset();
      } else {
        setFormState('error');
      }
    } catch (error) {
      setFormState('error');
    }
  };

  return (
    <section className="pt-40 pb-24 min-h-screen px-4">
      <SEO
        title={`${text.title} | ABU`}
        description="Contact support for help with ABU - Upsell & Cross-sell app."
      />
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-blue-300 hover:text-white mb-8 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>{text.backButton}</span>
        </button>

        <GlassCard className="p-8 md:p-12">
          {formState === 'success' ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={32} className="text-green-500" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">{text.form.successTitle}</h2>
              <p className="text-blue-100/70 mb-8">{text.form.successMessage}</p>
              <button
                onClick={onBack}
                className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-colors"
              >
                {text.backButton}
              </button>
            </div>
          ) : (
            <>
              <div className="text-center mb-10">
                <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                  {text.title}
                </h1>
                <p className="text-gray-400">{text.subtitle}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-blue-200/80 mb-2">
                    {text.form.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-blue-200/80 mb-2">
                    {text.form.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-blue-200/80 mb-2">
                    {text.form.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-colors resize-none"
                  ></textarea>
                </div>

                {formState === 'error' && (
                  <div className="flex items-center space-x-2 text-red-400 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    <AlertCircle size={18} />
                    <span className="text-sm">{text.form.error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formState === 'sending'}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-blue-500/25 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formState === 'sending' ? (
                    <span>{text.form.sending}</span>
                  ) : (
                    <>
                      <span>{text.form.submit}</span>
                      <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </GlassCard>
      </div>
    </section>
  );
};

export default Contact;
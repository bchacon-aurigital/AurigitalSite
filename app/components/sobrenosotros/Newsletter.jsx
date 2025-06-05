"use client";

import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Mail } from 'lucide-react';

const Newsletter = ({ variant = 'embedded' }) => {
    const { translations } = useLanguage();
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined' && !window.ml) {
            const script = document.createElement('script');
            script.src = 'https://groot.mailerlite.com/js/w/webforms.min.js?v176e10baa5e7ed80d35ae235be3d5024';
            script.async = true;
            document.head.appendChild(script);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmitting(true);
        setError('');

        try {
            const formData = new FormData();
            formData.append('fields[email]', email);
            formData.append('ml-submit', '1');
            formData.append('anticsrf', 'true');

            const response = await fetch('https://assets.mailerlite.com/jsonp/1023137/forms/156290847285970148/subscribe', {
                method: 'POST',
                body: formData,
                mode: 'no-cors' 
            });

            setIsSubmitting(false);
            setIsSubmitted(true);
            setEmail('');

            setTimeout(() => {
                setIsSubmitted(false);
            }, 3000);

        } catch (error) {
            console.error('Error subscribing to newsletter:', error);
            setError(translations.newsletter?.error || 'Error al suscribirse');
            setIsSubmitting(false);
        }
    };

    const handlePopupClick = () => {
        if (typeof window !== 'undefined' && window.ml) {
            window.ml('show', 'UI3Zmc', true);
        } else {
            console.warn('MailerLite no está cargado');
        }
    };

    const newsletterData = translations.newsletter;

    if (variant === 'popup') {
        return (
            <button
                onClick={handlePopupClick}
                className="px-6 py-3 bg-[#00BBFF] text-black font-normal rounded-lg transition-all duration-300 whitespace-nowrap font-qurova hover:bg-[#00a8e6] border border-black"
            >
                {newsletterData.button}
            </button>
        );
    }

    if (variant === 'link') {
        return (
            <a
                href="javascript:void(0)"
                onClick={handlePopupClick}
                className="text-[#00BBFF] underline hover:text-[#00a8e6] transition-colors duration-300"
            >
                {newsletterData.button}
            </a>
        );
    }

    return (
        <section className="relative w-full overflow-hidden bg-[#00BBFF] mx-auto max-w-[110rem] rounded-xl" data-aos="fade-right">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
                    <div className="flex-1 text-center lg:text-left">
                        <h2 className="text-xl font-medium text-black font-qurova mb-2 lg:mb-0">
                            {newsletterData.title}
                        </h2>
                    </div>
                    <div className="flex-shrink-0 w-full lg:w-auto">
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-1 max-w-md lg:max-w-none mx-auto lg:mx-0">
                            <div className="relative flex flex-row items-center min-w-0 border border-black rounded-lg px-3">
                                <Mail className="w-5 h-5 text-black ml-2" />
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={newsletterData.placeholder}
                                    className="w-full px-1 py-3 rounded-lg bg-transparent text-black placeholder-black font-mansfield font-extralight focus:outline-none focus:ring-0"
                                    required
                                    disabled={isSubmitting || isSubmitted}
                                    autoComplete="email"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting || isSubmitted || !email}
                                className="px-6 py-3 bg-black text-[#00BBFF] font-normal rounded-lg transition-all duration-300 whitespace-nowrap font-qurova hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        {newsletterData.submitting}
                                    </span>
                                ) : isSubmitted ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        {newsletterData.success}
                                    </span>
                                ) : (
                                    newsletterData.button
                                )}
                            </button>
                        </form>
                        {error && (
                            <p className="text-red-600 text-sm mt-2 text-center lg:text-left">
                                {error}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter; 
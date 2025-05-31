"use client";

import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Mail } from 'lucide-react';

const Newsletter = () => {
    const { translations } = useLanguage();
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmitting(true);
        
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setEmail('');
            
            setTimeout(() => {
                setIsSubmitted(false);
            }, 3000);
        }, 1000);
    };

    const newsletterData = translations.newsletter;

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
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-1 max-w-md lg:max-w-none mx-auto lg:mx-0 ">
                            <div className="relative flex flex-row items-center min-w-0 border border-black rounded-lg px-3">
                                <Mail className="w-5 h-5 text-black ml-2" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={newsletterData.placeholder}
                                    className="w-full px-1 py-3 rounded-lg bg-transparent text-black placeholder-black font-mansfield font-extralight focus:outline-none focus:ring-0"
                                    required
                                    disabled={isSubmitting || isSubmitted}
                                />
                            </div>
                            
                            <button
                                type="submit"
                                disabled={isSubmitting || isSubmitted || !email}
                                className="px-6 py-3 bg-black text-[#00BBFF] font-normal rounded-lg transition-all duration-300 whitespace-nowrap font-qurova "
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
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter; 
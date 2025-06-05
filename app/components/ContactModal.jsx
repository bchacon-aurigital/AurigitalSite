"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FaPhoneAlt, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { FaTag } from "react-icons/fa6";
import { useLanguage } from '../context/LanguageContext';

const ContactModal = ({ isOpen, onClose }) => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    nombre_completo: '',
    correo_electronico: '',
    servicio_interes: '',
    comentario: ''
  });

  const { translations } = useLanguage();
  const contactModal = translations.contactModal;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setSuccess(false);

    emailjs.sendForm(
      'service_rum3kyn',
      'template_mub9opt',
      formRef.current,
      'O8rzLuaPLX2I1_heK'
    )
      .then((result) => {
        setLoading(false);
        setSuccess(true);
        setFormData({
          nombre_completo: '',
          correo_electronico: '',
          servicio_interes: '',
          comentario: ''
        });
      }, (error) => {
        setLoading(false);
        setError(true);
      });
  };

  const sliderVariants = {
    hidden: { x: '100%' },
    visible: {
      x: 0,
      transition: {
        type: 'tween',
        ease: "easeInOut",
        duration: 0.5
      }
    },
    exit: {
      x: '100%',
      transition: {
        type: 'tween',
        ease: "easeInOut",
        duration: 0.5
      }
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 overflow-auto"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={sliderVariants}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="absolute lg:inset-0 flex items-center justify-center bg-[#1E1E1E]">
            <button
              onClick={onClose}
              className="absolute top-4 left-4 text-white hover:text-gray-300 transition-colors z-10"
              aria-label={contactModal.closeButton}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="37" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 max-w-7xl">
              <div className="bg-[#101010] text-white py-10 px-12 rounded-xl h-full">
                <h2 className="text-3xl font-medium mb-2 font-qurova">{contactModal.connectTitle}</h2>
                <p className="text-md text-[#eeeeeed7] mb-8 font-mansfield font-light">
                  {contactModal.connectDescription}
                </p>

                <div className="space-y-6">
                  <a
                    href={`mailto:${contactModal.contact.email}`}
                    className="gap-3 flex items-center justify-center w-full bg-transparent border border-[#B2FF00] py-3 rounded-full transition-colors duration-500 hover:text-black hover:bg-[#B2FF00] hover:border-transparent font-mansfield"
                  >
                    <MdMailOutline className='w-6 h-6' />
                    {contactModal.contact.email}
                  </a>

                  <a
                    href="https://wa.me/50688888169"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-3 flex items-center justify-center w-full bg-transparent border border-[#515151] py-3 rounded-full transition-colors duration-500 hover:text-black hover:bg-white hover:border-transparent font-mansfield"
                  >
                    <FaPhoneAlt className='w-5 h-5' />
                    {contactModal.contact.whatsapp}
                  </a>

                  <a
                    href="https://www.google.com/maps?ll=9.911489,-84.138238&z=18&t=m&hl=es&gl=CR&mapclient=embed"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-3 text-sm flex items-center justify-center w-full bg-transparent border border-[#515151] py-3 rounded-full transition-colors duration-500 hover:text-black hover:bg-white hover:border-transparent font-mansfield"
                  >
                    <IoLocationSharp className='w-6 h-6' />
                    {contactModal.contact.location}
                  </a>

                  <a
                    href="#"
                    className="gap-3 flex items-center justify-center w-full bg-transparent border border-[#515151] py-3 rounded-full transition-colors duration-500 hover:text-black hover:bg-white hover:border-transparent font-mansfield"
                  >
                    <FaTag className='w-6 h-6' />
                    {contactModal.contact.brandTag}
                  </a>
                </div>

                <div className="mt-8 flex justify-center gap-2">
                  <a
                    href="https://www.instagram.com/aurigital"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs md:text-sm px-2 py-3 w-full gap-2 flex items-center justify-center bg-transparent border border-[#515151] rounded-full transition-colors duration-500 hover:text-black hover:bg-white hover:border-transparent"
                    aria-label={contactModal.contact.socialMedia.instagram}
                  >
                    <FaInstagram className='w-5 h-5' /> {contactModal.contact.socialMedia.instagram}
                  </a>

                  <a
                    href="https://www.facebook.com/aurigital"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs md:text-sm px-2 py-3 w-full gap-2 flex items-center justify-center bg-transparent border border-[#515151] rounded-full transition-colors duration-500 hover:text-black hover:bg-white hover:border-transparent"
                    aria-label={contactModal.contact.socialMedia.facebook}
                  >
                    <FaFacebook className='w-5 h-5' /> {contactModal.contact.socialMedia.facebook}
                  </a>

                  <a
                    href="https://www.linkedin.com/company/aurigital"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs md:text-sm px-2 py-3 w-full gap-2 flex items-center justify-center bg-transparent border border-[#515151] rounded-full transition-colors duration-500 hover:text-black hover:bg-white hover:border-transparent"
                    aria-label={contactModal.contact.socialMedia.linkedin}
                  >
                    <FaLinkedin className='w-5 h-5' /> {contactModal.contact.socialMedia.linkedin}
                  </a>
                </div>
              </div>

              <div className="bg-[#101010] p-8 text-white rounded-xl">
                <h2 className="text-3xl font-medium mb-2 font-qurova" id="contact-modal-title">{contactModal.projectTitle}</h2>
                <p className="text-md text-[#eeeeeed7] mb-8 font-mansfield font-light">
                  {contactModal.projectDescription}
                </p>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="nombre_completo" className="block text-md font-medium mb-1 font-mansfield">
                      {contactModal.form.fullName}
                    </label>
                    <input
                      type="text"
                      id="nombre_completo"
                      name="nombre_completo"
                      value={formData.nombre_completo}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#515151] rounded-lg bg-transparent focus:outline-none focus:border-[#B2FF00] font-mansfield"
                      placeholder={contactModal.form.fullNamePlaceholder}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="correo_electronico" className="block text-md font-medium mb-1 font-mansfield">
                      {contactModal.form.email}
                    </label>
                    <input
                      type="email"
                      id="correo_electronico"
                      name="correo_electronico"
                      value={formData.correo_electronico}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#515151] rounded-lg bg-transparent focus:outline-none focus:border-[#B2FF00] font-mansfield"
                      placeholder={contactModal.form.emailPlaceholder}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="servicio_interes" className="block text-md font-medium mb-1 font-mansfield">
                      {contactModal.form.serviceOfInterest}
                    </label>
                    <div className="relative">
                      <select
                        id="servicio_interes"
                        name="servicio_interes"
                        value={formData.servicio_interes}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[#515151] rounded-lg bg-transparent focus:outline-none focus:border-[#B2FF00] appearance-none font-mansfield"
                        required
                      >
                        <option value="">{contactModal.form.serviceSelectPlaceholder}</option>
                        <option value={contactModal.form.services.webDevelopment}>{contactModal.form.services.webDevelopment}</option>
                        <option value={contactModal.form.services.webDesign}>{contactModal.form.services.webDesign}</option>
                        <option value={contactModal.form.services.ecommerce}>{contactModal.form.services.ecommerce}</option>
                        <option value={contactModal.form.services.professionalBlog}>{contactModal.form.services.professionalBlog}</option>
                        <option value={contactModal.form.services.onlineCatalog}>{contactModal.form.services.onlineCatalog}</option>
                        <option value={contactModal.form.services.webScheduling}>{contactModal.form.services.webScheduling}</option>
                        <option value={contactModal.form.services.landingPage}>{contactModal.form.services.landingPage}</option>
                        <option value={contactModal.form.services.customFunctionalities}>{contactModal.form.services.customFunctionalities}</option>
                        <option value={contactModal.form.services.seo}>{contactModal.form.services.seo}</option>
                        <option value={contactModal.form.services.brandManual}>{contactModal.form.services.brandManual}</option>
                        <option value={contactModal.form.services.emailMarketing}>{contactModal.form.services.emailMarketing}</option>
                        <option value={contactModal.form.services.other}>{contactModal.form.services.other}</option>
                      </select>
                      <div className="absolute inset-y-0 right-2 flex items-center px-2 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="comentario" className="block text-md font-medium mb-1 font-mansfield">
                      {contactModal.form.projectDescription}
                    </label>
                    <textarea
                      id="comentario"
                      name="comentario"
                      value={formData.comentario}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 border border-[#515151] rounded-lg bg-transparent focus:outline-none focus:border-[#B2FF00] font-mansfield"
                      placeholder={contactModal.form.projectDescriptionPlaceholder}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-4 py-3 bg-[#B2FF00] rounded-full text-black font-medium hover:bg-[#9FE600] transition-colors duration-500 focus:outline-none font-qurova"
                  >
                    {loading ? contactModal.form.submittingButton : contactModal.form.submitButton}
                  </button>

                  {success && (
                    <div className="p-4 bg-green-900/50 border border-green-500 text-green-400 rounded-lg font-mansfield">
                      {contactModal.messages.success}
                    </div>
                  )}

                  {error && (
                    <div className="p-4 bg-red-900/50 border border-red-500 text-red-400 rounded-lg font-mansfield">
                      {contactModal.messages.error}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FaPhoneAlt, FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { PiMailboxBold } from "react-icons/pi";
import { FaTag } from "react-icons/fa6";

const ContactModal = ({ isOpen, onClose }) => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    nombre_completo: '',
    correo_electronico: '',
    producto_interes: '',
    comentario: ''
  });

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
      'service_nbkc89a',
      'template_i0qrs59',
      formRef.current,
      '0716KAyz61ipk6qNW'
    )
      .then((result) => {
        setLoading(false);
        setSuccess(true);
        setFormData({
          nombre_completo: '',
          correo_electronico: '',
          producto_interes: 'Fotovoltaica',
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
          <div className="absolute lg:inset-0 flex items-center justify-center bg-[#2B4A55]">
            <button
              onClick={onClose}
              className="absolute top-4 left-4 text-white hover:text-gray-300 transition-colors z-10"
              aria-label={t('contact.closeButton')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="37" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 max-w-7xl">
              <div className="bg-[#20353D] text-white py-10 px-12 rounded-xl h-full">
                <h2 className="text-3xl font-medium mb-2">{t('contact.title')}</h2>
                <p className="text-md text-[#eeeeeed7] mb-8 font-thin">
                  {t('contact.subtitle')}
                </p>

                <div className="space-y-8">
                  <a
                    href="tel:+50624381130"
                    className="gap-3 flex items-center justify-center w-full bg-transparent border border-[#E9E9E9] py-3 rounded-full transition-colors duration-500 hover:text-black hover:bg-[#ffffff] hover:border-transparent font-light"
                  >
                    <FaPhoneAlt className='w-5 h-5' />
                    (+506) 2438 1130
                  </a>

                  <a
                    href="mailto:info@swissol.net"
                    className="gap-3 flex items-center justify-center w-full bg-transparent border border-[#E9E9E9] py-3 rounded-full transition-colors duration-500 hover:text-black hover:bg-[#ffffff] hover:border-transparent font-light"
                  >
                    <MdMailOutline className='w-6 h-6' />
                    info@swissol.net
                  </a>

                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=9.9731233%2C-84.211285"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-1 text-xs md:text-sm flex items-center justify-center w-full bg-transparent border border-[#E9E9E9] py-3 rounded-full transition-colors duration-500 hover:text-black hover:bg-[#ffffff] hover:border-transparent font-light"
                  >
                    <IoLocationSharp className='w-6 h-6' />
                    {t('contact.address')}
                  </a>

                  <a
                    href="#"
                    className="gap-3 flex items-center justify-center w-full bg-transparent border border-[#E9E9E9] py-3 rounded-full transition-colors duration-500 hover:text-black hover:bg-[#ffffff] hover:border-transparent font-light"
                  >
                    <PiMailboxBold className='w-6 h-6' />
                    {t('contact.poBox')}
                  </a>

                  <a
                    href="#"
                    className="gap-3 flex items-center justify-center w-full bg-transparent border border-[#E9E9E9] py-3 rounded-full transition-colors duration-500 hover:text-black hover:bg-[#ffffff] hover:border-transparentfont-light"
                  >
                    <FaTag className='w-6 h-6' />
                    Swissol
                  </a>
                </div>

                <div className="mt-8 flex justify-center gap-2">
                  <a
                    href="https://www.instagram.com/swissol/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs md:text-sm px-2 py-3 w-full gap-2 flex items-center justify-center bg-transparent border border-[#E9E9E9] rounded-full transition-colors duration-500 hover:text-black hover:bg-[#ffffff] hover:border-transparent"
                    aria-label="Instagram"
                  >
                    <FaInstagram className='w-5 h-5' /> Instagram
                  </a>

                  <a
                    href="https://www.facebook.com/swissol.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs md:text-sm px-2 py-3 w-full gap-2 flex items-center justify-center bg-transparent border border-[#E9E9E9] rounded-full transition-colors duration-500 hover:text-black hover:bg-[#ffffff] hover:border-transparent"
                    aria-label="Facebook"
                  >
                    <FaFacebook className='w-5 h-5' /> Facebook
                  </a>

                  <a
                    href="https://www.youtube.com/channel/UCVeShVVETWEkt6Okx4pBvEw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs md:text-sm px-2 py-3 w-full gap-2 flex items-center justify-center bg-transparent border border-[#E9E9E9] rounded-full transition-colors duration-500 hover:text-black hover:bg-[#ffffff] hover:border-transparent"
                    aria-label="TikTok"
                  >
                    <FaYoutube className='w-5 h-5' /> Youtube
                  </a>
                </div>
              </div>

              <div className="bg-[#20353D] p-8 text-white rounded-xl">
                <h2 className="text-3xl font-medium mb-2" id="contact-modal-title">{t('contact.form.title')}</h2>
                <p className="text-md text-[#eeeeeed7] mb-8 font-thin">
                  {t('contact.form.subtitle')}
                </p>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="nombre_completo" className="block text-md font-medium mb-1">
                      {t('contact.form.fullName')}
                    </label>
                    <input
                      type="text"
                      id="nombre_completo"
                      name="nombre_completo"
                      value={formData.nombre_completo}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#A3A3A3] rounded-lg bg-transparent focus:outline-none"
                      placeholder={t('contact.form.fullNamePlaceholder')}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="correo_electronico" className="block text-md font-medium mb-1">
                      {t('contact.form.email')}
                    </label>
                    <input
                      type="email"
                      id="correo_electronico"
                      name="correo_electronico"
                      value={formData.correo_electronico}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#A3A3A3] rounded-lg bg-transparent focus:outline-none"
                      placeholder={t('contact.form.emailPlaceholder')}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="producto_interes" className="block text-md font-medium mb-1">
                      {t('contact.form.product')}
                    </label>
                    <div className="relative">
                      <select
                        id="producto_interes"
                        name="producto_interes"
                        value={formData.producto_interes}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[#A3A3A3] rounded-lg bg-transparent focus:outline-none appearance-none"
                        required
                      >
                        <option value="Calefacción Solar para Piscinas">{t('productosSolares.productos.calefaccionPiscinas.titulo')}</option>
                        <option value="Calentador Solar Tipo Termosifón">{t('productosSolares.productos.termosifon.titulo')}</option>
                        <option value="Calentador Solar Tipo Forzado">{t('productosSolares.productos.forzado.titulo')}</option>
                        <option value="Sistemas Fotovoltaicos">{t('productosSolares.productos.fotovoltaicos.titulo')}</option>
                        <option value="Sistema Flexible de Tuberías “SANIPEX”">{t('productosSolares.productos.sanipex.titulo')}</option>
                        <option value="Secador Solar">{t('productosSolares.productos.secador.titulo')}</option>
                        <option value="Otro">{t('contact.form.options.other')}</option>

                      </select>
                      <div className="absolute inset-y-0 right-2 flex items-center px-2 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="comentario" className="block text-md font-medium mb-1">
                      {t('contact.form.comment')}
                    </label>
                    <textarea
                      id="comentario"
                      name="comentario"
                      value={formData.comentario}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 border border-[#A3A3A3] rounded-lg bg-transparent focus:outline-none"
                      placeholder={t('contact.form.commentPlaceholder')}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-4 py-3 border border-[#A3A3A3 bg-transparent rounded-full text-white hover:text-black hover:bg-[#FFA90B] hover:border-transparent transition-colors duration-500 focus:outline-none"
                  >
                    {loading ? t('contact.form.sending') : t('contact.form.send')}
                  </button>

                  {success && (
                    <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                      {t('contact.form.successMessage')}
                    </div>
                  )}

                  {error && (
                    <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                      {t('contact.form.errorMessage')}
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
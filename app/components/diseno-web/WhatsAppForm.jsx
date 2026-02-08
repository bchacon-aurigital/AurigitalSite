'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { trackFormStart, trackWhatsAppConversion, getPackageValue } from '@/app/lib/analytics';

// Formulario de contacto con integración a WhatsApp
export default function WhatsAppForm({ selectedPackage = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    package: selectedPackage
  });

  // Update package when selectedPackage prop changes
  useEffect(() => {
    if (selectedPackage) {
      setFormData(prev => ({
        ...prev,
        package: selectedPackage
      }));
    }
  }, [selectedPackage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación básica
    if (!formData.name || !formData.email) {
      alert('Por favor completá todos los campos requeridos');
      return;
    }

    // Track conversión antes de abrir WhatsApp
    const packageValue = getPackageValue(formData.package);
    trackWhatsAppConversion(formData.package || 'unknown', packageValue);

    // Construir mensaje de WhatsApp
    const packageText = formData.package
      ? `el paquete ${formData.package} de diseño web`
      : 'los servicios de diseño web';

    const message = `Hola! Soy ${formData.name} (${formData.email}).
Estoy interesado en ${packageText}.
¿Podrían darme más información?`;

    // Número de WhatsApp de Aurigital
    const whatsappNumber = '50688888169';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Abrir WhatsApp
    window.open(whatsappUrl, '_blank');

    // Limpiar formulario
    setFormData({
      name: '',
      email: '',
      package: ''
    });
  };

  return (
    <section id="contact-form" ref={ref} className="py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="p-8 md:p-12 bg-gradient-to-br from-[#1a1a1a] to-[#252525] border-2 border-[#B2FF00] rounded-3xl"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-white mb-3 text-center"
          >
            ¿Listo para empezar?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-300 text-lg mb-8 text-center"
          >
            Completá el formulario y continuamos por WhatsApp
          </motion.p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <label htmlFor="name" className="block text-white font-semibold mb-2">
                Nombre <span className="text-[#B2FF00]">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => trackFormStart('landing_contact_form')}
                required
                className="w-full px-4 py-3 bg-[#101010] border border-gray-700 rounded-lg text-white focus:border-[#B2FF00] focus:outline-none transition-all duration-300"
                placeholder="Tu nombre completo"
              />
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <label htmlFor="email" className="block text-white font-semibold mb-2">
                Email <span className="text-[#B2FF00]">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#101010] border border-gray-700 rounded-lg text-white focus:border-[#B2FF00] focus:outline-none transition-all duration-300"
                placeholder="tu@email.com"
              />
            </motion.div>

            {/* Paquete */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <label htmlFor="package" className="block text-white font-semibold mb-2">
                Paquete de interés
              </label>
              <select
                id="package"
                name="package"
                value={formData.package}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#101010] border border-gray-700 rounded-lg text-white focus:border-[#B2FF00] focus:outline-none transition-all duration-300"
              >
                <option value="">Seleccioná un paquete</option>
                <option value="Professional Pack">Professional Pack</option>
                <option value="Startup Pack">Startup Pack</option>
                <option value="Enterprise Pack">Enterprise Pack</option>
                <option value="Quiero que me recomienden el paquete ideal">Quiero que me recomienden el paquete ideal</option>
              </select>
            </motion.div>

            {/* Submit button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              type="submit"
              className="w-full py-4 bg-[#B2FF00] text-[#101010] font-bold rounded-lg hover:bg-[#9FE600] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#B2FF00]/20 text-lg flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Enviar a WhatsApp
            </motion.button>
          </form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-gray-400 text-sm text-center mt-6"
          >
            Al enviar, abriremos WhatsApp con tu información prellenada
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

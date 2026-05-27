"use client";
import Image from "next/image";
import { useLanguage } from "../../context/LanguageContext";
import { useContactModal } from "../../context/ContactModalContext";
import CotizacionButton from "../ui/CotizacionButton";

const BORDER = "border-[#1e3f52]/70";

const Servicios = () => {
    const { translations } = useLanguage();
    const { openModal } = useContactModal();
    const { title, description, cta, cards } = translations.servicios;

    return (
        <div
            className={`border border-dashed ${BORDER} rounded-sm`}
            data-aos="fade-up"
        >
            {/* Top row */}
            <div className={`grid grid-cols-1 lg:grid-cols-2 border-b border-dashed ${BORDER}`}>
                {/* Left — title */}
                <div className={`p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-dashed ${BORDER}`}>
                    <h2 className="text-3xl lg:text-5xl leading-tight font-space-grotesk uppercase text-white">
                        <span className="font-normal">{title.part1}</span>{" "}
                        <span className="italic font-bold font-mansfield">{title.part2}</span>
                    </h2>
                </div>

                {/* Right — description + CTA */}
                <div className="p-8 lg:p-12 flex flex-col justify-center gap-6">
                    <p className="text-white/70 font-red-hat font-light text-sm leading-relaxed max-w-sm">
                        {description}
                    </p>
                    <CotizacionButton onClick={openModal}>
                        {cta}
                    </CotizacionButton>
                </div>
            </div>

            {/* Cards row */}
            <div className="grid grid-cols-1 md:grid-cols-3">
                {cards.map((card, i) => (
                    <div
                        key={i}
                        className={`flex flex-col min-h-[420px] ${i < cards.length - 1 ? `border-b md:border-b-0 md:border-r border-dashed ${BORDER}` : ""}`}
                    >
                        {/* SVG icon — centered in upper area */}
                        <div className="flex-1 flex items-center justify-center py-12 px-8">
                            <Image
                                src={`/assets/home/svg/${card.image}`}
                                alt={card.title}
                                width={180}
                                height={180}
                                unoptimized={true}
                                className="object-contain"
                            />
                        </div>

                        {/* Text — anchored to bottom */}
                        <div className="p-6 lg:p-8">
                            <h3 className="font-space-grotesk font-bold uppercase text-white text-sm lg:text-base leading-tight mb-3">
                                {card.title}
                            </h3>
                            <p className="font-red-hat font-light text-white/50 text-sm leading-relaxed">
                                {card.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Servicios;

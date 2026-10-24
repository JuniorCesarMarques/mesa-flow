"use client";

import { FaWhatsapp } from "react-icons/fa";

type WhatsAppButtonProps = {
  phone: string;
  message?: string;
};

export default function WhatsAppButton({
  phone,
  message = "Olá! Gostaria de mais informações.",
}: WhatsAppButtonProps) {
  const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco pelo WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
    >
      <FaWhatsapp size={32} />
    </a>
  );
}
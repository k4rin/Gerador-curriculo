import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";


interface PersonalInfoData {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  summary: string;
}

interface PersonalInfoProps {
  data:  PersonalInfoData;
  onChange: (field: keyof  PersonalInfoData, value: string) => void;
   onImproveSummary: (text: string) => void; // Prop restaurada para compatibilidade
  isSummaryLoading: boolean; 
}

interface Errors {
  name?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  summary?: string;
}

const MAX_SUMMARY_LENGTH = 500;

export function PersonalInfo({ data, onChange,  onImproveSummary, isSummaryLoading }: PersonalInfoProps) {
  const [errors, setErrors] = useState<Errors>({});

 
  // Validação em tempo real
  useEffect(() => {
    const newErrors: Errors = {};
    if (!data.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }
    if (!data.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      newErrors.email = "Email inválido";
    }

    if (data.phone.trim() && !/^\+?[\d\s\-()]{7,15}$/.test(data.phone)) {
      newErrors.phone = "Telefone inválido";
    }
    if (data.linkedin.trim() && !/^https?:\/\/(www\.)?linkedin\.com\/.*$/.test(data.linkedin)) {
      newErrors.linkedin = "URL do LinkedIn inválida";
    }
    if (data.summary.length > MAX_SUMMARY_LENGTH) {
      newErrors.summary = `Resumo deve ter no máximo ${MAX_SUMMARY_LENGTH} caracteres`;
    }

    setErrors(newErrors);
  }, [data]);

  // Handler genérico para inputs
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    onChange(name as keyof PersonalInfoData, value);
  }

   //  Chama a IA para melhorar o summary
   const handleImproveSummary = () => {
    if (!data.summary.trim()) 
      return;
    onImproveSummary(data.summary);
  };


  return (
    <form className="space-y-4 p-4">
      {/* Nome */}
      <div>
        <label htmlFor="name" className="block font-semibold mb-1">
          Nome <span className="text-[#d60000]">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={data.name}
          onChange={handleChange}
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
            errors.name ? "border-[#ef4444] focus:ring-[#ef4444]" : "border-[#d1d5db] focus:ring-[#3b82f6]"
          }`}
          placeholder="Seu nome completo"
          required
        />
        {errors.name && <p className="text-[#d60000] text-sm mt-1">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block font-semibold mb-1">
          Email <span className="text-[#d60000] ">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
            errors.email ? "border-[#ef4444] focus:ring-[#ef4444]" : "border-[#d1d5db] focus:ring-[#3b82f6]"
          }`}
          placeholder="exemplo@dominio.com"
          required
        />
        {errors.email && <p className="text-[#d60000] text-sm mt-1">{errors.email}</p>}
      </div>

         {/* Telefone */}
      <div>
        <label htmlFor="phone" className="block font-semibold mb-1">
          Telefone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={data.phone}
          onChange={handleChange}
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
            errors.phone ? "border-[#ef4444] focus:ring-[#ef4444]" : "border-[#d1d5db] focus:ring-[#3b82f6]"
          }`}
          placeholder="+55 (11) 99999-9999"
        />
        {errors.phone && <p className="text-[#d60000]  text-sm mt-1">{errors.phone}</p>}
      </div>

       {/* LinkedIn */}
      <div>
        <label htmlFor="linkedin" className="block font-semibold mb-1">
          LinkedIn
        </label>
        <input
          id="linkedin"
          name="linkedin"
          type="url"
          value={data.linkedin}
          onChange={handleChange}
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
            errors.linkedin ? "border-[#ef4444] focus:ring-[#ef4444]" : "border-[#d1d5db] focus:ring-[#3b82f6]"
          }`}
          placeholder="https://linkedin.com/in/seu-perfil"
        />
        {errors.linkedin && <p className="text-[#d60000]  text-sm mt-1">{errors.linkedin}</p>}
      </div>

      {/* Resumo Profissional */}
      <div>
        <label htmlFor="summary" className="block font-semibold mb-1">
          Resumo Profissional
        </label>
        <textarea
          id="summary"
          name="summary"
          value={data.summary}
          onChange={(e) => onChange("summary", e.target.value)}
          maxLength={MAX_SUMMARY_LENGTH}
          rows={5}
           disabled={isSummaryLoading}
          className={`w-full border rounded px-3 py-2 resize-none focus:outline-none focus:ring ${
            errors.summary ? "border-[#ef4444] focus:ring-[#ef4444]" : "border-[#d1d5db] focus:ring-[#3b82f6]"
          }`}
          placeholder="Descreva brevemente sua experiência e objetivos profissionais"
        />
        <div className="text-right text-sm text-[#6b7280]">
          {data.summary.length} / {MAX_SUMMARY_LENGTH} caracteres
        </div>
        {errors.summary && <p className="text-[#d60000] text-sm mt-1">{errors.summary}</p>}
      
       {/* Botão de IA - Adaptado para usar hook */}
        <button
          type="button" // Adicionado para evitar submit do form
          onClick={handleImproveSummary}
          disabled={isSummaryLoading || !data.summary.trim()}
          className="improve-btn mt-2 px-4 py-2 bg-[#3b82f6] text-white rounded-md hover:bg-[#2563eb] disabled:bg-[#9ca3af] transition-colors flex items-center gap-2" // Adicionei Tailwind para flex e gap
        >
          {isSummaryLoading ? (
            <div className="flex items-center gap-2">
              <ClipLoader size={16} color="#fff" />
              Melhorando...
            </div>
          ) : (
            "Melhorar com IA ✨"
          )}
        </button>
        {/* Skeleton durante loading - Seu código original, aprimorado com Tailwind */}
        {isSummaryLoading && (
          <div className="skeleton mt-4 space-y-2">
            <div className="animate-pulse bg-[#e5e7eb] h-4 rounded w-3/4"></div>
            <div className="animate-pulse bg-[#e5e7eb] h-4 rounded w-1/2"></div>
            <div className="animate-pulse bg-[#e5e7eb] h-4 rounded w-full"></div>
            <p className="text-[#3b82f6] text-sm italic mt-2">Gerando melhoria com IA... Aguarde.</p>
          </div>
        )}
         
      </div>
      
    </form>
  );
}
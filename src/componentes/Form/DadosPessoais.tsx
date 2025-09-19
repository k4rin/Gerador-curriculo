import React, { useState, useEffect } from "react";
interface PersonalInfoData {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  summary: string;
}

interface PersonalInfoProps {
  data: PersonalInfoData;
  onChange: (field: keyof PersonalInfoData, value: string) => void;
}

interface Errors {
  name?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  summary?: string;
}

const MAX_SUMMARY_LENGTH = 500;
export function PersonalInfo({ data, onChange }: PersonalInfoProps) {
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

  return (
    <form className="space-y-4 p-4">
      {/* Nome */}
      <div>
        <label htmlFor="name" className="block font-semibold mb-1">
          Nome <span className="text-red-600">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={data.name}
          onChange={handleChange}
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
            errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
          }`}
          placeholder="Seu nome completo"
          required
        />
        {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block font-semibold mb-1">
          Email <span className="text-red-600">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
            errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
          }`}
          placeholder="exemplo@dominio.com"
          required
        />
        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
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
            errors.phone ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
          }`}
          placeholder="+55 (11) 99999-9999"
        />
        {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
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
            errors.linkedin ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
          }`}
          placeholder="https://linkedin.com/in/seu-perfil"
        />
        {errors.linkedin && <p className="text-red-600 text-sm mt-1">{errors.linkedin}</p>}
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
          onChange={handleChange}
          maxLength={MAX_SUMMARY_LENGTH}
          rows={5}
          className={`w-full border rounded px-3 py-2 resize-none focus:outline-none focus:ring ${
            errors.summary ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
          }`}
          placeholder="Descreva brevemente sua experiência e objetivos profissionais"
        />
        <div className="text-right text-sm text-gray-500">
          {data.summary.length} / {MAX_SUMMARY_LENGTH} caracteres
        </div>
        {errors.summary && <p className="text-red-600 text-sm mt-1">{errors.summary}</p>}
      </div>
    </form>
  );
}
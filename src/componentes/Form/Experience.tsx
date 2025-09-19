import React from "react";
import { v4 as uuidv4 } from "uuid";
export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string; // yyyy-mm-dd
  endDate: string | null; // null se trabalho atual
  isCurrent: boolean;
  description: string;
}

interface ExperienceFormProps {
  experiences: Experience[];
  onChange: (experiences: Experience[]) => void;
}

export function ExperienceForm({ experiences, onChange }: ExperienceFormProps) {
  // Adiciona uma nova experiência vazia
  function addExperience() {
    const newExp: Experience = {
      id: uuidv4(),
      company: "",
      position: "",
      startDate: "",
      endDate: null,
      isCurrent: false,
      description: "",
    };
    onChange([...experiences, newExp]);
  }

   // Remove experiência pelo id
  function removeExperience(id: string) {
    onChange(experiences.filter((exp) => exp.id !== id));
  }

  // Atualiza campo específico de uma experiência
  function updateExperience(id: string, field: keyof Experience, value: any) {
    const updated = experiences.map((exp) =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    onChange(updated);
  }

   // Validação simples de datas
  function validateDates(exp: Experience): string | null {
    if (!exp.startDate) return "Data de início é obrigatória";
    if (!exp.isCurrent && !exp.endDate) return "Data de fim é obrigatória";
    if (
      exp.startDate &&
      exp.endDate &&
      new Date(exp.startDate) > new Date(exp.endDate)
    )
      return "Data de início deve ser anterior à data de fim";
    return null;
  }

   return (
    <div className="space-y-6">
      {experiences.map((exp) => {
        const dateError = validateDates(exp);
        return (
          <div
            key={exp.id}
            className="border rounded p-4 bg-white shadow-sm relative"
          >
            <button
              type="button"
              onClick={() => removeExperience(exp.id)}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800 font-bold"
              aria-label="Remover experiência"
            >
              &times;
            </button>

            <div className="mb-3">
              <label className="block font-semibold mb-1" htmlFor={`company-${exp.id}`}>
                Empresa <span className="text-red-600">*</span>
              </label>
              <input
                id={`company-${exp.id}`}
                type="text"
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Nome da empresa"
                required
              />
            </div>

            <div className="mb-3">
              <label className="block font-semibold mb-1" htmlFor={`position-${exp.id}`}>
                Cargo <span className="text-red-600">*</span>
              </label>
              <input
                id={`position-${exp.id}`}
                type="text"
                value={exp.position}
                onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Cargo ocupado"
                required
              />
            </div>

            <div className="flex gap-4 mb-3 items-end">
              <div className="flex-1">
                <label className="block font-semibold mb-1" htmlFor={`startDate-${exp.id}`}>
                  Data Início <span className="text-red-600">*</span>
                </label>
                <input
                  id={`startDate-${exp.id}`}
                  type="date"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
                  required
                />
              </div>

                            <div className="flex items-center space-x-2">
                <input
                  id={`isCurrent-${exp.id}`}
                  type="checkbox"
                  checked={exp.isCurrent}
                  onChange={(e) => {
                    updateExperience(exp.id, "isCurrent", e.target.checked);
                    if (e.target.checked) {
                      updateExperience(exp.id, "endDate", null);
                    }
                  }}
                  className="h-5 w-5"
                />
                <label htmlFor={`isCurrent-${exp.id}`} className="select-none">
                  Trabalho atual
                </label>
              </div>

               <div className="flex-1">
                <label className="block font-semibold mb-1" htmlFor={`endDate-${exp.id}`}>
                  Data Fim {exp.isCurrent ? "(Desabilitado)" : <span className="text-red-600">*</span>}
                </label>
                <input
                  id={`endDate-${exp.id}`}
                  type="date"
                  value={exp.endDate || ""}
                  onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                  disabled={exp.isCurrent}
                  className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
                    exp.isCurrent ? "bg-gray-200 cursor-not-allowed" : "focus:ring-blue-500"
                  }`}
                  required={!exp.isCurrent}
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1" htmlFor={`description-${exp.id}`}>
                Descrição
              </label>
              <textarea
                id={`description-${exp.id}`}
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                rows={4}
                className="w-full border rounded px-3 py-2 resize-none focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Descreva suas responsabilidades e conquistas"
              />
            </div>

              {dateError && (
              <p className="text-red-600 text-sm mt-2 font-semibold" role="alert">
                {dateError}
              </p>
            )}
          </div>
        );
      })}

      <button
        type="button"
        onClick={addExperience}
        className="bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700 transition"
      >
        Adicionar Experiência
      </button>
    </div>
  );
}
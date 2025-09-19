import React from "react";
import { v4 as uuidv4 } from "uuid";
export interface Education {
  id: string;
  institution: string;
  course: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  description: string;
}

interface EducationFormProps {
  educationList: Education[];
  onChange: (educationList: Education[]) => void;
}

// Adiciona uma formação
export function EducationForm({ educationList, onChange }: EducationFormProps) {
  function addEducation() {
    const newEdu: Education = {
      id: uuidv4(),
      institution: "",
      course: "",
      startDate: "",
      endDate: null,
      isCurrent: false,
      description: "",
    };
    onChange([...educationList, newEdu]);
  }

    // Remove formação pelo id
     function removeEducation(id: string) {
    onChange(educationList.filter((edu) => edu.id !== id));
  }

//   Atualiza
function updateEducation(id: string, field: keyof Education, value: any) {
    const updated = educationList.map((edu) =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    onChange(updated);
  }

  function validateDates(edu: Education): string | null {
    if (!edu.startDate) return "Data de início é obrigatória";
    if (!edu.isCurrent && !edu.endDate) return "Data de fim é obrigatória";
    if (
      edu.startDate &&
      edu.endDate &&
      new Date(edu.startDate) > new Date(edu.endDate)
    )
      return "Data de início deve ser anterior à data de fim";
    return null;
  }

  return (
    <div className="space-y-6">
      {educationList.map((edu) => {
        const dateError = validateDates(edu);
        return (
          <div
            key={edu.id}
            className="border rounded p-4 bg-white shadow-sm relative"
          >
            <button
              type="button"
              onClick={() => removeEducation(edu.id)}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800 font-bold"
              aria-label="Remover educação"
            >
              &times;
            </button>

            <div className="mb-3">
              <label
                htmlFor={`institution-${edu.id}`}
                className="block font-semibold mb-1"
              >
                Instituição <span className="text-red-600">*</span>
              </label>
              <input
                id={`institution-${edu.id}`}
                type="text"
                value={edu.institution}
                onChange={(e) =>
                  updateEducation(edu.id, "institution", e.target.value)
                }
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Nome da instituição"
                required
              />
            </div>

             <div className="mb-3">
              <label
                htmlFor={`course-${edu.id}`}
                className="block font-semibold mb-1"
              >
                Curso <span className="text-red-600">*</span>
              </label>
              <input
                id={`course-${edu.id}`}
                type="text"
                value={edu.course}
                onChange={(e) =>
                  updateEducation(edu.id, "course", e.target.value)
                }
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Nome do curso"
                required
              />
            </div>

             <div className="flex gap-4 mb-3 items-end">
              <div className="flex-1">
                <label
                  htmlFor={`startDate-${edu.id}`}
                  className="block font-semibold mb-1"
                >
                  Data Início <span className="text-red-600">*</span>
                </label>
                <input
                  id={`startDate-${edu.id}`}
                  type="date"
                  value={edu.startDate}
                  onChange={(e) =>
                    updateEducation(edu.id, "startDate", e.target.value)
                  }
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id={`isCurrent-${edu.id}`}
                  type="checkbox"
                  checked={edu.isCurrent}
                  onChange={(e) => {
                    updateEducation(edu.id, "isCurrent", e.target.checked);
                    if (e.target.checked) {
                      updateEducation(edu.id, "endDate", null);
                    }
                  }}
                  className="h-5 w-5"
                />
                <label htmlFor={`isCurrent-${edu.id}`} className="select-none">
                  Cursando atualmente
                </label>
              </div>

              <div className="flex-1">
                <label
                  htmlFor={`endDate-${edu.id}`}
                  className="block font-semibold mb-1"
                >
                  Data Fim {edu.isCurrent ? "(Desabilitado)" : <span className="text-red-600">*</span>}
                </label>
                <input
                  id={`endDate-${edu.id}`}
                  type="date"
                  value={edu.endDate || ""}
                  onChange={(e) =>
                    updateEducation(edu.id, "endDate", e.target.value)
                  }
                  disabled={edu.isCurrent}
                  className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
                    edu.isCurrent ? "bg-gray-200 cursor-not-allowed" : "focus:ring-blue-500"
                  }`}
                  required={!edu.isCurrent}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor={`description-${edu.id}`}
                className="block font-semibold mb-1"
              >
                Descrição
              </label>
              <textarea
                id={`description-${edu.id}`}
                value={edu.description}
                onChange={(e) =>
                  updateEducation(edu.id, "description", e.target.value)
                }
                rows={4}
                className="w-full border rounded px-3 py-2 resize-none focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Descreva detalhes relevantes do curso"
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
        onClick={addEducation}
        className="bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700 transition"
      >
        Adicionar Formação
      </button>
    </div>
  );
}



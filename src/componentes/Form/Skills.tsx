import React from "react";
export interface Skill {
  id: string;
  name: string;
  level: "Básico" | "Intermediário" | "Avançado";
}
interface SkillsFormProps {
  skills: Skill[];
  onChange: (skills: Skill[]) => void;
}

export function SkillsForm({ skills, onChange }: SkillsFormProps) {
  // Adiciona uma nova habilidade vazia
  function addSkill() {
    const newSkill: Skill = {
      id: crypto.randomUUID(),
      name: "",
      level: "Básico",
    };
    onChange([...skills, newSkill]);
  }

  // Remove habilidade pelo id
  function removeSkill(id: string) {
    onChange(skills.filter((skill) => skill.id !== id));
  }
  // Atualiza campo específico de uma habilidade
  function updateSkill(id: string, field: keyof Skill, value: any) {
    const updated = skills.map((skill) =>
      skill.id === id ? { ...skill, [field]: value } : skill
    );
    onChange(updated);
  }

  return (
    <div className="space-y-4">
      {skills.map((skill) => (
        <div
          key={skill.id}
          className="flex items-center gap-3 border rounded p-3 bg-white shadow-sm"
        >
          <input
            type="text"
            placeholder="Habilidade"
            value={skill.name}
            onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
   <select
            value={skill.level}
            onChange={(e) =>
              updateSkill(skill.id, "level", e.target.value as Skill["level"])
            }
            className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
          >
            <option value="Básico">Básico</option>
            <option value="Intermediário">Intermediário</option>
            <option value="Avançado">Avançado</option>
          </select>
          <button
            type="button"
            onClick={() => removeSkill(skill.id)}
            className="text-red-600 hover:text-red-800 font-bold text-xl"
            aria-label="Remover habilidade"
          >
            &times;
          </button>
        </div>
      ))}
    
       <button
        type="button"
        onClick={addSkill}
        className="bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700 transition"
      >
        Adicionar Habilidade
      </button>
    </div>
  );
}
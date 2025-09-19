import React from "react";
import { type Experience } from "../Form/Experience";
import {type  Skill } from "../Form/Skills";
import {type Education} from "../Form/Education"

interface PersonalInfoData {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  summary: string;
}
interface PreviewProps {
  personalData: PersonalInfoData;
  education: Education[];
  experiences: Experience[];
  skills: Skill[];
}

export function Preview({ personalData, education, experiences, skills }: PreviewProps) {
  return (
    <div  id="preview-to-pdf"
    className="p-6 overflow-auto h-full bg-white"
    style={{ width: "210mm", minHeight: "297mm" }}>
      {/* Dados Pessoais */}
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{personalData.name || "Seu Nome"}</h1>
        <p className="text-gray-700 mb-1">{personalData.summary || "Resumo profissional..."}</p>
        <div className="text-sm text-gray-600 space-y-1">
          {personalData.email && <p>Email: {personalData.email}</p>}
          {personalData.phone && <p>Telefone: {personalData.phone}</p>}
          {personalData.linkedin && (
            <p>
              LinkedIn:{" "}
              <a
                href={personalData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {personalData.linkedin}
              </a>
            </p>
          )}
        </div>
      </section>

       {/* Educação */}
        <section>
          <h2 className="text-2xl font-semibold border-b border-gray-300 pb-1 mb-4"> Formação

          </h2>
          {education.length === 0 ? (
          <h2 className="text-gray-500 italic"> Nenhuma formação adicionada </h2>
              ) : 
              (
                education.map((edu) => (
                <div key={edu.id} className="mb-4 ">
                <p className="text-xl font-semibold"> {edu.institution || "Instituição"}</p>
                <p className="text-gray-700 font-medium" > {edu.course || "Curso"}</p>
                <p  className="text-gray-600 italic text-sm mb-2">
                {edu.startDate} - {edu.isCurrent ? "Atual" : edu.endDate || "-"}
              </p>
              <p className="whitespace-pre-line">{edu.description || "Descrição..."}</p>
            </div>
          ))
          )}
        </section>

       {/* Experiências */}
      <section >
        <h2 className="text-2xl font-semibold border-b border-gray-300 pb-1 mb-4">
          Experiências Profissionais
        </h2>
        {experiences.length === 0 ? (
          <p className="text-gray-500 italic">Nenhuma experiência adicionada.</p>
        ) : (
          experiences.map((exp) => (
            <div key={exp.id} className="mb-6">
              <h3 className="text-xl font-semibold">{exp.position || "Cargo"}</h3>
              <p className="text-gray-700 font-medium">{exp.company || "Empresa"}</p>
              <p className="text-gray-600 italic text-sm mb-2">
                {exp.startDate} - {exp.isCurrent ? "Atual" : exp.endDate || "-"}
              </p>
              <p className="whitespace-pre-line">{exp.description || "Descrição da experiência..."}</p>
            </div>
          ))
        )}
      </section>

      {/* Habilidades */}
      <section>
        <h2 className="text-2xl font-semibold border-b border-gray-300 pb-1 mb-4">
          Habilidades
        </h2>
        {skills.length === 0 ? (
          <p className="text-gray-500 italic">Nenhuma habilidade adicionada.</p>
        ) : (
          <ul className="list-disc list-inside space-y-1">
            {skills.map((skill) => (
              <li key={skill.id}>
                <span className="font-medium">{skill.name || "Habilidade"}</span> - {skill.level}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
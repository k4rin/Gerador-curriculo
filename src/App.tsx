import React, { useState } from "react";
import { Layout } from "./componentes/Layout/Layout";
import { PersonalInfo } from "./componentes/Form/DadosPessoais";
import { ExperienceForm, type Experience } from "./componentes/Form/Experience";
import {  SkillsForm, type Skill } from "./componentes/Form/Skills";
import { Preview } from "./componentes/Preview/Preview";
import {EducationForm, type Education} from "./componentes/Form/Education"
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

type Tab = "personal" | "experience" | "skills" | "education";

export function App() {
  // Estados dos formulários
  const [personalData, setPersonalData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    summary: "",
  });


  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
   const [educationList, setEducationList] = useState<Education[]>([]);
  
  // Aba ativa
  const [activeTab, setActiveTab] = useState<Tab>("personal");
  // Handler genérico para dados pessoais
  function handlePersonalChange(field: keyof typeof personalData, value: string) {
    setPersonalData((prev) => ({ ...prev, [field]: value }));
  }


  // Renderiza o formulário conforme aba ativa
  function renderForm() {
    switch (activeTab) {
      case "personal":
        return (
          <PersonalInfo data={personalData} onChange={handlePersonalChange} />
        );
        case "education":
        return (
          <EducationForm educationList={educationList} onChange={setEducationList} />
        );
      case "experience":
        return (
          <ExperienceForm experiences={experiences} onChange={setExperiences} />
        );
      case "skills":
        return <SkillsForm skills={skills} onChange={setSkills} />;
      default:
        return null;
    }
  }
  const [loading, setLoading] = useState(false);

  async function exportToPDF() {
    setLoading(true);
  const input = document.getElementById("preview-to-pdf");
  if (!input) return;
  // Captura o elemento como canvas
  const canvas = await html2canvas(input, { scale: 2 });
 
   // Converte o canvas para imagem PNG
  const imgData = canvas.toDataURL("image/png");
  // Cria PDF no formato A4 (210mm x 297mm)
  const pdf = new jsPDF("p", "mm", "a4");
  // Calcula largura e altura da imagem no PDF mantendo proporção
  const pdfWidth = 210;
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save("curriculo.pdf");
  setLoading(false);
}


  
 return (
    <Layout
      left={
        <div className="flex flex-col h-full">
          {/* Navegação das abas */}
          <nav className="flex border-b border-gray-300">
            <button
              onClick={() => setActiveTab("personal")}
              className={`flex-1 py-3 font-semibold ${
                activeTab === "personal"
                  ? "border-b-4 border-white-600  text-purple-600"
                  :  "text-purple-600 hover:text-purple-500"
              }`}
            >
              Dados Pessoais
            </button>
            <button
              onClick={() => setActiveTab("education")}
              className={`flex-1 py-3 font-semibold ${
                activeTab === "education"
                  ? "border-b-4 border-white-600 text-purple-600"
                  : "text-purple-600 hover:text-purple-500"
              }`}
            >

               Formação
            </button>
            <button
              onClick={() => setActiveTab("experience")}
              className={`flex-1 py-3 font-semibold ${
                activeTab === "experience"
                  ? "border-b-4 border-white-500 text-purple-600"
                  : "text-purple-600 hover:text-purple-500"
              }`}
            >   
               
              Experiências
            </button>
            <button
              onClick={() => setActiveTab("skills")}
              className={`flex-1 py-3 font-semibold ${
                activeTab === "skills"
                  ? "border-b-4 border-white-500 text-purple-600"
                  : "text-purple-600 hover:text-purple-500"
              }`}
            >
            Habilidades
            </button>
          </nav>
          {/* Conteúdo do formulário */}
          <div className="flex-1 overflow-auto p-4 bg-gray-50">{renderForm()}</div>
           {/* Botão exportar PDF */}
          <div className="p-4 border-t border-gray-300">
            <button
              onClick={exportToPDF} disabled={loading} 
              
              className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-700 transition"
            >
               {loading ? "Gerando PDF..." : "Exportar Currículo em PDF"}

            </button>
          </div>
        </div>
      }
      right={<Preview
      personalData={personalData}
      education={educationList}
      experiences={experiences}
      skills={skills}
    />}
    
      
    />
  );
}
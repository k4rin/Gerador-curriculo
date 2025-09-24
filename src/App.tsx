import React, { useState } from "react";
import { Layout } from "./componentes/Layout/Layout";
import { PersonalInfo } from "./componentes/Form/DadosPessoais";
import { ExperienceForm, type Experience } from "./componentes/Form/Experience";
import {  SkillsForm, type Skill } from "./componentes/Form/Skills";
import { Preview } from "./componentes/Preview/Preview";
import {EducationForm, type Education} from "./componentes/Form/Education"
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import {AxiosError} from "axios";

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
  
// Estados para loading da IA (por aba)
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [experienceLoading, setExperienceLoading] = useState<{ [key: number]: boolean }>({});

  // Aba ativa
  const [activeTab, setActiveTab] = useState<Tab>("personal");
  
    // Loading para PDF
  const [loading, setLoading] = useState(false);

  // Handler genérico para dados pessoais
  function handlePersonalChange(field: keyof typeof personalData, value: string) {
    setPersonalData((prev) => ({ ...prev, [field]: value }));
  }

   // Função para melhorar resumo com IA
  const improveSummary = async (currentText: string) => {
    if (!currentText.trim()) {
      toast.error("Digite um texto para melhorar!");
      return;
    }
    setSummaryLoading(true);
    try {
      const response = await axios.post("/api/improve-text", {
        text: currentText,
        fieldType: "summary",
      });

      const improvedText = response.data.improvedText;
      setPersonalData((prev) => ({ ...prev, summary: improvedText }));
      toast.success("Resumo melhorado com sucesso! ✨");
    } catch (error) {
          let errorMessage = "Erro na integração com IA. Tente novamente.";
    
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.error || error.response?.statusText || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = String(error);
    }
    toast.error(errorMessage);
    console.error("Erro na IA (Experience):", error);
  } finally {
      setSummaryLoading(false);
    }
  };

  // Função para melhorar descrição de experiência com IA (por index)
  const improveExperienceDescription = async (index: string, currentText: string) => {
    if (!currentText.trim()) {
      toast.error("Digite uma descrição para melhorar!");
      return;
    }
    setExperienceLoading((prev) => ({ ...prev, [index]: true }));
    try {
      const response = await axios.post("/api/improve-text", {
        text: currentText,
        fieldType: "experience",
      });

       const improvedText = response.data.improvedText;
      setExperiences((prev) =>
        prev.map((exp) =>
          exp.id === index ? { ...exp, description: improvedText } : exp
        )
      );
      toast.success("Descrição melhorada com sucesso! ✨");
    } catch (error) {
    let errorMessage = "Erro na integração com IA. Tente novamente.";
    
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.error || error.response?.statusText || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = String(error);
    }
    toast.error(errorMessage);
    console.error("Erro na IA (Experience):", error);
  } finally {
    setExperienceLoading((prev) => ({ ...prev, [index]: false }));
  }
};
  // Renderiza o formulário conforme aba ativa
  function renderForm() {
    switch (activeTab) {
      case "personal":
        return (
          <PersonalInfo data={personalData} onChange={handlePersonalChange} onImproveSummary={improveSummary} isSummaryLoading={summaryLoading}/>
        );
        case "education":
        return (
          <EducationForm educationList={educationList} onChange={setEducationList} />
        );
      case "experience":
        return (
          <ExperienceForm experiences={experiences} onChange={setExperiences} onImproveDescription={improveExperienceDescription} loadingStates={experienceLoading} />
        );
      case "skills":
        return <SkillsForm skills={skills} onChange={setSkills} />;
      default:
        return null;
    }
  }


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
          <nav className="flex border-b border-[#d1d5db]">
            <button
              onClick={() => setActiveTab("personal")}
              className={`flex-1 py-3 font-semibold ${
                activeTab === "personal"
                  ? "border-b-4 border-[#f0f0f0] text-[#9810fa]"
                  :  "text-[#9810fa] hover:text-[#a94dfc]"
              }`}
            >
              Dados Pessoais
            </button>
            <button
              onClick={() => setActiveTab("education")}
              className={`flex-1 py-3 font-semibold ${
                activeTab === "education"
                  ? "border-b-4 border-[#f0f0f0] text-[#9810fa]"
                  : "text-[#9810fa] hover:text-[#a94dfc]"
              }`}
            >

               Formação
            </button>
            <button
              onClick={() => setActiveTab("experience")}
              className={`flex-1 py-3 font-semibold ${
                activeTab === "experience"
                  ? "border-b-4 border-[#f0f0f0] text-[#9810fa]"
                  : "text-[#9810fa] hover:text-[#a94dfc]"
              }`}
            >   
               
              Experiências
            </button>
            <button
              onClick={() => setActiveTab("skills")}
              className={`flex-1 py-3 font-semibold ${
                activeTab === "skills"
                  ? "border-b-4 border-[#f0f0f0] text-[#9810fa]"
                  : "text-[#9810fa] hover:text-[#a94dfc]"
              }`}
            >
            Habilidades
            </button>
          </nav>
          {/* Conteúdo do formulário */}
          <div className="flex-1 overflow-auto p-4 bg-[#f9fafb]">{renderForm()}</div>
           {/* Botão exportar PDF */}
          <div className="p-4 border-t border-[#d1d5db]">
            <button
              onClick={exportToPDF} disabled={loading} 
              
              className="w-full bg-[#a94dfc] text-white py-2 rounded hover:bg-[#6b00b8] transition"
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
import { useState } from 'react';
     // Interface para a resposta da API (do backend Node.js)
     interface ApiResponse {
       improvedText: string;
     }
     // Tipos para o tipo de texto (expanda para mais seções)
     type TextType = 'summary' | 'experience' | 'education' | 'skills';
     // Hook que retorna lógica para melhorar texto com IA
     export const useImproveText = () => {
       const [loading, setLoading] = useState<boolean>(false);
       const [error, setError] = useState<string | null>(null);
       const improveText = async (
         text: string,
         type: TextType,
         onSuccess: (improvedText: string) => void // Callback para atualizar preview/input no componente
       ): Promise<void> => {
         if (!text.trim()) {
           setError('Por favor, insira um texto para melhorar.');
           return;
            }
         setLoading(true);
         setError(null);
         try {
           const response = await fetch('/api/improve-text', {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json',
             },
             body: JSON.stringify({ text, type }),
           });
           if (!response.ok) {
             throw new Error(`Erro HTTP: ${response.status} - Verifique se o backend está rodando.`);
           }

           const data: ApiResponse = await response.json();
           if (data.improvedText) {
             onSuccess(data.improvedText); // Chama callback para atualizar o componente
           } else {
             throw new Error('Resposta inválida da API - Texto não melhorado.');
           }
         } catch (error) {
           const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao conectar com a IA.';
           console.error('Erro ao melhorar texto:', error);
           setError(errorMessage);
         } finally {
           setLoading(false);
         }
       };
       return { improveText, loading, error };
     };

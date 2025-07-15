import { Analytics } from '@vercel/analytics/react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ResultDiabetics from "./ResultDiabetics";
import { useNavigate, Routes, Route } from 'react-router-dom';
import * as yup from "yup";
import "./App.css";
import { useState, createContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const MyContext = createContext()
// Data for risk factors and symptoms
// This data structure is used to render the form dynamically
// It contains questions about family history, physical activity, and hypertension
// It also includes a list of symptoms that can be checked by the user
// The data is structured in two arrays: data1 for questions and data2 for symptoms
const dataRisque = {
  data1: [
    {
      title: "Hypertension ?",
      oui: "Oui",
      non: "Non",
      nom: "hypertension",
    },
    {
      title: "Maladie Cardiaque ?",
      oui: "Oui",
      non: "Non",
      nom: "cardiaque",
    }
  ],
  FumerSymptome: [
    'No Info',
    "Never",
    "Former",
    "current",
    "not current ",
    "Ever"
  ],
};

const radioFields = dataRisque.data1.reduce((acc, item) => {
  acc[item.nom] = yup.string().required("le choix est requis");
  return acc;
}, {});

export default function App() {
  const [isResult, setResult]= useState(false)
  const [resultData, setResultData]=useState(null)

  // Validation schema using Yup
  // This schema defines the validation rules for the form fields
  // It checks for required fields, type errors, and minimum values
  // Each field has a specific error message that will be displayed if validation fails
  // The schema includes fields for age, genre, weight, height, blood pressure, and a choice field
  return (
    <>
      {isResult ? (
        <Routes>
          <Route path="/" element={<Formulaire/>} />
          <Route path="/resultDiabet" element = {
            <MyContext value={resultData}>
              <ResultDiabetics/>
            </MyContext>
            }
          />
        </Routes>
      ) : (
        <Formulaire setResult={setResult} setResultData={setResultData} />
      )}
    </>
  );
}
const Formulaire = ({setResult, setResultData}) => {

  const navigate = useNavigate();
  const schema = yup.object().shape({
    age: yup
      .number()
      .typeError("L'âge est requis")
      .required("L'âge est requis")
      .min(0, "L'âge doit être un nombre positif"),
    genre: yup
      .string()
      .required("Le genre est requis")
      .oneOf(["Homme", "Femme"], "Le genre doit être 'Homme' ou 'Femme'"),
    MasseCorporelle: yup
      .number()
      .typeError("Le poids est requis")
      .required("Le poids est requis")
      .min(10, "La masse corporelle doit être entre 10 et 60")
      .max(60, "La masse corporelle doit être entre 10 et 60"),
    hemoglobine: yup
      .number()
      .typeError("La taille est requise")
      .required("La taille est requise")
      .min(3, "L'hemoglobine doit être entre 3 et 15")
      .max(15, "L'hemoglobine doit être entre 3 et 15"),
    glucose: yup
      .number()
      .typeError("La pression artérielle est requise")
      .required("La pression artérielle est requise")
      .min(50, "Le niveau de glucose doit être entre 50 et 500")
      .max(500, "Le niveau de glucose doit être entre 50 et 500"),
    //symptomes: yup.array().of(yup.string()).optional(),
    ...radioFields,
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const FormDataFunction = (Formdata) => {
    console.log("Form Data Submitted:", Formdata);
    setResult(true)
    setResultData(Formdata)
    navigate("/resultDiabet")
  };

  return(
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header */}
        <nav className="bg-white shadow-lg border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">DiabCheck</h1>
                  <p className="text-sm text-gray-600">Dépistage Intelligent du Diabète</p>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <span className="text-gray-500">Version 1.0</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 py-8">
          {/* Form Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Formulaire de Dépistage
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Remplissez ce formulaire pour évaluer votre risque de diabète. 
              Vos informations restent confidentielles et sécurisées.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit(FormDataFunction)} className="space-y-8">
              
              {/* Personal Information Section */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  Informations Personnelles
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                      Âge <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="age"
                      {...register("age")}
                      placeholder="Entrez votre âge"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    />
                    {errors.age && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        {errors.age.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-2">
                      Genre <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="genre"
                      {...register("genre")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    >
                      <option value="">Sélectionnez votre genre</option>
                      <option value="Homme">Homme</option>
                      <option value="Femme">Femme</option>
                    </select>
                    {errors.genre && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        {errors.genre.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="MasseCorporelle" className="block text-sm font-medium text-gray-700 mb-2">
                    Indice de Masse Corporelle (kg/m²) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="MasseCorporelle"
                      {...register("MasseCorporelle")}
                      placeholder="ex : 22.5"
                      step="0.1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    />
                    {errors.MasseCorporelle && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        {errors.MasseCorporelle.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="hemoglobine
                      " className="block text-sm font-medium text-gray-700 mb-2">
                      Hémoglobine gliquée (%) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="hemoglobine"
                      {...register("hemoglobine")}
                      placeholder="ex : 6.5" 
                      min="3"
                      max="15"
                      step="0.1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    />
                    {errors.hemoglobine && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        {errors.hemoglobine.message}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="glucose" className="block text-sm font-medium text-gray-700 mb-2">
                    Niveau du glocose (mg/dL) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="glucose"
                      {...register("glucose")}
                      placeholder="ex : 110" 
                      min="50"
                      max="500"
                      step="0.1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    />
                    {errors.glucose && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        {errors.glucose.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Risk Factors Section */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                  </svg>
                  Facteurs de Risque
                </h3>
                
                <div className="space-y-6">
                  {dataRisque.data1.map(({ title, oui, non, nom }) => (
                    <div key={title} className="bg-gray-50 rounded-lg p-6">
                      <p className="text-gray-800 font-medium mb-4">{title}</p>
                      <div className="flex gap-6">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            value={oui}
                            {...register(nom)}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="ml-3 text-gray-700">{oui}</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            value={non}
                            {...register(nom)}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="ml-3 text-gray-700">{non}</span>
                        </label>
                      </div>
                      {errors[nom] && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          {errors[nom].message}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Symptoms Section */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Fumer Symptome
                </h3>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700 mb-4">
                    Avez-vous ressenti l'un de ces symptômes récemment ? 
                    <span className="text-sm text-gray-500"> (Cochez tous ceux qui s'appliquent)</span>
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {dataRisque.FumerSymptome.map((item, index) => (
                      <label key={index} className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 cursor-pointer transition-colors duration-200">
                        <input
                          type="checkbox"
                          value={item}
                          {...register("symptomes")}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="ml-3 text-gray-700">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  disabled={!isValid}
                  className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Analyser mes Données</span>
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
      <Analytics/>
    </>
  )
} 
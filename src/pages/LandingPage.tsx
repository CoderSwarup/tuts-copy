import React from "react";
import { GraduationCap, BookOpen, Brain, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LandingPage(): React.ReactNode {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-blue-500/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-t from-purple-500/20 to-transparent rounded-full blur-3xl" />

      <div className="max-w-6xl w-full relative">
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-700/50">
          {/* Hero Section */}
          <div className="text-center space-y-6 max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Master Mathematics with
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {" "}
                Tuts
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              Interactive 3D visualizations and step-by-step guidance to make
              learning mathematics intuitive and engaging.
            </p>
            <button
              onClick={() => {
                navigate("/introduction");
              }}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-500 transition-all duration-200 hover:scale-105 active:scale-100 inline-flex items-center gap-2 group"
            >
              Get Started Learning
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 rounded-2xl p-6 backdrop-blur-lg border border-gray-700/50">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Interactive Learning
              </h3>
              <p className="text-gray-300">
                Engage with 3D models and real-time visualizations to understand
                complex mathematical concepts.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-2xl p-6 backdrop-blur-lg border border-gray-700/50">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Step-by-Step Guide
              </h3>
              <p className="text-gray-300">
                Follow clear, guided instructions with audio narration and
                visual demonstrations.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-2xl p-6 backdrop-blur-lg border border-gray-700/50">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Practice Problems
              </h3>
              <p className="text-gray-300">
                Reinforce your understanding with interactive exercises and
                immediate feedback.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { 
  FaReact, FaAngular, FaJava, FaPython, FaNodeJs, 
  FaDatabase, FaFigma, FaHtml5, FaCss3Alt, FaGitAlt, 
  FaGithub, FaJs, FaCode 
} from 'react-icons/fa';
import { 
  SiDotnet, SiMongodb, SiTailwindcss, SiRedux, 
  SiVite, SiTypescript, SiPostman,
  SiDjango, SiFlask, SiSelenium 
} from 'react-icons/si';

const CourseTechnologies = ({ courseName, technologies }) => {
  const getTechIcon = (name) => {
    const lowercaseName = name.toLowerCase();
    switch (lowercaseName) {
      case 'react': return <FaReact className="w-8 h-8 text-sky-400" />;
      case 'angular': return <FaAngular className="w-8 h-8 text-rose-500" />;
      case 'java': return <FaJava className="w-8 h-8 text-orange-500" />;
      case 'python': return <FaPython className="w-8 h-8 text-blue-500" />;
      case 'node.js':
      case 'node': return <FaNodeJs className="w-8 h-8 text-emerald-600" />;
      case 'asp.net core':
      case 'dotnet': return <SiDotnet className="w-8 h-8 text-purple-650" />;
      case 'sql server':
      case 'sql': return <FaDatabase className="w-8 h-8 text-indigo-500" />;
      case 'mongodb': return <SiMongodb className="w-8 h-8 text-emerald-500" />;
      case 'ui/ux':
      case 'figma': return <FaFigma className="w-8 h-8 text-pink-500" />;
      case 'javascript': return <FaJs className="w-8 h-8 text-yellow-500" />;
      case 'typescript': return <SiTypescript className="w-8 h-8 text-blue-600" />;
      case 'tailwind css':
      case 'tailwind': return <SiTailwindcss className="w-8 h-8 text-sky-400" />;
      case 'redux toolkit':
      case 'redux': return <SiRedux className="w-8 h-8 text-purple-500" />;
      case 'vite': return <SiVite className="w-8 h-8 text-amber-500" />;
      case 'git': return <FaGitAlt className="w-8 h-8 text-orange-600" />;
      case 'github': return <FaGithub className="w-8 h-8 text-slate-800" />;
      case 'postman': return <SiPostman className="w-8 h-8 text-orange-500" />;
      case 'sqlite': return <FaDatabase className="w-8 h-8 text-blue-400" />;
      case 'django': return <SiDjango className="w-8 h-8 text-emerald-700" />;
      case 'flask': return <SiFlask className="w-8 h-8 text-slate-700" />;
      case 'selenium': return <SiSelenium className="w-8 h-8 text-emerald-500" />;
      case 'html': return <FaHtml5 className="w-8 h-8 text-orange-600" />;
      case 'css': return <FaCss3Alt className="w-8 h-8 text-blue-500" />;
      default: return <FaCode className="w-8 h-8 text-purple-650" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-3">
        <h2 className="text-xl font-bold text-slate-900">Technologies & Tools</h2>
        <p className="text-xs text-slate-500 mt-0.5">Master the exact stacks and industry standard toolkits.</p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {technologies?.map((tech, idx) => (
          <div 
            key={idx}
            className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col items-center justify-center text-center gap-2 hover:shadow-md hover:border-purple-200 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              {getTechIcon(tech)}
            </div>
            <span className="text-[11px] font-bold text-slate-700 select-none truncate w-full">
              {tech}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseTechnologies;

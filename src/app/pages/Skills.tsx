import {
  Figma,
  Palette,
  Users,
  Code,
  Layers,
  PenTool,
  Image,
  Box,
  Camera,
  Code2,
  Package,
  Cloud,
  Pencil,
  Lightbulb,
  Shapes,
  Settings,
  Hammer,
  Network,
  Eye,
  Award,
  Target,
  Layout,
  Search,
  MousePointer,
} from 'lucide-react';

const tools = [
  { name: 'Adobe Illustrator', icon: PenTool },
  { name: 'Adobe Photoshop', icon: Image },
  { name: 'SolidWorks', icon: Box },
  { name: 'Keyshot', icon: Camera },
  { name: 'Figma', icon: Figma },
  { name: 'HTML', icon: Code },
  { name: 'CSS', icon: Palette },
  { name: 'VS Code', icon: Code2 },
  { name: 'Docker', icon: Package },
  { name: 'AWS', icon: Cloud },
];

const skills = [
  { name: 'Sketching/Ideation', icon: Pencil },
  { name: 'Design Thinking', icon: Lightbulb },
  { name: 'Form Development', icon: Shapes },
  { name: 'Design for Manufacturing (DFM)', icon: Settings },
  { name: 'CMF (Color, Material, Finish)', icon: Palette },
  { name: 'Prototyping', icon: Hammer },
  { name: 'Systems Thinking', icon: Network },
  { name: 'Human-Centered Design', icon: Users },
  { name: 'Visual Communication', icon: Eye },
  { name: 'Brand Identity', icon: Award },
  { name: 'Design Strategy', icon: Target },
  { name: 'Wireframing', icon: Layout },
  { name: 'User Research', icon: Search },
  { name: 'Interaction Design', icon: MousePointer },
  { name: 'Information Architecture', icon: Layers },
];

export function Skills() {
  return (
    <div className="min-h-screen pt-24 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="text-sm tracking-widest text-gray-500 dark:text-gray-400 uppercase mb-2">Capabilities</p>
          <h1 className="text-5xl mb-6 dark:text-white">Skills & Expertise</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            A comprehensive toolkit combining design thinking, technical knowledge, and user-centered methodologies.
          </p>
        </div>

        {/* Tools Section */}
        <div className="mb-16">
          <h2 className="text-3xl mb-8 dark:text-white">Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {tools.map((tool, idx) => {
              const Icon = tool.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                >
                  <Icon size={32} className="text-gray-700 dark:text-gray-300 mb-3 group-hover:scale-110 transition-transform" />
                  <span className="text-sm text-center dark:text-gray-200">{tool.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-16">
          <h2 className="text-3xl mb-8 dark:text-white">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, idx) => {
              const Icon = skill.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                >
                  <div className="flex-shrink-0">
                    <Icon size={24} className="text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-sm dark:text-gray-200">{skill.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
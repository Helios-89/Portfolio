import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Weather Widget',
    category: 'Mobile Design',
    description: 'A modern banking experience focused on simplicity and user trust.',
    image: 'https://images.unsplash.com/photo-1630734242356-a6f858790740?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwcm9kdWN0JTIwcHJvdG90eXBlJTIwc2tldGNofGVufDF8fHx8MTc3MjQyMjEwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 2,
    title: 'Translator App',
    category: 'UI/UX Design',
    description: 'Intuitive interface for managing connected home devices.',
    image: 'https://images.unsplash.com/photo-1677506048148-0c914dd8197b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMGRlc2lnbiUyMHRoaW5raW5nJTIwcHJvY2Vzc3xlbnwxfHx8fDE3NzI0MjIxMDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 3,
    title: 'Onboarding Flow',
    category: 'Product Design',
    description: 'Streamlined shopping experience with focus on conversion.',
    image: 'https://images.unsplash.com/photo-1725267196915-7700df784ba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwaW50ZXJmYWNlJTIwZGVzaWduJTIwbW9ja3VwfGVufDF8fHx8MTc3MjQyMjEwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 4,
    title: 'Product Configurator',
    category: 'Mobile Design',
    description: 'Personalized fitness tracking with motivational design system.',
    image: 'https://images.unsplash.com/photo-1752134593973-ac72a80ba7c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbGVlayUyMHByb2R1Y3QlMjBkZXNpZ24lMjBzdHVkaW98ZW58MXx8fHwxNzcyNDIyMTAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 5,
    title: 'Neighborhood Tool',
    category: 'Web Design',
    description: 'Enterprise-grade tool with emphasis on data visualization.',
    image: 'https://images.unsplash.com/photo-1642286941365-89da3e29c0a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1c2VyJTIwZXhwZXJpZW5jZSUyMHdpcmVmcmFtZXxlbnwxfHx8fDE3NzI0MjIxMDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 6,
    title: 'Industrial Design Work',
    category: 'UI/UX Design',
    description: 'Seamless journey planning with real-time updates.',
    image: 'https://images.unsplash.com/photo-1755985022555-09c0ec136e95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwcHJvZHVjdCUyMGRlc2lnbiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NzI0MjIxMDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

export function Projects() {
  return (
    <div className="min-h-screen pt-24 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="text-sm tracking-widest text-gray-500 dark:text-gray-400 uppercase mb-2">Selected Work</p>
          <h1 className="text-5xl dark:text-white">Projects</h1>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative h-80 overflow-hidden bg-gray-100 dark:bg-gray-800 mb-4">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white dark:bg-gray-800 p-2 rounded-full">
                    <ArrowUpRight size={20} className="dark:text-white" />
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="space-y-2">
                <p className="text-xs tracking-widest text-gray-500 dark:text-gray-400 uppercase">
                  {project.category}
                </p>
                <h3 className="text-xl dark:text-white">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
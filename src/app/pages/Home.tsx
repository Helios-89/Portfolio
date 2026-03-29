import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';

const featuredProjects = [
  {
    id: 1,
    title: 'Weather Widget',
    category: 'Mobile Design',
    image: 'https://images.unsplash.com/photo-1630734242356-a6f858790740?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwcm9kdWN0JTIwcHJvdG90eXBlJTIwc2tldGNofGVufDF8fHx8MTc3MjQyMjEwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 2,
    title: 'Translator App',
    category: 'UI/UX Design',
    image: 'https://images.unsplash.com/photo-1677506048148-0c914dd8197b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMGRlc2lnbiUyMHRoaW5raW5nJTIwcHJvY2Vzc3xlbnwxfHx8fDE3NzI0MjIxMDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 3,
    title: 'Onboarding Flow',
    category: 'Product Design',
    image: 'https://images.unsplash.com/photo-1725267196915-7700df784ba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwaW50ZXJmYWNlJTIwZGVzaWduJTIwbW9ja3VwfGVufDF8fHx8MTc3MjQyMjEwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 4,
    title: 'Product Configurator',
    category: 'Web Design',
    image: 'https://images.unsplash.com/photo-1642286941365-89da3e29c0a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1c2VyJTIwZXhwZXJpZW5jZSUyMHdpcmVmcmFtZXxlbnwxfHx8fDE3NzI0MjIxMDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 5,
    title: 'Neighborhood Tool',
    category: 'Product Design',
    image: 'https://images.unsplash.com/photo-1642286941365-89da3e29c0a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1c2VyJTIwZXhwZXJpZW5jZSUyMHdpcmVmcmFtZXxlbnwxfHx8fDE3NzI0MjIxMDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 6,
    title: 'Industrial Design Work',
    category: 'Product Design',
    image: 'https://images.unsplash.com/photo-1725267196915-7700df784ba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwaW50ZXJmYWNlJTIwZGVzaWduJTIwbW9ja3VwfGVufDF8fHx8MTc3MjQyMjEwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

export function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center px-8">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm tracking-widest text-gray-500 dark:text-gray-400 uppercase">Product Designer</p>
              <h1 className="text-6xl dark:text-white">Noemi Nagy</h1>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              A product designer with an industrial design foundation, bringing a rare depth of systems thinking and human-centered craft to products from concept to experience. I design experiences built around clarity and function, from first interaction to final detail.
            </p>
            <div className="flex gap-4 pt-4">
              <a
                href="/projects"
                className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                View Projects
              </a>
              <a
                href="/contact"
                className="px-8 py-3 border border-black dark:border-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors dark:text-white"
              >
                Get in Touch
              </a>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative h-[500px] overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1755985022555-09c0ec136e95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwcHJvZHVjdCUyMGRlc2lnbiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NzI0MjIxMDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Minimalist workspace"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Featured Projects Section */}
      <div className="px-8 py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-12">
            <p className="text-sm tracking-widest text-gray-500 dark:text-gray-400 uppercase mb-2">Featured Work</p>
            <div className="flex items-end justify-between">
              <h2 className="text-4xl dark:text-white">Selected Projects</h2>
              <Link
                to="/projects"
                className="text-sm hover:underline flex items-center gap-1 group dark:text-gray-300"
              >
                <span>View All</span>
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <Link
                key={project.id}
                to="/projects"
                className="group cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative h-80 overflow-hidden bg-white dark:bg-gray-700 mb-4">
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
                <div className="space-y-1">
                  <p className="text-xs tracking-widest text-gray-500 dark:text-gray-400 uppercase">
                    {project.category}
                  </p>
                  <h3 className="text-xl dark:text-white">{project.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
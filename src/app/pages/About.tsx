import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Award, Briefcase, GraduationCap } from 'lucide-react';

const timeline = [
  {
    year: '2020 - Now',
    title: 'Head of Design - Tech',
    company: 'American Exchange Group',
    description: 'Leading design initiatives for enterprise SaaS products, managing a team of 4 designers.',
    icon: Briefcase,
  },
  {
    year: '2018 - 2020',
    title: 'Industrial Design Consultant',
    company: 'Self Employed',
    description: 'Designed end-to-end experiences for mobile and web applications across various industries.',
    icon: Briefcase,
  },
  {
    year: '2016 - 2018',
    title: 'Watch Designer',
    company: 'MZ Berger',
    description: 'Created user interfaces and design systems for early-stage startups.',
    icon: Briefcase,
  },
  {
    year: '2015',
    title: 'Product Design Intern',
    company: 'P9 Design',
    description: 'Created user interfaces and design systems for early-stage startups.',
    icon: Briefcase,
  },
  {
    year: '2013 - 2014',
    title: 'Watch Design Intern',
    company: 'Movado Group Inc.',
    description: 'Created user interfaces and design systems for early-stage startups.',
    icon: Briefcase,
  },
  {
    year: '2011 - 2015',
    title: 'BFA in Industrial Design',
    company: 'Montclair State University',
    description: 'Focused on indsutrial design, human ergonomics, 3D modeling and prototyping.',
    icon: GraduationCap,
  },
];

const awards = [
  { year: '2013', title: '1st Place Designs for Safety Competition: World Traffic Safety Symposium at the Annual New York Auto Show' },
  { year: '2023', title: '1st Place Scuderia Ferrari Watch Design Competition for Movado Group Inc.' },
  { year: '2022', title: 'Excellence in Industrial Design by Department of Art & Design at Montclair State University' },
];

export function About() {
  return (
    <div className="min-h-screen pt-24 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="text-sm tracking-widest text-gray-500 dark:text-gray-400 uppercase mb-2">Background</p>
          <h1 className="text-5xl dark:text-white">About Me</h1>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-5 gap-12 mb-20">
          {/* Left Column - Image */}
          <div className="md:col-span-2">
            <div className="relative h-96 overflow-hidden bg-gray-100 dark:bg-gray-800">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1630734242356-a6f858790740?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwcm9kdWN0JTIwcHJvdG90eXBlJTIwc2tldGNofGVufDF8fHx8MTc3MjQyMjEwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="About Alex Chen"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column - Bio */}
          <div className="md:col-span-3 space-y-6">
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              I'm a product designer with over 12 years of experience creating intuitive digital products that solve real problems. My approach combines strategic thinking with meticulous attention to detail.
            </p>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              I believe great design is invisible—it should empower users without getting in their way. My work spans mobile apps, web platforms, and design systems, always with a focus on accessibility and user delight.
            </p>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              When I'm not designing, you'll find me exploring new coffee shops, sketching in my notebook, or staying up to date with the latest design trends and technologies.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <h2 className="text-3xl mb-8 dark:text-white">Experience & Education</h2>
          <div className="space-y-8">
            {timeline.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex gap-6 group">
                  {/* Icon & Line */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-colors">
                      <Icon size={20} />
                    </div>
                    {idx !== timeline.length - 1 && (
                      <div className="w-px h-full bg-gray-200 dark:bg-gray-700 mt-2" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-12">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{item.year}</p>
                    <h3 className="text-xl mb-1 dark:text-white">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">{item.company}</p>
                    <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Awards */}
        <div className="pt-12 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl mb-8 dark:text-white">Recognition</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {awards.map((award, idx) => (
              <div key={idx} className="space-y-2">
                <Award className="text-gray-400 dark:text-gray-500" size={24} />
                <p className="text-sm text-gray-500 dark:text-gray-400">{award.year}</p>
                <p className="text-lg dark:text-white">{award.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
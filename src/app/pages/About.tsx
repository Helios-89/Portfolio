import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Award, Briefcase, GraduationCap } from 'lucide-react';

const timeline = [
  {
    year: '2020 - Now',
    title: 'Head of Design - Tech',
    company: 'American Exchange Group',
    description: 'Lead Product Designer overseeing end-to-end design across hardware, CMF, packaging, UX/UI, and digital assets for a range of consumer tech products including smartwatches, smart glasses, and other tech accessories.',
    icon: Briefcase,
  },
  {
    year: '2018 - 2020',
    title: 'Industrial Design Consultant',
    company: 'Self Employed',
    description: 'Independent Design Consultant delivering product photography, brand photography, packaging design, product design, and e-commerce solutions including website and store design and setup for client.',
    icon: Briefcase,
  },
  {
    year: '2016 - 2018',
    title: 'Watch Designer',
    company: 'MZ Berger',
    description: 'Designed analog watches, wall clocks, and some jewelry, with a focus on detail-oriented design and trend-driven aesthetics.',
    icon: Briefcase,
  },
  {
    year: '2015',
    title: 'Product Design Intern',
    company: 'P9 Design',
    description: 'Contributed to concept development and prototyping for consumer product clients including Vicks, OXO, Braun, spanning ideation sketching, 3D modeling, and workshop prototyping/3D printing.',
    icon: Briefcase,
  },
  {
    year: '2013 - 2014',
    title: 'Watch Design Intern',
    company: 'Movado Group Inc.',
    description: 'Specialized in analog watch design for Lacoste and Tommy Hilfiger brands, focusing on dial detail, trend research, and case development through illustration and 3D modeling.',
    icon: Briefcase,
  },
  {
    year: '2011 - 2015',
    title: 'BFA in Industrial Design',
    company: 'Montclair State University',
    description: 'Focused on indsutrial design fundamentals including human factors and ergonomics, form development, CMF, design process and methodology, 3D modeling and prototyping.',
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
              I'm a product designer with over a decade of experience across physical and digital products. My work spans industrial design, UX and UI, from analog watches and consumer electronics to smartwatch interfaces and mobile apps. I have always been drawn to the full product lifecycle, from idea to user experience.
            </p>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              My industrial design foundation shapes how I approach digital work. I think about products as whole systems, where details matter as much as the big picture, and where user experiences are considered at every level.
            </p>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              I believe that good design, whether physical or digital, is grounded in the same principle: understanding how people naturally interact with the world around them. Form and function should always serve the same purpose, to create and effortless experience, regardless of what the product is.
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
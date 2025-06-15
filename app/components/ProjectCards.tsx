'use client'

type Project = {
  title: string
  description: string
  tags: string[]
  url: string
}

const projects: Project[] = [
  {
    title: 'Steps',
    description: 'Gamified pedometer app that turns steps into coins and grows virtual flowers.',
    tags: ['React Native', 'Expo', 'AsyncStorage'],
    url: 'https://mihaelholi.github.io/MTSteps.github.io',
  },
  {
    title: 'Eventium',
    description: 'Web app for discovering and filtering events by date, category and location.',
    tags: ['Vue 3', 'MongoDB', 'Leaflet', 'JWT'],
    url: 'https://mihaelholi.github.io/Mihael-Tin-banda.github.io',
  },
  {
    title: 'Aeye',
    description: 'AI-powered browser app that detects age, gender and emotion using face-api.js.',
    tags: ['face-api.js', 'TensorFlow.js', 'PWA'],
    url: 'https://mihaelholi.github.io/MihaelHoliAeye.github.io',
  },
  {
    title: 'ShapeAI',
    description: 'Simulation inspired by slime mold (Physarum) for modeling biological networks.',
    tags: ['Godot', 'Simulation', 'JSON'],
    url: 'https://mihaelholi.github.io/ObjectDetectionAI.github.io',
  },
  {
    title: 'Roženica',
    description: 'Traditional instrument player app with instrument switch and WAV sound playback.',
    tags: ['Godot', 'WAV Audio', 'Android Export'],
    url: 'https://mihaelholi.github.io/Rozenica.github.io',
  },
  {
    title: 'PulaTechCon',
    description: 'Conference website with schedule, QR code registration and event info.',
    tags: ['HTML', 'CSS', 'QR'],
    url: 'https://mihaelholi.github.io/PulaTechCon.github.io',
  },
  {
    title: 'ICIL2025',
    description: 'Physarum-based smart city simulation with background maps and scenario loading.',
    tags: ['AI', 'Urban Design', 'VR'],
    url: 'https://mihaelholi.github.io/ICIL2025.github.io',
  },
]

export default function ProjectCards() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {projects.map((project) => (
        <div key={project.title} className="bg-[#121212] p-6 rounded-xl shadow-lg border border-gray-700">
          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
          <p className="mb-4 text-sm text-gray-300">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-800 text-green-400 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-400 hover:underline"
          >
            View Project ↗
          </a>
        </div>
      ))}
    </div>
  )
}

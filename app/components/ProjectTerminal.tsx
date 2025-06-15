'use client'

export default function ProjectTerminal() {
  const projects = [
    { name: 'Steps', url: 'https://mihaelholi.github.io/MTSteps.github.io' },
    { name: 'Eventium', url: 'https://mihaelholi.github.io/Mihael-Tin-banda.github.io' },
    { name: 'Aeye', url: 'https://mihaelholi.github.io/MihaelHoliAeye.github.io' },
    { name: 'ShapeAI', url: 'https://mihaelholi.github.io/ObjectDetectionAI.github.io' },
    { name: 'Roženica', url: 'https://mihaelholi.github.io/Rozenica.github.io' },
    { name: 'PulaTechCon', url: 'https://mihaelholi.github.io/PulaTechCon.github.io' },
    { name: 'ICIL2025', url: 'https://mihaelholi.github.io/ICIL2025.github.io' },
  ]

  return (
    <div className="font-mono space-y-2">
      {projects.map((project) => (
        <div key={project.name}>
          <span className="text-green-400">$</span>{' '}
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-white hover:text-green-300"
          >
            {project.name}
          </a>
        </div>
      ))}
    </div>
  )
}

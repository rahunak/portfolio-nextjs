export default function Home() {
  const projects = [
    {
      title: 'Advice',
      image: '/images/advice-mobile-design.jpg',
      link: 'https://rahunak.github.io/advice/',
      tech: 'HTML + CSS + JavaScript + Advice API',
    },
    {
      title: 'Note editor',
      image: '/images/note-editor-short.png',
      link: 'https://rahunak.github.io/note-editor/',
      tech: 'React',
    },
    {
      title: 'Shelter',
      image: '/images/shelter.png',
      link: 'https://rolling-scopes-school.github.io/rahunak-JSFE2022Q1/SHELTER/',
      tech: 'HTML + CSS + JavaScript',
    },
    {
      title: 'Slider',
      image: '/images/slider.png',
      link: 'https://rahunak.github.io/cssMemSlider/cssMemeSlider/',
      tech: 'only HTML + pure CSS',
    },
    {
      title: 'Dictionary',
      image: '/images/dictionary.png',
      link: 'https://rahunak.github.io/Dictionary/',
      tech: 'React-Redux + Material UI + Dictionary API',
    },
    {
      title: 'Keyboard',
      image: '/images/keyboard.png',
      link: 'https://rahunak.github.io/virtual-keyboard/dist/',
      tech: 'only JavaScript + Scss',
    },
    {
      title: 'code Jam',
      image: '/images/codeJam.png',
      link: 'https://rolling-scopes-school.github.io/rahunak-JSFE2022Q3/codejam/',
      tech: 'only JavaScript + Scss',
    },
    {
      title: 'Song Bird',
      image: '/images/songBird_quiz.png',
      link: 'https://rolling-scopes-school.github.io/rahunak-JSFE2022Q3/songBird/',
      tech: 'only JavaScript + Scss',
    },
    {
      title: 'Online Zoo',
      image: '/images/online-zoo.png',
      link: 'https://rolling-scopes-school.github.io/rahunak-JSFE2022Q3/online-zoo',
      tech: 'HTML + Scss + JS',
    },
    {
      title: 'sun and moon',
      image: '/images/Sun-and-moon.png',
      link: 'https://rahunak.github.io/sun-and-moon/',
      tech: 'HTML + CSS',
    },
    {
      title: 'Slider',
      image: '/images/circleSlider.png',
      link: 'https://rahunak.github.io/circle-slider/slider/',
      tech: 'HTML + Scss',
    },
    {
      title: 'Lettering',
      image: '/images/rahunak-letter.png',
      link: 'https://rahunak.github.io/lettering/',
      tech: 'HTML + Scss + JS',
    },
    {
      title: 'Garland',
      image: '/images/garland.png',
      link: 'https://rahunak.github.io/bare-bouns-template/garland/',
      tech: 'HTML + Scss',
    },
    {
      title: 'UI Examples',
      image: '/images/menu_items.png',
      link: 'https://rahunak.github.io/bare-bouns-template/menu_items/',
      tech: 'HTML + SCSS + CSS',
    },
    {
      title: 'React Router',
      image: '/images/ReactRouter.png',
      link: 'https://rahunak.github.io/ReactRouter',
      tech: 'React + ReactRouter',
    },
    {
      title: 'Library of Poets',
      image: '/images/LibraryPoets.png',
      link: 'https://rahunak.github.io/LibraryPoets/',
      tech: 'JS + SCSS + HTML + localStorage',
    },
    {
      title: 'Contact Book',
      image: '/images/contact_book.png',
      link: 'https://rahunak.github.io/contact_book/',
      tech: 'Bootstrap + JS + SCSS',
    },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      {/* Welcome Section */}
      <section id="top" className="h-screen flex flex-col items-center justify-center text-center pt-16">
        <h1 className="text-6xl md:text-8xl font-bold text-gray-900 dark:text-white mb-4">
          Zaiko Eugeni
        </h1>
        <p className="text-3xl md:text-4xl text-gray-600 dark:text-gray-400">
          a web developer
        </p>
      </section>

      {/* Projects Section */}
      <section id="mainProjects" className="min-h-screen py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-16">
            These are some of my projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <a
                key={index}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110 group-hover:rounded-[10%]"
                  />
                </div>
                <div className="p-4 border-t-2 border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-white mb-2 group-hover:before:content-['<'] group-hover:after:content-['/>'] group-hover:before:opacity-100 group-hover:after:opacity-100 before:opacity-0 after:opacity-0 before:transition-opacity after:transition-opacity">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                    {project.tech}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center bg-white dark:bg-gray-900 border-t-2 border-gray-200 dark:border-gray-800">
        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-12">
          Let&apos;s work together...
        </h2>
        <div className="flex gap-8">
          <a
            href="https://github.com/rahunak"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-transparent hover:border-blue-500 dark:hover:border-blue-400 text-gray-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-all hover:-translate-y-1"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            <span className="text-xl font-semibold">Git</span>
          </a>
          <a
            href="https://www.linkedin.com/in/rahunak/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-transparent hover:border-blue-500 dark:hover:border-blue-400 text-gray-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-all hover:-translate-y-1"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 16 16">
              <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
            </svg>
            <span className="text-xl font-semibold">Linkedin</span>
          </a>
          <a
            href="tel:+375257810998"
            className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-transparent hover:border-blue-500 dark:hover:border-blue-400 text-gray-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-all hover:-translate-y-1"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z"/>
              <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
            </svg>
            <span className="text-xl font-semibold">Call me</span>
          </a>
        </div>
      </section>
    </main>
  );
}

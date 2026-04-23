'use client';

export default function CVDownload() {
  const cvUrl = process.env.NEXT_PUBLIC_CV_DOWNLOAD_URL;

  if (!cvUrl) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <a
        href={cvUrl}
        download
        className="flex items-center gap-3 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-6 py-3.5 rounded-lg shadow-lg border-2 border-blue-600 dark:border-blue-700 transition-all hover:-translate-y-0.5 hover:shadow-xl backdrop-blur-sm"
        aria-label="Download CV"
      >
        <span className="text-sm font-semibold tracking-wider uppercase whitespace-nowrap">
          Download CV
        </span>
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
          <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
        </svg>
      </a>
    </div>
  );
}

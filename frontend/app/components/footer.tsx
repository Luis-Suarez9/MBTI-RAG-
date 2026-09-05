export default function Footer() {
  return (
    <footer className="bg-[#a3907c] text-white/95 py-4 px-8 flex flex-col justify-center items-center text-sm font-medium gap-1">
      <div>© 2026 MADE BY SANDEESAN</div>
      <div className="text-xs opacity-90">
        AI services provided by{' '}
        <a
          href="https://ai.google.dev/"
          target="_blank"
          rel="noreferrer"
          className="underline hover:opacity-80"
        >
          Google Gemini
        </a>{' '}
        and{' '}
        <a
          href="https://groq.com/"
          target="_blank"
          rel="noreferrer"
          className="underline hover:opacity-80"
        >
          Groq
        </a>
        .
      </div>
    </footer>
  );
}
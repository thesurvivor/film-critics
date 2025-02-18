import SiteNav from '@/components/navbar'

export default function About() {
    return (
      <div className="container min-h-screen px-4 grid grid-rows-[auto_1fr_auto] gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-4 w-full">
        <header className="w-full flex gap-4 justify-between items-center sm:items-start">
          <SiteNav />
        </header>
        <h1 className="text-4xl font-bold">About</h1>
        <p>
          Dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.
        </p>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        
      </footer>
    </div>
    )
}
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t dark:border-zinc-800/30 py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
        <div className="flex items-center space-x-4">
          <Link href="/" className="font-medium text-primary">
            The Univillage
          </Link>
          <span>© {new Date().getFullYear()} The Univillage</span>
        </div>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link
            href="/about"
            className="hover:text-foreground transition-colors"
          >
            About
          </Link>
          <Link
            href="/privacy"
            className="hover:text-foreground transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="hover:text-foreground transition-colors"
          >
            Terms
          </Link>
          <Link
            href="/help"
            className="hover:text-foreground transition-colors"
          >
            Help Center
          </Link>
        </div>
      </div>
    </footer>
  );
}

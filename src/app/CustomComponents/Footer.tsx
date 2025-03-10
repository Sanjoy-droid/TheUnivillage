import Link from "next/link";

import { Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t dark:border-zinc-800/30 py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
        <div className="flex items-center space-x-4">
          <Link href="/" className="font-medium text-primary">
            The Univillage
          </Link>
          <span>© {new Date().getFullYear()} The Univillage.</span>
        </div>
        <div className="flex justify-center space-x-12">
          <Link
            href="https://github.com/Sanjoy-droid/TheUnivillage"
            target="_blank"
            className="transform text-gray-500 transition duration-300 hover:scale-110 hover:text-indigo-500"
          >
            <Github size={24} />
          </Link>
          <Link
            href="https://twitter.com/sanjoy_droid"
            target="_blank"
            className="transform text-gray-500 transition duration-300 hover:scale-110 hover:text-indigo-500"
          >
            <Twitter size={24} />
          </Link>
          <Link
            href="https://linkedin.com/in/sanjoy-guin-bb3153343"
            target="_blank"
            className="transform text-gray-500 transition duration-300 hover:scale-110 hover:text-indigo-500"
          >
            <Linkedin size={24} />
          </Link>
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

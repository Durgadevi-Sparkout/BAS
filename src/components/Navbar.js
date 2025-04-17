'use client';

import { Button } from "./ui/button";

export default function NavBar() {
  return (
    <nav className="w-full px-6 py-4 bg-white shadow flex items-center justify-between sticky top-0 z-50">
      {/* Left: Logo */}
      <div className="text-xl font-bold text-primary">MyLogo</div>

      {/* Right: Button */}
      <div>
        <div className="bg-[var(--color-background)] text-[var(--color-foreground)]">
          <Button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-4 py-2 rounded">
            Login
          </Button>
        </div>
      </div>
    </nav>
  );
}

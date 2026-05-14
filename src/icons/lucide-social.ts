/**
 * Per-icon ESM entrypoints avoid Next.js `optimizePackageImports` barrel
 * resolution bugs for `lucide-react` root imports (e.g. Mail).
 */
export { default as Github } from "lucide-react/dist/esm/icons/github";
export { default as Linkedin } from "lucide-react/dist/esm/icons/linkedin";
export { default as Mail } from "lucide-react/dist/esm/icons/mail";

/**
 * The site's living background: three soft red blobs drifting on the white,
 * a faint dot-grid slowly panning, and a film-grain plate — all fixed behind
 * the content, all paused when the visitor prefers reduced motion.
 */
export default function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="jaz-blob jaz-blob-a" />
      <div className="jaz-blob jaz-blob-b" />
      <div className="jaz-blob jaz-blob-c" />
      <div className="jaz-dotgrid opacity-70" />
      <div className="jaz-grain" />
    </div>
  );
}

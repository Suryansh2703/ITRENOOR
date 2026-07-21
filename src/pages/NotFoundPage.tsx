import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-100 p-4">
      <div className="text-center">
        <h1 className="text-6xl font-display text-gold-500 mb-4">404</h1>
        <p className="text-xl mb-8">Page Not Found</p>
        <Link to="/" className="text-gold-400 hover:text-gold-300 underline">
          Go back to Home
        </Link>
      </div>
    </div>
  );
}

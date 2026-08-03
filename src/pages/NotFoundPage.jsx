import { Link } from "react-router";

function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6 text-foreground">
      <div className="text-center">
        <p className="text-sm font-medium text-primary">404</p>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          Page not found
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>

        <Link
          to="/dashboard"
          className="mt-6 inline-flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground"
        >
          Back to dashboard
        </Link>
      </div>
    </main>
  );
}

export default NotFoundPage;

import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { motion } from "motion/react";
import { PiEye, PiEyeSlash, PiLockKey } from "react-icons/pi";

import useAuth from "../auth/useAuth";

function LoginPage() {
  const { isAuthenticated, login } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const destination = location.state?.from
    ? `${location.state.from.pathname}${location.state.from.search}${location.state.from.hash}`
    : "/dashboard";

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      setError("Enter your email and password.");
      return;
    }

    const result = login(email, password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate(destination, { replace: true });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <PiLockKey className="size-6" aria-hidden="true" />
          </div>

          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to continue to DevBoard.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);

                  if (error) {
                    setError("");
                  }
                }}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);

                    if (error) {
                      setError("");
                    }
                  }}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 pr-11 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                />

                <button
                  type="button"
                  onClick={() => {
                    setShowPassword((current) => !current);
                  }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {showPassword ? (
                    <PiEyeSlash className="size-5" aria-hidden="true" />
                  ) : (
                    <PiEye className="size-5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Sign in
            </button>
          </form>

          <div className="mt-6 rounded-lg bg-muted/50 p-4">
            <p className="text-xs font-medium text-foreground">
              Demo credentials
            </p>

            <div className="mt-2 space-y-1 text-xs text-muted-foreground">
              <p>
                Email:{" "}
                <span className="font-medium text-foreground">
                  krrupesh2000@gmail.com
                </span>
              </p>

              <p>
                Password:{" "}
                <span className="font-medium text-foreground">devboard123</span>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}

export default LoginPage;

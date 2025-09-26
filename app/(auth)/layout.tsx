import type { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-serif text-foreground">Staff Login</h1>
          <p className="text-muted-foreground">
            Access the wedding invitation management system
          </p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;

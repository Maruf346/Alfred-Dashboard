import { RouterProvider, createBrowserRouter, redirect, Outlet } from "react-router";
import { Toaster } from "sonner";
import LoginPage from "@/pages/LoginPage";
import DashboardLayout from "@/layouts/DashboardLayout";
import DashboardPage from "@/pages/DashboardPage";
import UsersPage from "@/pages/UsersPage";
import SubscriptionsPage from "@/pages/SubscriptionsPage";
import SubscriptionDetailPage from "@/pages/SubscriptionDetailPage";
import SettingsPage from "@/pages/SettingsPage";
import { isAuthed } from "@/lib/auth";
import { AuthProvider } from "@/lib/authContext";

// Root wrapper — AuthProvider lives here so useNavigate is available inside router context
function RootLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

function authLoader() {
  if (!isAuthed()) return redirect("/login");
  return null;
}

function loginLoader() {
  if (isAuthed()) return redirect("/dashboard");
  return null;
}

const router = createBrowserRouter([
  {
    // Top-level layout provides AuthProvider to all routes
    Component: RootLayout,
    children: [
      // Root → redirect based on auth state
      { index: true, loader: () => isAuthed() ? redirect("/dashboard") : redirect("/login") },

      // Login (public)
      { path: "/login", Component: LoginPage, loader: loginLoader },

      // Protected layout — wraps all dashboard routes
      {
        Component: DashboardLayout,
        loader: authLoader,
        children: [
          { path: "/dashboard",          Component: DashboardPage },
          { path: "/users",              Component: UsersPage },
          { path: "/subscriptions",      Component: SubscriptionsPage },
          { path: "/subscriptions/:id",  Component: SubscriptionDetailPage },
          { path: "/settings",           Component: SettingsPage },
        ],
      },

      // Catch-all → redirect home
      { path: "*", loader: () => redirect("/") },
    ],
  },
]);

const toastStyle = {
  fontFamily: "Geist, Inter, sans-serif",
  fontSize: 13,
  background: "rgba(255,255,255,0.95)",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(207,196,197,0.3)",
  boxShadow: "0 8px 24px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
  color: "#151c27",
  borderRadius: 10,
};

export default function App() {
  return (
    <>
      <Toaster position="bottom-right" toastOptions={{ style: toastStyle }} />
      <RouterProvider router={router} />
    </>
  );
}

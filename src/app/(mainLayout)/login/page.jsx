import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Login - Fable",
  description:
    "Fable is a digital platform that connects ebook lovers, readers, and collectors with talented writers. The platform allows users to browse, discover, and read original ebooks. Writers can upload and manage their creations after a one-time verification payment, while an admin oversees the entire system.",
};

const LoginPage = () => {
  return (
    <div className="pt-10 pb-20 text-white bg-[#010103] px-4 min-h-[calc(100vh-5rem)]">
      <div className="text-center">
        <h3 className="text-2xl font-semibold md:text-4xl">Welcome Back</h3>
        <p className="mt-4">Sign in to continue discovering great ebooks</p>
      </div>
      <div className="flex items-center justify-center mt-10">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;

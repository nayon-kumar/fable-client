import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = {
  title: "Register - Fable",
  description:
    "Fable is a digital platform that connects ebook lovers, readers, and collectors with talented writers. The platform allows users to browse, discover, and read original ebooks. Writers can upload and manage their creations after a one-time verification payment, while an admin oversees the entire system.",
};

const RegisterPage = () => {
  return (
    <div className="pt-10 pb-20 text-white bg-[#010103] px-4">
      <div className="text-center ">
        <h3 className="text-2xl font-semibold md:text-4xl">
          Create an Account
        </h3>
        <p className="mt-4">Fill in the fields below to get started</p>
      </div>
      <div className="flex items-center justify-center mt-10 max-w-3xl mx-auto">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;

import Link from "@/components/Link";
import { buttonVariants } from "@/components/ui/button";
import { Pages, Routes } from "@/constants/enums";
import Form from "./_components/Form";

const SigninPage = () => {
  return (
    <main className="min-h-screen element-center container -mt-17">
      <div className="w-full max-w-md card">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Welcome Back
        </h2>

        <Form />

        <div className="mt-2 text-center text-accent text-sm">
          <span>Don&apos;t Have An Account?</span>

          <Link
            href={`${Routes.AUTH}${Pages.Register}`}
            className={`${buttonVariants({
              variant: "link",
              size: "sm",
            })} text-primary p-0.75!`}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SigninPage;

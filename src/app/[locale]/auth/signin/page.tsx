import Link from "@/components/Link";
import { buttonVariants } from "@/components/ui/button";
import { Pages, Routes } from "@/constants/enums";
import Form from "./_components/Form";
import { getAppTranslations } from "@/lib/getAppTranslations";
import { getLocale } from "next-intl/server";

const SigninPage = async () => {
  const locale = await getLocale();
  const translations = await getAppTranslations(locale);

  return (
    <main className="min-h-screen element-center container -mt-17">
      <div className="w-full max-w-md card">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {translations.auth.login.title}
        </h2>

        <Form translations={translations} />

        <div className="mt-2 text-center text-accent text-sm">
          <span>{translations.auth.login.authPrompt.message}</span>

          <Link
            href={`${Routes.AUTH}${Pages.Register}`}
            className={`${buttonVariants({
              variant: "link",
              size: "sm",
            })} text-primary p-0.75!`}
          >
            {translations.auth.login.authPrompt.signUpLinkText}
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SigninPage;

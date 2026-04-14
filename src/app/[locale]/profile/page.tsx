import EditUserForm from "@/components/EditUserForm";
import { Pages, Routes, UserRole } from "@/constants/enums";
import { getAppTranslations } from "@/lib/getAppTranslations";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const locale = await getLocale();

  const translations = await getAppTranslations(locale);

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}${Routes.AUTH}${Pages.LOGIN}`);
  }

  if (session && session.user.role === UserRole.ADMIN) {
    redirect(`/${locale}${Routes.ADMIN}`);
  }

  return (
    <main>
      <section className="section-gap">
        <div className="container">
          <h1 className="text-primary text-center font-bold text-4xl italic mb-10">
            {translations.profile.title}
          </h1>

          <EditUserForm translations={translations} user={session?.user} />
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;

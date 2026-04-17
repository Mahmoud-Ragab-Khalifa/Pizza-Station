import EditUserForm from "@/components/EditUserForm";
import { Pages, Routes, UserRole } from "@/constants/enums";
import { getAppTranslations } from "@/lib/getAppTranslations";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";

const AdminPage = async () => {
  const locale = await getLocale();

  const translations = await getAppTranslations(locale);

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}${Routes.AUTH}${Pages.LOGIN}`);
  }

  if (session && session.user.role === UserRole.USER) {
    redirect(`/${locale}${Routes.PROFILE}`);
  }

  return (
    <main>
      <section className="section-gap">
        <div className="container">
          <EditUserForm translations={translations} user={session?.user} />
        </div>
      </section>
    </main>
  );
};

export default AdminPage;

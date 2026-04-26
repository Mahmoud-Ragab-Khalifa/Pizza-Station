import EditUserForm from "@/components/EditUserForm";
import { Pages, Routes } from "@/constants/enums";
import { getAppTranslations } from "@/lib/getAppTranslations";
import { getUser } from "@/server/db/users";
import { Locale } from "next-intl";
import { redirect } from "next/navigation";

const EditUserPage = async ({
  params,
}: {
  params: Promise<{ locale: Locale; userId: string }>;
}) => {
  const { locale, userId } = await params;

  const user = await getUser(userId);

  if (!user) {
    redirect(`/${locale}${Routes.ADMIN}${Pages.USERS}`);
  }

  const translations = await getAppTranslations(locale);

  return (
    <main>
      <section className="section-gap">
        <div className="container">
          <EditUserForm translations={translations} user={user} />
        </div>
      </section>
    </main>
  );
};

export default EditUserPage;

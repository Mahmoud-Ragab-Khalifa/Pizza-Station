import { Pages, Routes } from "@/constants/enums";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  const locale = await getLocale();

  if (!session) redirect(`/${locale}${Routes.AUTH}${Pages.LOGIN}`);

  return <main>ProfilePage</main>;
};

export default ProfilePage;

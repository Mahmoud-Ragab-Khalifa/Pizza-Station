import { getServerSession } from "next-auth";
import Content from "./Content";
import { authOptions } from "@/server/auth";

const Header = async () => {
  const initialSession = await getServerSession(authOptions);

  return (
    <header className="pt-7 pb-4 lg:pb-0 relative">
      <Content initialSession={initialSession} />
    </header>
  );
};

export default Header;

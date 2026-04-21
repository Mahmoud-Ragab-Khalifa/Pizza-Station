import Link from "@/components/Link";
import { buttonVariants } from "@/components/ui/button";
import { Pages, Routes } from "@/constants/enums";
import { getUsers } from "@/server/db/users";
import { Edit } from "lucide-react";
import DeleteUserButton from "./_components/DeleteUserButton";

const UsersPage = async () => {
  const users = await getUsers();

  return (
    <main>
      <section className="section-gap">
        <div className="container grid gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="card flex flex-col gap-3 sm:gap-0 sm:flex-row sm:items-center"
            >
              <div className="flex-1 grid gap-0.5 md:grid-cols-2 md:gap-0">
                <h3 className="text-primary font-medium line-clamp-1">
                  {user.name}
                </h3>

                <p className="text-sm text-accent line-clamp-1">{user.email}</p>
              </div>

              <div className="flex items-center gap-2.5 justify-end sm:justify-start">
                <Link
                  href={`${Routes.ADMIN}${Pages.USERS}/${user.id}${Pages.EDIT}`}
                  className={`${buttonVariants({ variant: "outline", size: "icon" })}`}
                >
                  <Edit />
                </Link>

                <DeleteUserButton userId={user.id} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default UsersPage;

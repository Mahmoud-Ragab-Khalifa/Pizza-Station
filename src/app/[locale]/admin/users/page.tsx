import Link from "@/components/Link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Pages, Routes } from "@/constants/enums";
import { getUsers } from "@/server/db/users";
import { Edit, Trash2 } from "lucide-react";

const UsersPage = async () => {
  const users = await getUsers();

  return (
    <main>
      <section className="section-gap">
        <div className="container grid gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="card flex justify-between items-center"
            >
              <h3 className="text-primary font-medium">{user.name}</h3>

              <p className="text-sm text-accent">{user.email}</p>

              <div className="flex items-center gap-2.5">
                <Link
                  href={`${Routes.ADMIN}${Pages.USERS}/${user.id}${Pages.EDIT}`}
                  className={`${buttonVariants({ variant: "outline", size: "icon" })}`}
                >
                  <Edit />
                </Link>

                <Button variant={"destructive"} size={"icon"}>
                  <Trash2 />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default UsersPage;

import { Category } from "@prisma/client";

const CategoryItem = ({ category }: { category: Category }) => {
  return (
    <li className="card flex justify-between items-center">
      <h3 className="text-primary font-semibold text-lg flex-1">
        {category.name}
      </h3>

      <div className="flex items-center gap-2">
        <span>Edit</span>
        <span>Delete</span>
      </div>
    </li>
  );
};

export default CategoryItem;

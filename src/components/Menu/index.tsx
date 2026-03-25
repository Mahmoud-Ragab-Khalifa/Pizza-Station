/* eslint-disable @typescript-eslint/no-explicit-any */

import MenuItem from "./MenuItem";

const Menu = ({ items }: { items: any }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((item: any) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default Menu;

import Link from "next/link";

const Header = () => {
  return (
    <header>
      <div className="container">
        <Link href={"/"}>Pizza</Link>
      </div>
    </header>
  );
};

export default Header;

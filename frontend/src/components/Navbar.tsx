import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const onClick = (page: string) => {
    navigate(`/${page}`);
  };

  return (
    <nav
      id="navbar"
      className="bg-brandPurple text-white flex justify-between px-10 items-center"
    >
      <span className="font-bold text-2xl">ChatFace</span>
      <ul className="flex space-x-4">
        <li onClick={() => onClick("login")}>Login</li>
        <li onClick={() => onClick("register")}>Register</li>
      </ul>
    </nav>
  );
};
export default Navbar;

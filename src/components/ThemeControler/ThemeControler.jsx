import { useEffect, useState } from "react";
import { BsFillSunFill } from "react-icons/bs";
import { IoMdMoon } from "react-icons/io";

const ThemeControler = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleToggle = (e) => {
    const newTheme = e.target.checked ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <label className="toggle text-base-content cursor-pointer">
      <input
        type="checkbox"
        onChange={handleToggle}
        checked={theme === "dark"}
      />

      <BsFillSunFill />
      <IoMdMoon />
    </label>
  );
};

export default ThemeControler;

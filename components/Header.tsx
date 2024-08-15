import React from "react";

const Header = ({ title }: { title: string }) => {
  return (
    <div className="bg-blue-200 p-4 text-center">
      <h1 className="text-lg">{title}</h1>
    </div>
  );
};

export default Header;

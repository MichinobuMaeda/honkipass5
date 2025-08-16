import PropTypes from "prop-types";
import appLogo from "/favicon.svg";

function Header({ title, suffix, bottom }) {
  return (
    <div className="flex flex-col sticky top-0 w-full z-10">
      <div
        className={`flex flex-row h-10 sm:h-12 px-1 sm:px-4 gap-2
          bg-light-primary dark:bg-dark-primary
          text-light-on-primary dark:text-dark-on-primary
          justify-start items-center`}
      >
        <h1 className="flex flex-row gap-2 justify-start text-2xl grow ">
          <img src={appLogo} className="size-8" alt={`${title} logo`} />
          {title}
        </h1>
        {suffix}
      </div>
      {bottom}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  suffix: PropTypes.node,
  bottom: PropTypes.node,
};

export default Header;

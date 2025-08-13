import PropTypes from "prop-types";

const Row = ({ children }) => {
  return (
    <div
      className={`flex flex-wrap px-4 sm:px-8 gap-4 sm:gap-8
        justify-start items-center`}
    >
      {children}
    </div>
  );
};

Row.propTypes = {
  children: PropTypes.node,
};

export default Row;

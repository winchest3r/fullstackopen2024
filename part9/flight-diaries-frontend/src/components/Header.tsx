interface HeaderProps {
  name: string;
}

const Header = (props: HeaderProps): JSX.Element => {
  return <div>
    <h2>{props.name}</h2>
  </div>;
};

export default Header;

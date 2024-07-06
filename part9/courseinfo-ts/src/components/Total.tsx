interface TotalProps {
  number: number;
}

const Total = (props: TotalProps): JSX.Element => {
  return <p>Number of exercises {props.number}</p>
};

export default Total;
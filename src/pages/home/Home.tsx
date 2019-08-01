import React, { useState, SetStateAction, Dispatch } from "react";

interface IProps {
  title: string;
}

export const HomePage: React.FC<IProps> = props => {
  const [counter, setNumber]: [
    number,
    (Dispatch<SetStateAction<number>>)
  ] = useState<number>(0);

  return (
    <div className="home-page" onClick={() => setNumber(counter + 1)}>
      HomePage {props.title}
      <div> {counter} </div>
    </div>
  );
};

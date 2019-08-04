import React, { useState, SetStateAction, Dispatch } from "react";
import { Header } from "../../components/header/Header";

interface IProps {
  title: string;
}

export const HomePage: React.FC<IProps> = (props: IProps) => {
  const [counter, setNumber]: [number,(Dispatch<SetStateAction<number>>)] = useState<number>(0);

  return (
    <div className="home-page" onClick={() => setNumber(counter + 1)}>
      <Header title={"Travelling & Photography"} subTitle={"alexeyphoto.zone"}/>
      <div> {counter} </div>
    </div>
  );
};

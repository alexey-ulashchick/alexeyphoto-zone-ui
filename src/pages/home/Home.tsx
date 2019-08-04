import React, { useState, SetStateAction, Dispatch } from "react";
import { Header } from "../../components/header/Header";
import { style } from 'typestyle';


const homePage = style({
  backgroundImage: `url('/assets/images/20180525-192644.jpg')`,
  height: '100vh',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: '50% 50%',
});

const header = style({
  position: 'fixed',
  bottom: '5em',
  left: 0,
  right: 0
});

interface IProps {
  title: string;
}

export const HomePage: React.FC<IProps> = (props: IProps) => {
  const [counter, setNumber]: [number,(Dispatch<SetStateAction<number>>)] = useState<number>(0);

  return (
    <div className={homePage} onClick={() => setNumber(counter + 1)}>
      <Header className={header} title={"Travelling & Photography"} subTitle={"alexeyphoto.zone"}/>
    </div>
  );
};

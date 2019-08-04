import React, { useState, SetStateAction, Dispatch } from 'react';
import { Header } from '../../components/Header/Header';
import { Nav } from '../../components/Nav/Nav';
import { HomePageClass, HeaderClass, NavClass } from './HomeStyles';

interface IProps {
  title: string;
}

export const HomePage: React.FC<IProps> = (props: IProps) => {
  const [counter, setNumber]: [number, (Dispatch<SetStateAction<number>>)] = useState<number>(0);

  return (
    <div className={HomePageClass} onClick={() => setNumber(counter + 1)}>
      <Header className={HeaderClass} title={'Travelling & Photography'} subTitle={'alexeyphoto.zone'} />
      <Nav className={NavClass} />
    </div>
  );
};

import Head from 'next/head'
import React from 'react';
import {GetServerSideProps} from 'next'
import { Barra } from "../components/barra";
import { ChallengeBox } from '../components/ChallengeBox';
import { Countdown } from '../components/Countdown';
import { CompletedChallenges } from '../components/desafiosCompletos';
import { Perfil } from '../components/perfil';
import { CountdownProvider } from '../contexts/CountdownContext';
import styles from "../styles/pages/home.module.css";
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface HomeProps{
  level:number;
  currentExperience:number;
  challengesCompleted: number;
}
export default function Home(props) {
  /*Voce coloca o countadow provider em volta das parte que vao usar ele, no caso o outro foi no app
  pq mais de uma parte poderia usar ele, o countdown é mais especifico. */
  return (
    <ChallengesProvider level={props.level} currentExperience={props.currentExperience} challengesCompleted={props.challengesCompleted}>
      <div className={styles.container}>
        <Head>
          <title>Pomodoro</title>
        </Head>
        <Barra/>
        
        <CountdownProvider> 
          <section>
            <div>
              <Perfil/>
              <CompletedChallenges/>
              <Countdown/>
            </div>
            <div>
              <ChallengeBox/>
            </div>  
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

//Se eu fizer a chamada aqui os crowlers de busca conseguem ver isso.
// ai em baixo eu consigo pegar os cookies porem serve para por exemplo eu pego o titulo do texto 
// por ai ai o cralwer vai saber qual o titulo do texto para indexar melhor.
export const getServerSideProps: GetServerSideProps = async(ctx)=>{
  //chamada api
  const {level,currentExperience, challengesCompleted} = ctx.req.cookies;
  return {
    props:{level: Number(level),
    currentExperience:Number(currentExperience),
    challengesCompleted:Number(challengesCompleted)},
  }
}
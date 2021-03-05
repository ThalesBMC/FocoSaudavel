import Head from 'next/head'
import React from 'react';
import { Barra } from "../components/barra";
import { ChallengeBox } from '../components/ChallengeBox';
import { Countdown } from '../components/Countdown';
import { CompletedChallenges } from '../components/desafiosCompletos';
import { Perfil } from '../components/perfil';
import { CountdownProvider } from '../contexts/CountdownContext';
import styles from "../styles/pages/home.module.css";

export default function Home() {
  /*Voce coloca o countadow provider em volta das parte que vao usar ele, no caso o outro foi no app
  pq mais de uma parte poderia usar ele, o countdown é mais especifico. */
  return (
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
  )
}

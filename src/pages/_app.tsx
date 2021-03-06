import "../styles/global.css" 
/*Coloco tudo que for FIXO aqui */

import {ChallengesProvider} from "../contexts/ChallengesContext";
import { CountdownProvider } from "../contexts/CountdownContext";
function MyApp({ Component, pageProps }) {
  return (
  
        <Component {...pageProps} />

 
  ) 
  
}

export default MyApp

import { useContext } from "react"
import styles from "../styles/components/barra.module.css"
import { ChallengesContext } from "../contexts/ChallengesContext";
export function Barra(){
    const{currentExperience, experienceToNextLevel} = useContext(ChallengesContext)
    const percentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel;

    return(
        <header className={styles.barra}>
            <span> 0xp</span>
            <div>
                <div style={{width:`${percentToNextLevel}%`}}/>
                <span className={styles.experience} style={{left: `${percentToNextLevel}%`}}>
                    {currentExperience} xp
                </span>

            </div>
            <span> {experienceToNextLevel} </span>
        </header>
     )
} 
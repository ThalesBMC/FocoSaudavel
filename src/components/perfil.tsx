import { useContext } from "react"
import { ChallengesContext } from "../contexts/ChallengesContext"
import styles from "../styles/components/perfil.module.css"
export function Perfil(){
    const{level}= useContext(ChallengesContext)
    return(
        <div className={styles.perfilContainer}>
            <img src="https://github.com/thalesbmc.png" alt="Thales" className={styles.teste} ></img>
            <div>
                <strong>Thales</strong>
                <p>
                    <img src="icons/level.svg" alt="level"/>
                    Level {level}
                    
                </p>
            </div>
        </div>
    )
}
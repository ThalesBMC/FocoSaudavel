import { useContext } from "react"
import { ChallengesContext } from "../contexts/ChallengesContext"
import styles from "../styles/components/levelUpModal.module.css"

// coloquei ele no challengesContext pq ele vai ser chamado quando o levelUp for chamado
// ai eu passei da mesma forma que passei o children.
export function LevelUpModal(){
    const {level, setIsLevelUpModalOpenFalse} = useContext(ChallengesContext)
    return(
    <div className={styles.overlay}>
        <div className={styles.container}>
            <header>{level}</header>
            <strong>Parabéns</strong>
            <p>Você alcançou um novo level</p>
            <button type="button" className={styles.button} onClick={setIsLevelUpModalOpenFalse}>
                <img  src="/icons/close.svg" alt="fechar modal" />
            </button>
        </div>
    </div> 
        
        )
}   
import { createContext, ReactNode, useState, useEffect} from "react";
import challenges from "../../challenges.json"
/* Ele pega o children pq é do app.tsx o valor que ele tem que passar por dentro do contexts 
provider, ai ele cria esse arquivo aqui para deixar mais limpo o app, e usa essa funcao para poder a
pegar o children e por dentro do context.provider*/

/* O react node aceita qualquer coisa como filho, tag html, componente,texto, ai faiz isso para 
tipar ele*/
interface ChallengeProviderProps {
    children: ReactNode;
}

interface Challenge{
    type:"body" | "eye";
    description:string;
    amount:number;

}
interface ChallengesContextData{
    startNewChallenge:() => void;
    level : number;
    levelUp: () => void;
    currentExperience: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    resetChallenge: () => void;
    experienceToNextLevel: number;
    completeChallenge: () => void;

}
/*Voce usa a tipagem dai de cima para que ele sugira como recomendado em outra parte da aplicacao
no caso o autocomplete, e para tipar obviamante,
o as ChalllengesContextData serve para que o contexto use essa tipagem */
export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({children}: ChallengeProviderProps){
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    const[activeChallenge, setActiveChallenge]= useState(null);

    const experienceToNextLevel= Math.pow((level + 1) * 4,2)
 
    useEffect(()=> {
        Notification.requestPermission()
    },[])

    function levelUp(){
        setLevel(level + 1 )
    }


    function startNewChallenge(){
        const randomChallengeIndex= Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]
        setActiveChallenge(challenge)
        new Audio("./notification.mp3").play();
        if(Notification.permission == "granted"){
            new Notification('Novo desafio!', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }

    }
    function resetChallenge(){
        setActiveChallenge(null)
    }
    
    function completeChallenge(){
        if(!activeChallenge) {
            return
        }
        const {amount} = activeChallenge
        let finalExperience = currentExperience + amount;
        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel
            levelUp();
        }
        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted+1)
        
    }

    return(
        <ChallengesContext.Provider value={{
            startNewChallenge,
            level,levelUp, 
            currentExperience, 
            challengesCompleted,
            experienceToNextLevel,
            activeChallenge,
            resetChallenge,
            completeChallenge,
            }}>
            {children}
        </ChallengesContext.Provider>
    )
}
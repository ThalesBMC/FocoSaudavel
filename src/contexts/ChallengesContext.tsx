import { createContext, ReactNode, useState, useEffect} from "react";
import Cookies from "js-cookie"
import challenges from "../../challenges.json"
import { LevelUpModal } from "../components/LevelUpModal";
/* Ele pega o children pq é do app.tsx o valor que ele tem que passar por dentro do contexts 
provider, ai ele cria esse arquivo aqui para deixar mais limpo o app, e usa essa funcao para poder a
pegar o children e por dentro do context.provider*/

/* O react node aceita qualquer coisa como filho, tag html, componente,texto, ai faiz isso para 
tipar ele*/
interface ChallengeProviderProps {
    children: ReactNode;
    level:number;
    currentExperience:number;
    challengesCompleted: number;
    // ta o level, currentExperience e challenges pq eu preciso typar para poder usar na hora que for
    //pegar os cookies pois vou passar os cokkies dentro do componente dos Provider.
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
    setIsLevelUpModalOpenFalse: () => void;

}
/*Voce usa a tipagem dai de cima para que ele sugira como recomendado em outra parte da aplicacao
no caso o autocomplete, e para tipar obviamante,
o as ChalllengesContextData serve para que o contexto use essa tipagem */
export const ChallengesContext = createContext({} as ChallengesContextData)
// o rest é as propriedades que eu passei pelo componente, e typei ali em cima, ai é o resto das props que sobraram
export function ChallengesProvider({children, ...rest}: ChallengeProviderProps){
    const [level, setLevel] = useState(rest.level ?? 1); 
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
    const[activeChallenge, setActiveChallenge]= useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);



    const experienceToNextLevel= Math.pow((level + 1) * 4, 2)
    
    useEffect(()=> {
        Notification.requestPermission()
    },[])
    /* Baixa a biblioteca js-cookie para armazenar cookies ai posos usar isso para salvar*/
    /* Algumas bibliotecas n tem typagem mas vc pode baixar elas usando o repositorio de typescript
    que a comunidade fez a typagem da maioria das bibliotecas, ai é yarn add @types/js-cookies -D */
    useEffect(()=>{
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    },[level, currentExperience, challengesCompleted])


    function levelUp(){
        setLevel(level + 1 );
        setIsLevelUpModalOpen(true)
    }
    function setIsLevelUpModalOpenFalse(){
        setIsLevelUpModalOpen(false)
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
            setIsLevelUpModalOpenFalse,
            }}>
            {children}
            {isLevelUpModalOpen &&<LevelUpModal/>}
            
        </ChallengesContext.Provider>
    )
}
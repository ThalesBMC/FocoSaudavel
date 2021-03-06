import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { ChallengesContext } from "./ChallengesContext";



interface CountdownContextData{
    minutes:number
    seconds:number
    hasFinishied: boolean
    IsActive: boolean
    startCountdown: ()=> void
    resetCountdown: ()=> void
}

interface CountdownProviderProps {
    children: ReactNode;
}
export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({children}){
    const {startNewChallenge} = useContext(ChallengesContext)
    const [time, setTime] = useState(25 * 60);
    const [IsActive, setIsActive]= useState(false);
    const [hasFinishied, setHasFinished] = useState(false);
    const minutes = Math.floor(time/60);
    const seconds = time % 60;

    function startCountdown(){
        setIsActive(true)
              
            
    }
    function resetCountdown(){
        clearTimeout(countdownTimeout);
        /* Setar a variavel ai em baixo no set timeout e 
        e chamar ela la em cima no comeco usando uma funcao do node
        e limpar ela aqui em cima no clear e para ela nao rodar algo atrasado para 
        que ele nao conte 1 segundo depois que ja era para ele ter parado ele limpa os efeitos do
        settimeout*/
        setIsActive(false)
        setTime(25 * 60)
        setHasFinished(false)
    }

   
    useEffect(()=>{
        if (IsActive && time >0) {
            countdownTimeout= setTimeout(()=>{
                setTime(time-1)
            },1000)
        } else if (hasFinishied == true && time===0){
            
            setIsActive(false);
        }
        else if (IsActive && time ===0){
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
            setTime(300);
            setIsActive(true);
        }
    }, [IsActive, time])


    return (
        <CountdownContext.Provider value={{   
            minutes,
            seconds,
            hasFinishied,
            IsActive,
            startCountdown,
            resetCountdown}}>
            {children}
        </CountdownContext.Provider>
    )
}
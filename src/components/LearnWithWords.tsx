import React, { useEffect, useState } from 'react'
import './learnWithWords.css'
import { data_environment } from '../dictionary/data-environment'
import SingleCard, { SingleCardProps } from './SingleCard';

interface LearnProps{
    type: string
}

const LearnWithSomething: React.FC<LearnProps> = ({type}) => {
   type Word = Readonly<{
    id: number
    word: string
    speech: string
    pron:string
    desc: string
    topic: string
    select: boolean
    
    }>
    const words = data_environment.map(item => ({...item, select: false}));
    const [selectWords, setSelectWords] = useState(words);
    
    const [countWords, setCountWords] = useState(0);
    const [isStart, setIsStart] = useState(false);
    
    

    const handleItemSelect = ( id:Number) => {       
        const newIsSelectedWords = selectWords.map((item) => item.id === id ? {...item, select: true} : item)
        setSelectWords(newIsSelectedWords);        
    }



    const clickStart = () => {
        setIsStart(true);
        setSelectWords(selectWords.map(item => ({...item, select: false})))
       
    }

    const clickNewGame = () => {
        setIsStart(false);
        setCountWords(0);
    }

    const handleChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setCountWords(Number(e.target.value));
        
    }
  

    useEffect(() => {
       selectWords.sort(() => Math.random()-0.5);
    },[])
    
    // console.log(selectWords)
    
    return (
    <>
        <h1>Learn With Words</h1>
        <div className="formWordsNumber">
            <label htmlFor="wordNumber">How many words would you like to practice?</label>
            <input type="number" id="wordNumber" onChange={handleChangeNumber} value={countWords}/>
            <button className='formBtn' onClick={clickStart}>Start</button>
            <button className='formBtn' onClick={clickNewGame} style={{backgroundColor:'green'}}>New Game</button>
        </div>        
        
        <div className="cards">
            {isStart &&
                selectWords.map((item, idx) => (idx < countWords &&
                    <div className='card' key={item.id}>
                        <SingleCard  id={item.id} word={item.word} speech={item.speech} pron={item.pron} desc={item.desc} select={item.select} type={type}/>

                        <div className="front">
                            <div className={`${item.select ? "overlayer hidden" : "overlayer"}`}
                            onClick={() => handleItemSelect(item.id)} >
                            <p>{idx+1}</p>  
                                            
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    
        </>
  )
}

export default LearnWithSomething
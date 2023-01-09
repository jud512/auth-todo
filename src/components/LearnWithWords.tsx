import React, { useEffect, useState } from 'react'
import './learnWithWords.css'
import { data_environment } from '../dictionary/data-environment'
import SingleCard from './SingleCard';

const LearnWithWords = () => {

    const words = data_environment.map(item => ({...item, select: false}));
    // const [isSelectWords, setIsSelectWords] = useState({...data_environment[0], select: false});
    const [selectWords, setSelectWords] = useState(words);
    


    const handleItemSelect = ( id:Number) => {       
        const newIsSelectedWords = selectWords.map((item) => item.id === id ? {...item, select: true} : item)
        setSelectWords(newIsSelectedWords);
        
    }
    
    console.log(selectWords)
    return (
    <>
        <h1>Learn With Words</h1>
        <div className="cards">
            {
                selectWords.map(item => (
                    <SingleCard id={item.id} word={item.word} speech={item.speech} pron={item.pron} select={item.select} handleItemSelect={handleItemSelect}/>
                ))
            }
        </div>
    
        </>
  )
}

export default LearnWithWords
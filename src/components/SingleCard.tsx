import React from 'react'
interface SingleCardProps{
    id: number;
    word: string;
    speech: string;
    pron: string;
    select: boolean;
    handleItemSelect: (id:number) => void;
}


const SingleCard = ({id, word, speech, pron, select, handleItemSelect}:SingleCardProps) => {
  return (
    <div>
        <div className='item' key={id}>
                    <p className='word'>{word}</p>
                    <p className='speech'>{speech}</p>
                    <p className='pron'>/{pron}/</p>
                    <div className={`${select ? "overlayer hidden" : "overlayer"}`}
                    onClick={() => handleItemSelect(id)} >
                     
                            <p>
                            {id}
                            
                        </p>    
                       
                                            
                    </div>
                </div>
    </div>
  )
}

export default SingleCard
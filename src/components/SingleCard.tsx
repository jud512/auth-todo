import React, { useEffect, useState } from 'react'
export interface SingleCardProps{
    id: number;
    word: string;
    speech: string;
    pron: string;
    desc: string
    select: boolean;
    type: string;
    // handleItemSelect: (id:number) => void;
}


const SingleCard = ({id, word, speech, pron, desc, type}:SingleCardProps) => {
  
  
  return (
    <div>
        <div className='item' key={id}>                    

                    { type ==='word' ? 
                    <>
                      <p className='word'>{ word }</p>
                      <p className='speech'>{speech}</p>
                      <p className='pron'>/{pron}/</p>
                    </>
                    : <p>{desc}</p>
                    }
                </div>
    </div>
  )
}

export default SingleCard
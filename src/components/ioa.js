import React, { useEffect } from 'react'

function ioa() {

    const callback=(entries)=>{
        entries.forEach((entry)=>{
            let ele=entry.target.childNodes[0];
            ele.play().then(()=>{
                if(!ele.paused && !entry.isIntersecting)
                {
                    ele.pause();
                }
            })
        })
    }
    let observer = new IntersectionObserver(callback, {threshold:0.6});
    useEffect(()=>{
        const elements=document.querySelectorAll('.videos');
        elements.forEach((element)=>{
            observer.observe(element);
        })

        return()=>{
            observer.disconnect();
        }
    },[posts])
  return (
    <div>ioa</div>
  )
}

export default ioa
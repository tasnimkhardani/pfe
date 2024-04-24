import {useState }from 'react';
function Blog ()
{
    const [on,setOn]=useState(false)
    console.log(on)

    return ( 
        <div>
            <button className='p-4 rounded-xl bg-pink-100' onClick={()=> setOn(!on)}>{on ? "Turn Off" : "Turn On"}</button>
<h1 className='text-5xl text-green-400  capitalize font-medium'> {on ? "dhaw t7al" : "dhaw tsaker"}</h1>
</div>
    )
}
export default Blog;


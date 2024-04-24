
import { useState } from 'react';

function Contact() {
    const [num, setNum] = useState(0);
    console.log(num);

    return (
        <div>
            <button
                className='p-4 rounded-2xl bg-red-300'
                onClick={() => setNum(prevNum => prevNum + 1)}
            >
                Increment
            </button>
            <h1>{num}</h1>
        </div>
    );
}

export default Contact;
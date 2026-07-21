import {useDispatch, useSelector} from 'react-redux'
import { decrement, increment, reset } from './redux/slices/counterSlice';

export const Counter  = ()=>{
    const dispath = useDispatch();
    const count = useSelector((state)=>state.counter.value);


    return(
        <>
        
        <h1>Count : {count}</h1>
        <button onClick={()=>dispath(increment())}>increment</button>
        <br />
        <button onClick={()=>dispath(decrement())}>decrement</button>
        <button onClick={()=>dispath(reset())}>reset</button>
        </>
    )

}
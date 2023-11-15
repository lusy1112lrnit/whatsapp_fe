import { useEffect } from "react"

export default function CallTimes({ 
    totalSecInCall, 
    setTotalSecInCall,
    callAccpeted,
}) {
    useEffect(()=>{
        const setSecInCall = () => {
           setTotalSecInCall((prev) => prev + 1);
           setTimeout(setSecInCall, 1000); 
        };
        if(callAccpeted){
            setSecInCall();
        }
        return () => setTotalSecInCall(0);
    }, [callAccpeted]);
    return (
    <div className={`text-dark_text_1 ${
        totalSecInCall !== 0 ? "block" : "hidden"
    }`}>
        {/* Display hours */}
        {parseInt(totalSecInCall / 3600 >= 0) ? (
            <>
                <span>
                    {parseInt(totalSecInCall / 3600).toString().length < 2
                        ? "0" + parseInt(totalSecInCall / 3600)
                        : parseInt(totalSecInCall / 3600)}
                </span> 
                <span>:</span>
            </>
        ) : null}
        {/* Display minutes */}
        <span>
            {parseInt(totalSecInCall / 60).toString().length < 2
                ? "0" + parseInt(totalSecInCall / 60)
                : parseInt(totalSecInCall / 60)}
        </span>
        <span>:</span>
        {/* Display seconds */}
        <span>
            {(totalSecInCall % 60).toString().length < 2
                ? "0" + (totalSecInCall % 60)
                : totalSecInCall % 60}
        </span>
    </div>
  );
}

import { useState } from "react";

const App1 = () => {
    const [common, setCommon] = useState({
        label:"Add contact details for further communications.",
        btn:"Next",
        colorIndex:0
    });
    const [btnVisibility, setBtnVisibility] = useState(true);
    const [btnVisibility2, setBtnVisibility2] = useState(false);
    const num=[1,2,3,4];
    const detail = ["Contact Details", "Shipping Address", "Payment", "Delivered"];
    const status = ["Add contact details for further communications.", "Add shipping address for successful delivery.", "Complete Payment to complete the order.", "Ready to get delivered!","Order Delivered successfully!🎉"];

    const nextBtn = (e) => {
        if(common.colorIndex === 3){
            setBtnVisibility2(!btnVisibility2);
            // return;
        }
        setCommon((common) => {
            let btnValue = common.btn;
            if(common.colorIndex+1 === 3) {
                btnValue = "Finish";
            }
            return{
            ...common,
            colorIndex:common.colorIndex+1,
            label:status[common.colorIndex+1],
            btn:btnValue
        }

        });
        if(common.colorIndex+1 === 1 || common.colorIndex === 0) setBtnVisibility(!btnVisibility);
    }

    const previousBtn = (e) => {
        if(common.colorIndex-1 === -1) {
            setBtnVisibility(!btnVisibility);
            return;
        }
        if(common.colorIndex === 4) {
            setBtnVisibility2(!btnVisibility2);
        }
        setCommon(() => {
            let btnValue = common.btn;
            if(common.colorIndex === 3) {
                btnValue = "Next";
            }
            return {...common,
            colorIndex:common.colorIndex-1,
            label:status[common.colorIndex-1],
            btn:btnValue}
        })
    }

    return (
        <>
        <div className="stepper">
            {num.map((value, index) => {
                return <>
                <div className="round" style={{
                    "backgroundColor":(index === common.colorIndex)?"purple":(index<common.colorIndex?"green":"grey")}
                }>{value}</div>
                {index === 3?"":<div className="line" style={{
                    "border":(index === common.colorIndex || index > common.colorIndex)?"2px solid grey":"2px solid green",
                }}></div>}
                </>
            })}
        </div>
        <div className="cart">
        {detail.map((value, index) => <span>{detail[index]} </span>)}
        </div>

        <div className="label">
            <center><label>{common.label}</label><br/>
            <button onClick={() => previousBtn()} className="cart-btn" disabled={btnVisibility} style={{"cursor":btnVisibility?"not-allowed":"pointer"}}>Previous</button>
            <button onClick={(e) => nextBtn(e)} disabled={btnVisibility2} style={{"cursor":btnVisibility2?"not-allowed":"pointer"}}>{common.btn}</button>
            </center>
        </div>
        </>
    );
}

export default App1;
import { useState, useEffect } from "react";

const DeliveryDisplay = ({thisDelivery}) => {
    const [thisDeliverySymbol, setThisDeliverySymbol] = useState("");

    useEffect(()=>{
        const ChooseDeliverySymbol = () => {
            if (!thisDelivery) return;

            setThisDeliverySymbol("");

            if (thisDelivery.wide=="y"){
                setThisDeliverySymbol((prev) => prev +'Wide')
            }
            else if (thisDelivery.noball=="y"){
                setThisDeliverySymbol((prev) => prev +'noball')
            }
            else if (thisDelivery.wicketType=="none"){
                setThisDeliverySymbol((prev) => prev +thisDelivery.runsFromBat)
            }
            else if (thisDelivery.wicketType!="none"){
                setThisDeliverySymbol((prev) => prev +thisDelivery.wicketType)
                if (thisDelivery.runsFromBat!=0){
                    setThisDeliverySymbol((prev) => prev +thisDelivery.runsFromBat)
                }
            }
        }

        ChooseDeliverySymbol();
      },[thisDelivery])

    return (
        <div>
            <h1>{thisDeliverySymbol}</h1>
        </div>
    );
};

export default DeliveryDisplay;
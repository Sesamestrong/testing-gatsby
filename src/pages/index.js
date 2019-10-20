import React, { useState, useEffect } from "react";

const rulePerInjection=f=>(strs,...vals)=>Array(strs.length+vals.length).fill(0).map((_,i)=>(i%2)?strs[i/2]:f(vals[(i-1)/2])).join("");
const encode=rulePerInjection(encodeURIComponent);

const SnipList=(()=>{
    const query = async (strs, ...vals) => await (await fetch(
        "https://snippit-backend.herokuapp.com/graphql",
        {
            headers: {
                "content-type": "application/json",
                authentication: auth
            },
            body: JSON.stringify({
                operationName: null,
                variables,
                query: encode(strs, ...vals)
            }),
            method: "POST",
            mode: "cors"
        }
    )).json();

    const SnipList = () => {
        const [snipIds, setSnipIds] = useState([]);

        return <>
        <div>
        {
            snipIds.map(snipId=><>
                <div>
                </div>
            </>)
        }
        </div>
        </>;
    };

    return SnipList;
})()

export default () => {
    const [cookies, setCookies] = useState(0);
    const [cookieProduction, setCookieProduction] = useState(0);
    const [grandmas, setGrandmas] = useState(0);
    useEffect(() => {
        document.title = `${cookies} Cookies`;
    },
        [cookies]);

    return <>
        <div>
            Cookies: <input readOnly value={cookies} />
            <input type="button" value="+1" onClick={() => setCookies(cookies + 1)} />
        </div>
    </>;
};

import React, { useEffect, useState } from "react"
import { Typography, Button } from "@material-ui/core"

export const ReturnMessage = () => {
    const [isDelivered, setIsDlivered] = useState<boolean>(false);

    const waitAndReturn = async () => {
        const promise = new Promise(resolve => {
            setTimeout(() => {resolve(true)}, 5000);
          });
        await promise;
        return true;
    }

    useEffect(() => {
        (async function _() {
            await waitAndReturn();
            setIsDlivered(true);
        })()
    }, []);

    if (!isDelivered) {
        return (<Button onClick={() => {console.log('clicked')}}>Click</Button>)
    }

    return (<Typography variant='h1'>
        Delivered
    </Typography>)
}

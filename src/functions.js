const unixToDate = (dt) =>{
    const myUnixTimestamp = dt; // start with a Unix timestamp
    const myDate = new Date(myUnixTimestamp * 1000); // convert timestamp to milliseconds and construct Date object
    return ([
        JSON.stringify(myDate.getDate()), 
        JSON.stringify(myDate.getHours())
    ]) 
}

export default unixToDate
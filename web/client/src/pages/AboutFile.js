import React from "react";
import axios from "axios";
import { useDetectAdBlock } from "adblock-detect-react";
import { url } from "../global/variables";

function AboutFile() {

    const [ip, setIP] = React.useState('');
    const adblockDetected = useDetectAdBlock();

    React.useEffect(() => {
        if (adblockDetected) {
            window.alert("ad blocker detected, please deactivate it");
            return <div>Please deactivate your adblock.</div>
        }
    }, [adblockDetected]);

    React.useEffect(() => {
        if (ip === '')
          getData();
        if (ip !== '')
          sendIp();
    });

    const getData = async () => {
        const res = await axios.get('https://geolocation-db.com/json/');
        console.log(res.data.IPv4);
        setIP(res.data.IPv4);
      };

    const sendIp = async () => {
        if (ip !== '') {
          console.log(ip);
          const dataIP = {
            ip: ip
          };
          await axios.put(url + '/setIP', dataIP);
        }
      };

    getData().then(res => {
        sendIp().then(res => {
            window.location.href = url + "/about.json";
        })
    })
    return null;
}

export default AboutFile;
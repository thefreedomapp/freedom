import { Component } from 'react';
import createWebSocket from '@/utils/websocket';
import styles from "@/styles/Direct.module.css";

class Direct extends Component {
    async componentDidMount() {
        let ws = await createWebSocket("/ws/chat");

        ws.addEventListener("message", async (event) => {
            let data = (await (event.data as Blob).text());
            if (data == "") {
                return;
            } 

            let message = document.createElement("div");
            message.innerText = data;
            message.classList.add(styles.message);

            document.getElementById(styles.messages)!.appendChild(message);
            console.log(data)
        });

        document.getElementById("message")!.addEventListener("keydown", async (event) => {
            if (event.key === "Enter") {
                let input = document.getElementById("message")! as HTMLInputElement;
                ws.send(input.value);
                input.value = "";
            }
        });
    }

    render() {
        return (
            <div>
                <h1>Direct</h1>
                <input id="message" type="text" />
                <div id={styles.messages}></div>
            </div>
        );
    }
}

export default Direct;

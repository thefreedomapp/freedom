/** @jsx h */
import { h } from "preact";
import { useState } from "preact/hooks";
import { tw } from "@twind";
import { IS_BROWSER } from "$fresh/runtime.ts";

export default function Messages() {
    const [messages, setMessages] = useState<string[]>([]);

    const ws = IS_BROWSER
        ? new WebSocket(
              `ws${window.location.protocol === "https:" ? "s" : ""}://${
                  window.location.host
              }/api/ws`
          )
        : null;

    if (IS_BROWSER) {
        console.log("wth");
        ws!.addEventListener("message", (e) =>
            setMessages([...messages, e.data])
        );
    }

    return (
        <div class={tw`gap-2 w-full`}>
            <input
                class={tw`w-full`}
                type="text"
                placeholder="Send a message"
                onKeyUp={(e) => {
                    if (e.key === "Enter") {
                        let { value } = e.target as HTMLInputElement;
                        if (IS_BROWSER) {
                            ws!.send(value);
                        }
                        value = "";
                    }
                }}
            />
            <br />
            {messages.map((message, key) => (
                <div class={tw`flex-col`} key={key}>
                    {message}
                </div>
            ))}
        </div>
    );
}

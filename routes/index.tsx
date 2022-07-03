/* @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import Messages from "@islands/Messages.tsx";

export default function Home() {
    return (
        <main id="app" class={tw`text-center`}>
            <Messages />
        </main>
    );
}

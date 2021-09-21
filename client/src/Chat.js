import React, { useEffect, useState } from "react"
import io from "socket.io-client"
import uuid from "uuid/dist/v4"

const myId = uuid()
const socket = io('http://localhost:8080')
console.log("socket --", socket)
socket.on('connect', () =>
    console.log("[IO] Connect => New connection")
)


const Chat = () => {
    const [message, updateMessage] = useState("");
    const [messages, updateMessages] =useState([]);

    // {}, [nome do usuario])
    useEffect(() => {
        const handleNewMessage = newMessage =>
            updateMessages([...messages, newMessage])
            socket.on('chat.message', handleNewMessage)
            return () => socket.off('chat.message', handleNewMessage)
    }, [messages])

    const handleFormSubmit = event => {
        event.preventDefault()
        //"" => ""
        //"   " => ""
        // "ola" => "ola"
        if(message.trim()) {
            socket.emit('chat.message', {
                id: myId,
                message,
            })
            updateMessage("")
        }
    }
    const handleInputChage = event =>
        updateMessage(event.target.value)

    return (
        <main className="container">
            <ul className="list">
                {messages.map((m, index) => (
                <li 
                key={index}
                className={`list__item list__item--${m.id === myId ? "mine" : "other"}`}>
                    <span 
                        className={`message message--${m.id === myId ? "mine" : "other"}`}
                    >
                        {m.message}
                    </span>
                </li>
                ))}
            </ul>
            <form className="form" onSubmit={handleFormSubmit}>
                <input 
                    className="form__field"
                    placeholder="Type a new message here"
                    onChange={handleInputChage}
                    type="text"
                    value={message}
                />
            </form>
        </main>
    )
}


export default Chat;


import React, { Fragment, useState, useEffect, useRef } from 'react'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import ChatOnline from '../chatonline/Chatonline';
import Conversation from '../conversations/Conversation';
import Message from '../message/message';
import Topbar from '../topbar/Topbar';
import './messenger.css';
import axios from 'axios';
import { io } from "socket.io-client";


export default function Messenger() {
    const [conversations, setconversations] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);


    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const { user } = useContext(AuthContext);
    const scrollRef = useRef();
    const socket = useRef();

    useEffect(() => {
        socket.current = io("ws://localhost:5000");

        socket.current.on("getMessage", (data) => {
            console.log('get message', data);
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on('getusers', (users) => {
            setOnlineUsers(users)
        })
    }, [user]);

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/api/conversations/${user?._id}`)
                setconversations(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        getConversations()
    }, [user?._id])



    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/api/messages/${currentChat?._id}`);
                console.log(res);
                setMessages(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        getMessages()
    }, [currentChat]);



    useEffect(() => {
        console.log('arrivle');
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id,
        };

        const receiverId = currentChat.members.find(
            (member) => member !== user._id
        );

        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage,
        });

        try {
            const res = await axios.post("http://localhost:8800/api/messages", message);
            setMessages([...messages, res.data]);
            setNewMessage("");
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <Fragment>
            <Topbar />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input type="text" placeholder="Seach for friends" className="chatmenuInput" />
                        {
                            conversations.map((c, i) => (
                                <div onClick={() => setCurrentChat(c)}>
                                    <Conversation key={i} conversation={c} currentUser={user} />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {
                            currentChat ? (
                                <>
                                    <div className="chatBoxTop">
                                        {
                                            messages.map((message, i) => (
                                                <div ref={scrollRef}>
                                                    <Message key={i} message={message} own={message.sender === user._id} />
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className="chatBoxBottom">
                                        <textarea
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            value={newMessage}
                                            placeholder="Write something..." className="chatMessageInput"></textarea>
                                        <button onClick={handleSubmit} className="chatSubmitButton">Send</button>
                                    </div>
                                </>
                            ) : (
                                <span className='noConversation'>Open a conversation to start a chats</span>
                            )
                        }

                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat} />
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

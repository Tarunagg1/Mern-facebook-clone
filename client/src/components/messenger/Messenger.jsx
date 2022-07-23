import React, { Fragment } from 'react'
import ChatOnline from '../chatonline/Chatonline';
import Conversation from '../conversations/Conversation';
import Message from '../message/message';
import Topbar from '../topbar/Topbar';
import './messenger.css';

export default function Messenger() {
    return (
        <Fragment>
            <Topbar />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input type="text" placeholder="Seach for friends" className="chatmenuInput" />
                        <Conversation />
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        <div className="chatBoxTop">
                            <Message own={true} />
                            <Message own={false} />
                            <Message own={false} />
                            <Message own={false} />
                            <Message own={false} />
                            <Message own={false} />
                            <Message own={false} />
                            <Message own={false} />
                            <Message own={false} />
                            <Message own={false} />
                            <Message own={false} />
                            <Message own={false} />
                            <Message own={false} />
                            <Message own={false} />
                            <Message own={false} />
                            <Message own={false} />

                        </div>
                        <div className="chatBoxBottom">
                            <textarea placeholder="Write something..." className="chatMessageInput"></textarea>
                            <button className="chatSubmitButton">Send</button>
                        </div>
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline />
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

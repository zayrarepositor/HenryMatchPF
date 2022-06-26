import React from 'react';
import { useEffect } from 'react';
import { useSelector } from "react-redux"

//Talks-Api import
import Talk from 'talkjs';


const InboxComponent = () => {

    const currentUser = useSelector(state => state.User);
   

    useEffect(() => {
    //   const currentUser = this.props.currentUser;
      Talk.ready.then(() => {
        var me = new Talk.User({
          id: currentUser.id,
          name: currentUser.name,
          email: currentUser.email,
          photoUrl: currentUser.photo,
          welcomeMessage: 'Hey there! How are you? :-)',
          role: 'default',
        });
      });
    }, []);
  };

  window.talkSession = new Talk.Session({
    appId: 'tUOOCMxO',
    me: me,
  });

  var other = new Talk.User({
    id: '654321',
    name: 'Sebastian',
    email: 'Sebastian@example.com',
    photoUrl: 'https://demo.talkjs.com/img/sebastian.jpg',
    welcomeMessage: 'Hey, how can I help?',
    role: 'default',
  });

  var conversation = window.talkSession.getOrCreateConversation(
    Talk.oneOnOneId(me, other)
  );

    conversation.setParticipant(me);
    conversation.setParticipant(other);

    var inbox = window.talkSession.createInbox();
    inbox.select(conversation);

    const talkjsContainer = React.createRef();
    
      return(
          <div ref={talkjsContainer}></div>
      )
    
 
export default InboxComponent;
import React, { Component, Fragment } from "react";
import Talk from "talkjs";
// import "./index.css"
// import "./indexm.css"

class NewChat extends Component {
  constructor(props) {
    super(props);

    this.inbox = undefined;
    let currentUser;
    // const currentTalkjsUser = localStorage.getItem("currentTalkjsUser");
    // if (currentTalkjsUser) {
    //   currentUser = JSON.parse(currentTalkjsUser);
    // }
    const {userDetail} = this.props;
    if(userDetail){
      currentUser = userDetail
    }

    this.state = {
      currentUser,
    };
  }

  componentWillMount(){
      const {userDetail} = this.props;
      const { userMatches } = this.props;
      let currUser = {...userDetail, id: userDetail.nickname}

    const user = userMatches.find((user) => user._id);
    const userFinal = { ...user, id: user?.nickname };
      
      console.log(currUser,"chatS");
      Talk.ready
      .then(() => {
        const me = new Talk.User(currUser);
       
          const other = new Talk.User(userFinal);
        

        if (!window.talkSession) {
          window.talkSession = new Talk.Session({
            appId: "tUOOCMxO",
            me: me
          });
        }

        const conversationId = Talk.oneOnOneId(me, other);
        const conversation =
          window.talkSession.getOrCreateConversation(conversationId);

          conversation.setParticipant(me);
        conversation.setParticipant(other);
        this.inbox = window.talkSession.createInbox(conversation);
        this.inbox.mount(this.container);
      })
      .catch((e) => console.error(e));
  }

  render() {
    return (
      <Fragment>
        <div
          style={{ height: "500px" }}
          className="inbox-container"
          ref={(c) => (this.container = c)}
        >
            
        <i>Loading...</i>
        </div>
      </Fragment>
    );
  }
}

export default NewChat;

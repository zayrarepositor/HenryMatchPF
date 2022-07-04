// import Talk from "talkjs";

// export default function Startchat(){
//     if (!window.talkSession ) {

//       return false;
//     }
//     const me = new Talk.User({
//       id: "12222244",
//       name: "james",
//       email:"james1@yandex.com",
//       role: buyer
//     });
//     const other = new Talk.User({
//       id: "1222222",
//       name: "james",
//       email:"james1@yandex.com",
//       role: buyer
//     });

//     const conversation =
//     window.talkSession.getOrCreateConversation(Talk.oneOnOneId(me, other));
//     conversation.setParticipant(me);
//     conversation.setParticipant(other);

//     const popup = window.talkSession.createPopup(conversation, { keepOpen: false });
//     popup.mount({ show: false });

//     popup.show();

//   };

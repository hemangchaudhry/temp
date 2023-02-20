import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();

const token = {
  pid: localStorage.getItem("Patient-uid"),
  did: localStorage.getItem("Doctor-uid"),
  srcid: localStorage.getItem("SRC-uid"),
};

const socket = io("http://localhost:4000", {
  query: { user: JSON.stringify(token) },
});
// const socket = io('https://warm-wildwood-81069.herokuapp.com');

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState("");
  const [call, setCall] = useState({});
  const [me, setMe] = useState("");
  const [connectedUsers, setConnectedUser] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [myInfo, setMyInfo] = useState("");

  const [selectedUsers, setSelectedUsers] = useState("");
  const [selectedChatUser, setSelectedChatUser] = useState();
  const [threeDot, setThreeDot] = useState([]);

  const [currentMessage, setCurrentMessage] = useState("");

  const [messageList, setMessageList] = useState([]);
  const [videoChat, setVideoChat] = useState(false);
  const [param, setParam] = useState("");
  const [value, setValue] = useState("Patient");

  const [mapped, setMapped] = useState({
    name: "",
    uid: "",
    socketId: "",
  });

  const [show, setShow] = useState(false);

  const patient = connectedUsers.filter((connect) => {
    return connect?.type === "Patient";
  });

  const doctor = connectedUsers.filter((connect) => {
    return connect?.type === "Doctor";
  });

  const onlineDoctors = onlineUsers.filter((users) => {
    return users.type === "Doctor";
  });

  const onlinePatients = onlineUsers.filter((users) => {
    return users.type === "Patient";
  });

  //Toggle Video

  const toggleButton = () => {
    setVideoChat(!videoChat);

    if (videoChat) {
      document.body.classList.add("active-modal");
    } else {
      document.body.classList.remove("active-modal");
    }
  };

  const toggleButton1 = () => {
    setShow(!show);
  };

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        myVideo.current.srcObject = currentStream;
      });

    socket.on("me", (id) => setMe(id));

    socket.on("userlistupdated", (data) => {
      setConnectedUser(data);
    });

    socket.on("receive_online_users", (data) => {
      console.log("Assigned USers Recevied", data);
      setOnlineUsers(data);
    });

    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, [connectedUsers, videoChat]);

  useEffect(() => {
    console.log("receive msg ----------------------------------------");
    socket.on("receive_message", (data) => {
      console.log("Data Received");
      console.log(data);
      setMessageList((list) => [...list, data]);
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    console.log("user selected id....................", id);
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };

  const login = (data) => {
    socket.emit("login", data);
    const myinfodata = { name: data.name, type: data.type, uid: data.uid };
    localStorage.setItem("mydata", JSON.stringify(myinfodata));

    setMyInfo(myinfodata);

    setThreeDot({ type: data.type, name: data.name });
  };

  const getMyInfo = () => {
    const mydata = localStorage.getItem("mydata");
    if (mydata) return JSON.parse(mydata);
  };
  const assignMySocket = (uid) => {
    socket.emit("assign_my_socket", uid);
  };

  //////////////////////////////////////////////////////////

  const handleSelectedUser = (e) => {
    setShow(true);
    setSelectedChatUser(e);
  };

  const handleOnlineUsers = (data) => {
    data.myuid = selectedChatUser.uid;
    socket.emit("online_users", data);
  };

  const sendMessageToDoctor = async () => {
    if (currentMessage !== "") {
      const messageData = {
        currentMessage: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
        to: selectedChatUser,
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        toggleButton,
        videoChat,
        setVideoChat,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
        connectedUsers,
        sendMessageToDoctor,
        currentMessage,
        setCurrentMessage,
        messageList,
        setMessageList,
        login,
        threeDot,
        setThreeDot,
        show,
        setShow,
        toggleButton1,
        value,
        setValue,
        setParam,
        param,
        patient,
        doctor,
        selectedUsers,
        setSelectedUsers,
        handleSelectedUser,
        selectedChatUser,
        onlineUsers,
        handleOnlineUsers,
        onlineDoctors,
        onlinePatients,
        myInfo,
        assignMySocket,
        getMyInfo
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };

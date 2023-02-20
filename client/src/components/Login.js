import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Modal from "react-bootstrap/Modal";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { SocketContext } from "../SocketContext";
import { width } from "@mui/system";
import { IconButton } from "@mui/material";

const short = require("short-uuid");

const socket = io.connect("http://localhost:4000");

const Login = () => {
  const navigate = useNavigate();

  const { login, name, setName, value, setValue, } = useContext(SocketContext);
  //
  const options = [
    { label: "Patient", value: "Patient" },

    { label: "Doctor", value: "Doctor" },

    { label: "SRC", value: "SRC" },
  ];

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("Name", name, value);

      const storeKey = `${value}-uid`;
      let uid = await localStorage.getItem(storeKey);
      if (!uid) {
        uid = await short.generate();
        await localStorage.setItem(storeKey, uid);
      }

      let data = { name: name, type: value, uid: uid, };

    
      if(data.name !== '' && data.uid !== '') {
        login(data);
        navigate(`/${value}`);
      }

    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div
      className="modal show "
      style={{
        display: "flex", 
        height: "100vh",
        // background: `linear-gradient(to bottom, #33ccff 0%, #ff99cc 100%)`,
        backgroundImage: "url(../images/bg.jpg)",
        backgroundSize: 'cover',
      }}
    >
      <Modal.Dialog className="" style={{ marginRight: 90, width: '28%', color: 'white' }}>
        <Modal.Header style={{ backgroundColor: '#6699cc'}}>
          <Modal.Title className="">Login</Modal.Title>
          <IconButton color="primary" aria-label="open video" component="label" className="" style={{display: 'flex', justifyContent: "center",}}>
          <div className='mx-3' >
            <img src="../images/logo.jpg"   style={{height: 50, width: 50, borderRadius: '50%', }} />
          </div>
          </IconButton>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#e65276'}}>
          <form action="" onSubmit={(e) => handleSubmit(e)}>
            <div className="text-center">
              <label style={{ fontSize: 18, padding: 10, }}>
                Who Are You?
                <select className="mx-2 w-40 text-center" value={value} onChange={handleChange}  style={{padding: 8, width: '150px', backgroundColor: '#6699cc', borderRadius: '10px'}}>
                  {options.map((option) => (
                    <option value={option.value}>{option.label}</option>
                  ))}
                </select>
              </label>
              <p style={{float: 'left', marginLeft: 35,}}>I am {value}.</p>
            </div>
            <TextField
              label="Name"
              id="standard-basic"
              variant="standard"
              className="my-3"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              type="submit"
              style={{backgroundColor: '#6699cc', color: 'white', opacity: 1}}
              // color="secondary"
              className="my-3"
              fullWidth
            >
              Login
            </Button>
            {/* </Link> */}
          </form>
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
};

export default Login;

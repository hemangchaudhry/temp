import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { FormRow, FormRowSelect } from "../components"
import io from "socket.io-client"
import { SocketContext } from "../Context"
// import { short } from "short-uuid"
const short = require("short-uuid")

const socket = io.connect("http://localhost:5000")

const initialState = {
  name: "",
  type: "",
  uid: "",
}

const Login = () => {
  const { login } = useContext(SocketContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState(initialState)

  const onSubmit = async (e) => {
    try {
      e.preventDefault()
      console.log(values.name)
      console.log(values.type)

      const key = short.generate()
      console.log(key)
      await localStorage.setItem(key, key)

      setValues({ ...values, uid: key })

      console.log(values)
      login(values)
      navigate(`/${values.type}`)

      // const key = "uid"
      // generate uniue id
      // let key = await localStorage.getItem(key)
      // if (!key) {
      //   const key = await short.generate()
      //   console.log(key)

      //   await localStorage.setItem(key, key)
      //   setValues({ ...values, uid: key })
      // }
      // if (values.name !== "") {
      //   login(values)
      // }
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        {/* <Logo /> */}
        <h3>login</h3>

        {/* name input */}

        <FormRow
          name="name"
          type="text"
          value={values.name}
          handleChange={handleChange}
        />
        <FormRowSelect
          labelText="type"
          name="type"
          value={values.type}
          handleChange={handleChange}
          list={["select", "patient", "doctor", "Src"]}
        />

        <button className="btn btn-block" type="submit" disabled={loading}>
          submit
        </button>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.div``

export default Login

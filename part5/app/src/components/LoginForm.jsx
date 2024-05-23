const LoginForm = (props) => (
    <form onSubmit={async (event) => props.handleLogin(event)}>
      <div>
        username
          <input
          type="text"
          value={props.username}
          name="Username"
          onChange={({ target }) => props.handleChangeUsername(target)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={props.password}
          name="Password"
          onChange={({ target }) => props.handleChangePassword(target)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

export default LoginForm
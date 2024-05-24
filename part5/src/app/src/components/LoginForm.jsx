const LoginForm = (props) => (
  <form onSubmit={async (event) => props.handleLogin(event)}>
    <div>
      username
      <input
        data-testid='username'
        type="text"
        value={props.username}
        name="Username"
        onChange={({ target }) => props.handleChangeUsername(target)}
      />
    </div>
    <div>
      password
      <input
        data-testid='password'
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
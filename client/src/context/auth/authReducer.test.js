import authReducer from './authReducer'

describe('App', () => {
  describe('Auth Reducer', () => {
    it('should load user', () => {
      const state = { loading: true, isAuthenticated: false }
      const newState = authReducer(state, {
        type: 'USER_LOADED',
        payload: 'testUser'
      })
      expect(newState).toEqual({
        isAuthenticated: true,
        loading: false,
        user: 'testUser'
      })
    })

    it('should register user', () => {
      const state = { loading: true, isAuthenticated: false }
      const newState = authReducer(state, {
        type: 'REGISTER_SUCCESS',
        payload: { token: 'testRegisterToken' }
      })
      expect(newState).toEqual({
        isAuthenticated: true,
        loading: false,
        token: 'testRegisterToken'
      })
    })

    it('should login user', () => {
      const state = { loading: true, isAuthenticated: false }
      const newState = authReducer(state, {
        type: 'LOGIN_SUCCESS',
        payload: { token: 'testLoginToken' }
      })
      expect(newState).toEqual({
        isAuthenticated: true,
        loading: false,
        token: 'testLoginToken'
      })
    })

    it('should fail user register', () => {
      const state = {
        loading: true
      }
      const newState = authReducer(state, {
        type: 'REGISTER_FAIL',
        payload: 'registerFail'
      })
      expect(newState).toEqual({
        isAuthenticated: false,
        loading: false,
        token: null,
        error: 'registerFail',
        user: null
      })
    })

    it('should fail user login', () => {
      const state = {
        loading: true
      }
      const newState = authReducer(state, {
        type: 'LOGIN_FAIL',
        payload: 'loginFail'
      })
      expect(newState).toEqual({
        isAuthenticated: false,
        loading: false,
        token: null,
        error: 'loginFail',
        user: null
      })
    })

    it('should logout user', () => {
      const state = {
        token: 'testToken',
        isAuthenticated: true,
        loading: true,
        user: 'test'
      }
      const newState = authReducer(state, {
        type: 'LOGOUT',
        payload: null
      })
      expect(newState).toEqual({
        isAuthenticated: false,
        loading: false,
        token: null,
        error: null,
        user: null
      })
    })

    it('should fail user auth', () => {
      const state = {
        loading: true,
        isAuthenticated: false,
        user: null,
        token: null
      }
      const newState = authReducer(state, {
        type: 'AUTH_ERROR',
        payload: 'authFail'
      })
      expect(newState).toEqual({
        isAuthenticated: false,
        loading: false,
        token: null,
        error: 'authFail',
        user: null
      })
    })

    it('should clear errors', () => {
      const state = {
        error: 'testError'
      }
      const newState = authReducer(state, {
        type: 'CLEAR_ERRORS'
      })
      expect(newState).toEqual({
        error: null
      })
    })
  })
})

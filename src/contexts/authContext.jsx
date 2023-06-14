import { createContext , useReducer ,useEffect , useState} from "react";

export const AuthContext = createContext();

export const authReducer = (state,action) => {
    switch (action.type) {
        case 'LOGIN':
            return {user: action.payload}
        case 'LOGOUT':
            return {user: null}
        default:
            return state
    }
}

export const AuthContextProvider = ({children}) => {
    const[state,dispatch] = useReducer(authReducer , {
        user: null
    })

    const [showNav, setShowNav] = useState(false);

    const toggleNavItems = () => {
        setShowNav(!showNav)
      }
    
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('vh_user'))
    
        if (user) {
          dispatch({ type: 'LOGIN', payload: user }) 
        }
      }, [])

    console.log('AuthContext state:', state);

    return(
        <AuthContext.Provider value={{...state,dispatch,showNav,setShowNav,toggleNavItems}}>
            { children }
        </AuthContext.Provider>
    )
}


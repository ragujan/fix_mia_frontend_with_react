import {  useContext } from 'react'
import AuthContext from '../context/AuthContext'
// interface Props {
//     children?: ReactNode;
//   }
function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export default useAuth
 
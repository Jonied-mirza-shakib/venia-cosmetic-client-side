import { useEffect, useState } from "react"

const useToken = user => {
    console.log(user)
    const [token, setToken] = useState('');
    useEffect(() => {
        const email = user?.user?.email;
        const currentUser = { email: email };
        if (email) {
            fetch(`https://warm-eyrie-71382.herokuapp.com/user/${email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(currentUser),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Success:', data);
                    const accessToken=data.token;
                    localStorage.setItem('accessToken',accessToken)
                    setToken(accessToken);
                })
        }
    }, [user])
    return [token, setToken]
}
export default useToken;
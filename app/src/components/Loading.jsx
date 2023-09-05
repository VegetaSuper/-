import { useEffect, useState } from 'react'

// eslint-disable-next-line react/prop-types
const Loading = ({ delay = 200 }) => {
    const [show, setShow] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setShow(true), delay)
        return () => {
            clearTimeout(timer)
        }
    }, [delay])

    return show ? <div>loading...</div> : null
}

export default Loading
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useCallback } from 'react'
import { Resizable } from 're-resizable'

export default function ResizeBox ({ defaultWidth }) {
    const [width, setWidth] = useState(defaultWidth)
    const handleResize = useCallback((e, direction, ref, d) => {
        console.log(d)
        setWidth(width + d.width)
    }, [])
    return <Resizable size={{ width, height: '100%' }} onResizeStop={handleResize}></Resizable>
}
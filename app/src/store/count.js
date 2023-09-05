import { create } from 'zustand'

export const useCountStore = create((set) => ({
    usecount: 0,
    increase: () => set(state => ({ usecount: state.usecount + 1 })),
    decrease: (v) => set(state => {
        console.log(v)
        return ({ usecount: state.usecount - 1 })
    })
}))

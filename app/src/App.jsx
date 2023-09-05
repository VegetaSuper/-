import { RouterProvider } from 'react-router-dom'
import router from '@/router'
import { createTheme, ThemeProvider } from '@mui/material/styles'
const defaultTheme = createTheme()
import { SnackbarProvider } from 'notistack'
function App () {


    return (
        <ThemeProvider theme={defaultTheme}>
            <SnackbarProvider>
                <RouterProvider router={router} />
            </SnackbarProvider>
        </ThemeProvider>
    )
}

export default App

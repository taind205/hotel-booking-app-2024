import ErrorIcon from '@mui/icons-material/Error';

interface ErrorProps {error:string}

export const AppError:React.FC<ErrorProps> = ({error}) =>
    <div className='flex flex-row m-2 p-2 gap-2 text-red-700'>
        <ErrorIcon/>
        <p>{typeof error ==='string'?error:getErrorMsg(error)}</p>
    </div>

const getErrorMsg = (error:Error) => 
    'data' in error? JSON.stringify(error.data) : 'message' in error? error.message: 'An error occurred'

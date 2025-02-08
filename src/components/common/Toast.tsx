import toast, { Toaster } from 'react-hot-toast';

export const success = ( message: string) => toast.success(message);

export const error = ( message: string) => toast.error(message);

// export const promise = (success: string, error: string, state: boolean) => toast.promise(state,
//    {
//      loading: 'Saving...',
//      success: <b>Settings saved!</b>,
//      error: <b>Could not save.</b>,
//    }
//  );
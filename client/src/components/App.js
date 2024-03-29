import React, { Component } from "react";
import { SnackbarProvider, useSnackbar } from 'notistack';

import Page from "./Page";

export default class App extends Component {

    HookCaller(){
        const { enqueueSnackbar } = useSnackbar();
        const createSnackBar = (message, variant="error") => enqueueSnackbar(message, { variant: variant });
        return <Page createSnackBar={createSnackBar}/>;
    }

    render() {
        return (
            <SnackbarProvider maxSnack={3} preventDuplicate>
                <HookCaller />
            </SnackbarProvider>
        );
    }
}

export const HookCaller = () => {
    const { enqueueSnackbar } = useSnackbar();
    const createSnackBar = (message, variant="error") => enqueueSnackbar(message, { variant: variant });
    return <Page createSnackBar={createSnackBar}/>;
};

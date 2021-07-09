import React, { useState, useEffect, useRef } from 'react';
import AppSnackBar from '../../components/snackBar/AppSnackBar';
import DialogBox from '../../components/dialog/DialogBox';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import { sendEmailApi } from '../apis/userApis';
import EmailForm from '../components/EmailForm';

const SendEmail = ({
    setAppTitle,
    userName,
}) => {
    const [loading, setLoading] = useState(true);
    const [formValues, setFormValues] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogTitle, setDialogTitle] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');

    useEffect(() => {
        setLoading(false);
        setAppTitle('Send Email to contacts');
    }, [setAppTitle]);

    const editorRef = useRef(null);

    const onSubmit = e => {
        e.preventDefault();
        const {
            sender,
            receivers,
            subject,
        } = e.target;
        const values = {
            sender: sender.value,
            receivers: receivers.value,
            subject: subject.value,
            body: editorRef.current.getContent()
        }
        setFormValues(values);
        setDialogOpen(true);
        setDialogTitle(`Do you want to send mail to ${values.receivers}`);
    }

    const onSendEmail = () => {
        setLoading(true);
        sendEmailApi(formValues)
            .then(res => {
                console.log(res);
                setLoading(false);
                setDialogOpen(false);
                setSnackBarOpen(true);
                setSnackBarMessage(`Mail sent to ${formValues.receivers}`)
                setAlertSeverity('success');
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
                setDialogOpen(false);
                setSnackBarOpen(true);
                setSnackBarMessage(`Error sending mail to ${formValues.receivers}`)
                setAlertSeverity('error');
            });
    }

    return <>
        {
            loading ?
                <LoadingSpinner /> :
                <div>
                    <AppSnackBar
                        handleClose={() => setSnackBarOpen(false)}
                        open={snackBarOpen}
                        message={snackBarMessage}
                        severity={alertSeverity}
                    />
                    <DialogBox
                        dialogTitle={dialogTitle}
                        handleClose={() => setDialogOpen(false)}
                        open={dialogOpen}
                        action={onSendEmail}
                    />
                    <EmailForm
                        editorRef={editorRef}
                        onSubmit={onSubmit}
                        userName={userName}
                    />
                </div>
        }
    </>;
};

export default SendEmail;

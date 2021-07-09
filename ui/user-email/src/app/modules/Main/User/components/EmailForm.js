import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    textGroup: {
        display: 'flex',
        flexDirection: 'column',
        width: '25%',
        margin: `0 0 ${theme.spacing(4)}px 0`
    }, marginText: {
        margin: `0 0 ${theme.spacing(2)}px 0`
    }, submitButton: {
        margin: `${theme.spacing(2)}px 0 0 0`,

    }, container: {
        maxWidth: '65%'
    }
}));

const EmailForm = ({
    editorRef,
    onSubmit,
    userName
}) => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <form
                id="email-form"
                noValidate
                autoComplete="off"
                onSubmit={onSubmit}
            // onChange={() => setDirty(false)}
            >
                <div className={classes.textGroup}>
                    <TextField
                        required
                        id="sender"
                        value={userName}
                        disabled
                        label="Sender Email Id"
                    />
                    <TextField required id="receivers" label="Receiver Email Id" />
                </div>
                <TextField
                    id="subject"
                    label="Subject"
                    variant="outlined"
                    fullWidth
                    className={classes.marginText}
                />
                <Editor
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue=""
                    init={{
                        height: 300,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar: 'undo redo | formatselect | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                />
                <Button
                    type='submit'
                    color='primary'
                    variant='contained'
                    className={classes.submitButton}
                >
                    Send E-mail
                    </Button>
            </form>
        </div>
    );
}

export default EmailForm;

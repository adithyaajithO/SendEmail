import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const DialogBox = ({
    open,
    handleClose,
    dialogTitle,
    action,
}) => {
    return <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">{`${dialogTitle} ?`}</DialogTitle>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
                No
            </Button>
            <Button onClick={action} color="primary" autoFocus>
                Yes
            </Button>
        </DialogActions>
    </Dialog>
};

DialogBox.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    dialogTitle: PropTypes.string,
    action: PropTypes.func,
};

export default DialogBox;

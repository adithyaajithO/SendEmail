import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import TableClientSide from '../../components/table/TableClientSide';
import { makeStyles } from '@material-ui/core/styles';
import AppSnackBar from '../../components/snackBar/AppSnackBar';
import DialogBox from '../../components/dialog/DialogBox';
import PersonAddDisabledOutlinedIcon from '@material-ui/icons/PersonAddDisabledOutlined';
import { getAllUsersApi, deactivateUserApi } from '../apis/adminApis';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
    buttonStyle: {
        marginTop: theme.spacing(2),
        right: '0%',
        marginRight: theme.spacing(2),
    }
}));

const DistributorScreen = ({
    setAppTitle,
    successMessage,
    errorMessage,
    ...rest
}) => {
    const [loading, setLoading] = useState(true);
    const [tableLoading, setTableLoading] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const [dialogTitle, setDialogTitle] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [idToDelete, selectIdToDelete] = useState('');
    const [userToDeactivate, setUserToDeactivate] = useState(null);
    const [users, setUsers] = useState([]);
    const [getData, setGetData] = useState(false);

    const classes = useStyles();

    useEffect(() => {
        setAppTitle('List Users');
        setLoading(false);
    }, [setAppTitle]);

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            setTableLoading(true);
            getAllUsersApi()
                .then(response => {
                    setTableLoading(false);
                    setUsers(response.data);
                    console.log('get all users response', response);
                })
                .catch(err => {
                    setTableLoading(false);
                    console.log('Get all users err', err);
                });
        }
        return () => {
            mounted = false;
        }
    }, [getData]);

    const onDeleteDistributor = () => {
        deactivateUserApi(idToDelete)
            .then(response => {
                // setLoading(false);
                // setTableLoading(false);
                console.log('deactivate user response', response);
                setSnackBarOpen(true);
                setSnackBarMessage(`${userToDeactivate.userName} is successfully deactivated`)
                setAlertSeverity('success');
                setDialogOpen(false);
                setDialogTitle('');
                setGetData(true);
            })
            .catch(err => {
                // setLoading(false);
                // setTableLoading(false);
                console.log('deactivate user err', err);
                setSnackBarOpen(true);
                setSnackBarMessage(`Error deactivating ${userToDeactivate.userName}`)
                setAlertSeverity('error');
                setDialogOpen(false);
                setDialogTitle('');
            });
    }

    const handleDeactivate = (id, user) => {
        console.log(id);
        // setTableLoading(true);
        setDialogOpen(true);
        setDialogTitle(`Do you want to deactivate ${user.userName}`);
        selectIdToDelete(id);
        setUserToDeactivate(user);
    }

    const valueFormatter = ({ value }) => (value ? 'Yes' : 'No');

    const columns = [
        // {
        //     field: '_source',
        //     hide: true,
        // },
        {
            field: 'userName',
            headerName: 'User Name',
            // valueGetter: valueFormatter,
            flex: 1,
        },
        {
            field: 'isActive',
            headerName: 'Is Active',
            valueFormatter: valueFormatter,
            flex: 1,
        },
        {
            field: '_id',
            headerName: 'Actions',
            flex: 0.5,
            renderCell: ({ value, row }) => <>
                {row.isActive ?
                    <Tooltip title="Deactivate user">
                        <IconButton onClick={() => handleDeactivate(value, row)}>
                            <PersonAddDisabledOutlinedIcon />
                        </IconButton>
                    </Tooltip> :
                    null
                }
            </>,
        }
    ];

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
                        action={onDeleteDistributor}
                    />
                    <TableClientSide
                        rows={users}
                        getRowId={row => row._id}
                        pageSize={5}
                        tableLoading={tableLoading}
                        columns={columns}
                    />
                </div>

        }
    </>
};

export default DistributorScreen;

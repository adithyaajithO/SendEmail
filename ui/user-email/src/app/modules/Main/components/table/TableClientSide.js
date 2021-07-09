import React from 'react';
import { DataGrid, GridOverlay } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    dataGrid: {
        // height: 400,
        // width: '100%',
        // transition: 'none'
        marginTop: theme.spacing(1)
    }, root: {
        '& .MuiDataGrid-cell': {
            overflow: 'visible',
            whiteSpace: 'normal',
            textOverflow: 'inherit',
            lineHeight: 'normal !important',
            display: 'flex',
            // justifyContent: 'center',
            alignItems: 'center',
        }, '& .MuiDataGrid-colCellTitle': {
            fontWeight: 501,
            overflow: 'visible',
            whiteSpace: 'normal',
            textOverflow: 'inherit',
            lineHeight: 'normal',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }
    }
}));

const TableClientSide = ({
    rows = [],
    tableLoading,
    pageSize = 10,
    noRowsOverlayText = 'No data present',
    columns = [],
    sortModel = [],
    rowHeight = 65,
    checkboxSelection = false,
    getRowId = row => row.id,
    onRowSelected = () => null,
    onSelectionModelChange = () => null,
    selectionModel = [],
    filterModel = null
}) => {
    const classes = useStyles();

    const customNoRowsOverlay = () => {
        return <GridOverlay>
            {noRowsOverlayText}
        </GridOverlay>
    };

    return (
        <div className={classes.root}>
            <DataGrid
                autoHeight
                pagination
                getRowId={getRowId}
                className={classes.dataGrid}
                rowHeight={rowHeight}
                rows={rows}
                columns={columns}
                pageSize={pageSize}
                components={{
                    NoRowsOverlay: customNoRowsOverlay
                }}
                loading={tableLoading}
                sortModel={sortModel}
                checkboxSelection={checkboxSelection}
                onRowSelected={onRowSelected}
                onSelectionModelChange={onSelectionModelChange}
                selectionModel={selectionModel}
                filterModel={filterModel}
            />
        </div>
    )

};

export default TableClientSide;
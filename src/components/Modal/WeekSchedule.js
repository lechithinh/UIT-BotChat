import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useRef} from 'react'


const WeekSchedule = (props) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 450 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Thứ</TableCell>
                        <TableCell align="center">Sáng</TableCell>
                        <TableCell align="center">Chiều</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    
                    {props.tkb ? 
                        (props.tkb.map((row,index) => (
                            <TableRow  key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                                {<TableCell component="th" scope="row" align='center'> {row[0]} </TableCell>}
                                {row[1] == 0 ? <TableCell align="center">_</TableCell> : <TableCell  align="center">{row[1]}</TableCell>}
                                {row[2] == 1 ? <TableCell align="center">_</TableCell> : <TableCell align="center">{row[2]}</TableCell>}

                        </TableRow>
                        ))) : <TableCell align="right"></TableCell>} 

                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default WeekSchedule; 
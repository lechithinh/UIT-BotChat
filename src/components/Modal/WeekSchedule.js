//React
import * as React from 'react';
import { useContext } from 'react';
//Components
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

//Global contents and dispatch from App
import { context, dispatch } from "../../App"


const WeekSchedule = (props) => {
    
    //Global contents and dispatch
    const Contents = useContext(context)
    const Actions = useContext(dispatch)

    const Schedule = Contents.current.dataRef.current.WeekSchedule;

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 450, "& .MuiTableCell-root": { fontSize: "1.3rem" } }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Thứ</TableCell>
                        <TableCell align="center">Sáng</TableCell>
                        <TableCell align="center">Chiều</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    
                    {props.user.WeekSchedule ? 
                        (props.user.WeekSchedule.map((row,index) => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 }, "& .MuiTableCell-root": { fontSize: "1.3rem" } }}>

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
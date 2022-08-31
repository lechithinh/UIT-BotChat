import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(Day, Morning, Afternoon) {
    return { Day, Morning, Afternoon };
}

const rows = [
    createData('2', "Triết học", "Tư tưởng HCM" ),
    createData('3', "Lịch sử Đảng", "Lập trình máy học" ),
    createData('4', "Trí tuệ nhân tạo", "Lịch sử Việt Nam" ),
    createData('5', "Thị giác máy tính", "Thể dục" ),
    createData('7', "Kĩ năng nghề nghiệp", "Giới thiệu ngành"),
];

const WeekSchedule = (props) => {
    console.log("TKB: ", props.tkb)
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 450 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Thứ</TableCell>
                        <TableCell align="right">Sáng</TableCell>
                        <TableCell align="right">Chiều</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row,index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row"> {row.Day} </TableCell>
                            <TableCell align="right">{row.Morning}</TableCell>
                            <TableCell align="right">{row.Afternoon}</TableCell>
 
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default WeekSchedule; 
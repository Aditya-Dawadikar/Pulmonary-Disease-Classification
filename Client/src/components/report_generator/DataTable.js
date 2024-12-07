import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap'

import { useSelector } from 'react-redux';


const DataTable = ({ index }) => {

    const allSegments = useSelector((state) => state.allSegments.allSegments)

    return <Table striped bordered hover>
        {
            allSegments === null && allSegments.length<=0? <></> : <tbody>
                <tr>
                    <td>Segment Id</td>
                    <td>{allSegments[index].name || ""}</td>
                </tr>
                <tr>
                    <td>Abnormality</td>
                    <td>{allSegments[index].analysis.summary.abnormality || ""}</td>
                </tr>
                <tr>
                    <td>Disorder</td>
                    <td>{allSegments[index].analysis.summary.disorder || ""}</td>
                </tr>
            </tbody>
        }
    </Table>
}

export default DataTable;

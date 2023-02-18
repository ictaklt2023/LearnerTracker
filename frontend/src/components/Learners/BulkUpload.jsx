import React, { useState } from 'react'
import Papa from "papaparse";
import { Icon, Label, Menu, Table, Button, Segment, Container, Form, TextArea, Dropdown, Header } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar';
import Topbar from '../Topbar/Topbar'

const BulkUpload = () => {
    const navigate = useNavigate();

    // State to store parsed data
    const [parsedData, setParsedData] = useState([]);

    //State to store table Column name
    const [tableRows, setTableRows] = useState([]);

    //State to store the values
    const [values, setValues] = useState([]);

    //Json data
    const [jsonData, setJsonData] = useState([]);



    const changeHandler = (event) => {
        // Passing file data (event.target.files[0]) to parse using Papa.parse
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                const rowsArray = [];
                const valuesArray = [];
                console.log(results.data);
                setJsonData(results.data);
                // Iterating data to get column name and their values
                results.data.map((d) => {
                    rowsArray.push(Object.keys(d));
                    valuesArray.push(Object.values(d));
                });

                // Parsed Data Response in array format
                setParsedData(results.data);

                // Filtered Column Names
                setTableRows(rowsArray[0]);

                // Filtered Values
                setValues(valuesArray);
            },
        });
    };

    const hasDuplicate = (arrayObj, colName) => {
        var hash = Object.create(null);
        return arrayObj.some((arr) => {
            return arr[colName] && (hash[arr[colName]] || !(hash[arr[colName]] = true));
        });
    };

    const sendDataToAPI = () => {
        if (parsedData.length > 0) {
            var isDuplicate = hasDuplicate(parsedData, "learnerId");
            if (!isDuplicate) {
                axios.post('http://localhost:8062/api/learner/bulkupload', parsedData)
                    .then((response) => {
                        if (response.data.status == 'Failed') {
                            alert(response.data.Message);
                        }
                        else if (response.data.status == 'OK') {
                            alert(response.data.Message);
                            navigate('/learner');
                        }
                    })
                    .catch(function (error) {
                        console.log(error.toJSON());
                    });
            }
            else {
                alert('Upload failed, LearnerId duplication found in uploaded file!');
            }
        }
        else {
            alert('No data found!');
        }
    }
    return (
        <>
            <div>
                <Topbar />
                <div className="container">
                    <Sidebar />
                    <div className="place-holder">

                        <Header as='h3'>Bulk Upload Learner Data</Header>
                        <Segment>
                            <Form>
                                <Form.Field>
                                    <label>Select CSV File</label>
                                    <input
                                        type="file"
                                        name="file"
                                        onChange={changeHandler}
                                        accept=".csv"
                                        style={{ display: "block", margin: "10px auto" }} />
                                </Form.Field>

                                <Table celled>
                                    <Table.Header>
                                        <Table.Row>
                                            {tableRows.map((rows, index) => {
                                                return (
                                                    <Table.HeaderCell>{rows}</Table.HeaderCell>)
                                            })}
                                        </Table.Row>

                                    </Table.Header>

                                    <Table.Body>
                                        {values.map((value, index) => {
                                            return (
                                                <Table.Row>
                                                    {value.map((val, i) => {
                                                        return <Table.Cell>{val}</Table.Cell>
                                                    })}

                                                </Table.Row>
                                            )
                                        })}
                                    </Table.Body>
                                </Table>

                                <Button size='mini' color='grey' type='submit' onClick={sendDataToAPI}>Submit</Button>

                                <Button size='mini' color='grey'>
                                    <Link to='/learner' style={{ color: '#FFF' }}>Cancel</Link>
                                </Button>
                            </Form>
                        </Segment>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BulkUpload
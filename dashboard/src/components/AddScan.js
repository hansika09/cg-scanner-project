import React, { useState, useContext } from "react";
import { NavLink, useNavigate, Form } from "react-router-dom";
import { adddata } from "./context/ContextProvider";
import { Button, Typography, Stack, TextField, Select, Paper, Box, MenuItem } from '@mui/material';


const statusOptions = ["Queued", "In Progress", "Success", "Failed"];


// const findingFields = [
//   {
//     name: 'type',
//     label: 'Type',
//     type: 'text',
//   },
//   {
//     name: 'ruleId',
//     label: 'Rule Id',
//     type: 'text',
//   },
//   {
//     name: 'location.path',
//     label: 'Location Path',
//     type: 'text',
//   },
//   {
//     name: 'location.positions.begin.line',
//     label: 'Begin position',
//     type: 'text',
//   },
//   {
//     name: 'metadata.description',
//     label: 'Description',
//     type: 'text',
//   },
//   {
//     name: 'metadata.severity',
//     label: 'Severity',
//     type: 'text',
//   },
// ];

const Register = () => {
  const { udata, setUdata } = useContext(adddata);

  const navigate = useNavigate("");

  const [inpval, setINP] = useState({
    name: "",
    status: "",
    queued: "",
    scanning: "",
    finished: "",
    type: "",
    rule: "",
    path: "",
    pos: "",
    desc: "",
    severity: "",
  });

  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const addInpData = async (e) => {
    e.preventDefault();
    const {
      name,
      status,
      queued,
      scanning,
      finished,
      type,
      rule,
      path,
      pos,
      desc,
      severity,
    } = inpval;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        status,
        queued,
        scanning,
        finished,
        type,
        rule,
        path,
        pos,
        desc,
        severity,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      alert("Error");
      console.log("Error");
    } else {
      navigate("/");
      setUdata(data);
      console.log("Data has been added");
    }
  };

  return (
    <div className="container">
      <div className="add_btn mt-2 mb-2">
        <Typography variant="h5">Add New Scan
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <a href='./'>
            <Button variant="outlined" sx={{ height: 40, width: 194 }} onClick={() => ""} alignItems="right">
              <Stack direction="row" alignItems="center" justifyContent={"center"}>
                <Typography><span style={{ fontWeight: 'bold' }}>GO TO DASHBOARD</span></Typography>
              </Stack>
            </Button>
          </a>
        </Typography>
      </div>

      <div className="column">
        <Box component={Paper} p={3}>
          <div className="row">
            <TextField label="Repository Name" name="name" onChange={setdata} />
          </div>

          <div className="row">
            <>Status</>
            <Select name="status" onChange={setdata}>
              {statusOptions.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}</Select>
          </div>

          <div className="row">
            <div className="col-3">
              <label>Queued At</label>
              <input
                type="datetime-local"
                value={inpval.queued}
                onChange={setdata}
                name="queued"
                className="form-control"
              />
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div className="col-3">
              <>Scanning At</>
              <input
                type="datetime-local"
                value={inpval.scanning}
                onChange={setdata}
                name="scanning"
                className="form-control"
              />
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div className="col-3">
              <>Finished At</>
              <input
                type="datetime-local"
                value={inpval.finished}
                onChange={setdata}
                name="finished"
                className="form-control"
              />
            </div>
          </div>

          <br></br>

          {/* <div className="row">
            <FieldArray
              name="findings"
              label="Finding"
              addButtonText="Add finding"
              removeButtonText="Remove"
              fields={findingFields}/>
          </div> */}

          <Box m={1} p={3} bgcolor="#efefef" borderRadius={4}>
            <div className="row">
              <Typography variant="h5">Findings</Typography>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div className="row">
                <TextField label="Type" name="type" onChange={setdata} />
              </div>

              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

              <div className="row">
                <TextField label="Rule Id" name="rule" onChange={setdata} />

              </div>

              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

              <div className="row">
                <TextField label="Path" name="path" onChange={setdata} />
              </div>

              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

              <div className="row">
                <TextField label="Position" name="pos" onChange={setdata} />
              </div>

              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

              <div className="row">
                <TextField label="Description" name="desc" onChange={setdata} />
              </div>

              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

              <div className="row">
                <TextField label="Severity" name="severity" onChange={setdata} />
              </div>

              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            </div>

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            <Button variant="outlined" sx={{ height: 40, width: 150 }} onClick={addInpData} alignItems="right" >
              <Stack direction="row" alignItems="center" justifyContent={"center"}>
                <Typography><span style={{ fontWeight: 'bold' }}>CREATE SCAN</span></Typography>
              </Stack>
            </Button>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Register;
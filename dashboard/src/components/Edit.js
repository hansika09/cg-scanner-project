import React, { useEffect, useState, useContext } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { updatedata } from "./context/ContextProvider";
import { Button, Typography, Stack, TextField, Select, Paper, Box, MenuItem } from '@mui/material';

const statusOptions = ["Queued", "In Progress", "Success", "Failed"];


const Edit = () => {
  const { updata, setUPdata } = useContext(updatedata);
  const navigate = useNavigate("");

  const [inpval, setINP] = useState({
    status: "",
    name: "",
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

  const { id } = useParams("");
  console.log(id);

  const getdata = async () => {
    const res = await fetch(`/getuser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setINP(data);
      console.log("get data");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const updateuser = async (e) => {
    e.preventDefault();

    const {
      status,
      name,
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

    const res2 = await fetch(`/updateuser/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
        name,
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

    const data2 = await res2.json();
    console.log(data2);
    if (res2.status === 422 || !data2) {
      alert("Fill the data first");
    } else {
      navigate("/");
      setUPdata(data2);
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
          <NavLink to="/.">
            <Button variant="outlined" sx={{ height: 40, width: 194 }} onClick={() => ""} alignItems="right">
              <Stack direction="row" alignItems="center" justifyContent={"center"}>
                <Typography><span style={{ fontWeight: 'bold' }}>EXIT</span></Typography>
              </Stack>
            </Button>
            </NavLink>
        </Typography>
      </div>

      <div className="column">
        <Box component={Paper} p={3}>
          <div className="row">
            <TextField label="Repository Name" name="name" onChange={setdata} value={inpval.name} />
          </div>

          <div className="row">
            <>Status</>
            <Select name="status" onChange={setdata} value={inpval.status}>
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
                <TextField label="Type" name="type" onChange={setdata} value={inpval.type}/>
              </div>

              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

              <div className="row">
                <TextField label="Rule ID" name="rule" onChange={setdata} value={inpval.rule}/>

              </div>

              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

              <div className="row">
                <TextField label="Path" name="path" onChange={setdata} value={inpval.path}/>
              </div>

              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

              <div className="row">
                <TextField label="Position" name="pos" onChange={setdata} value={inpval.pos}/>
              </div>

              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

              <div className="row">
                <TextField label="Description" name="desc" onChange={setdata} value={inpval.desc}/>
              </div>

              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

              <div className="row">
                <TextField label="Severity" name="severity" onChange={setdata} value={inpval.severity} />
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

            <Button variant="outlined" sx={{ height: 40, width: 150 }} onClick={updateuser} alignItems="right" >
              <Stack direction="row" alignItems="center" justifyContent={"center"}>
                <Typography><span style={{ fontWeight: 'bold' }}>SAVE</span></Typography>
              </Stack>
            </Button>
          </Box>
        </Box>
      </div>
    </div>
    // <div className="container">
    //   <form className="mt-5">
    //     <div className="row">
    //       <div className="mb-3 col-lg-6 col-md-6 col-12">
    //         <label className="form-label">
    //           <b>Status</b>
    //         </label>
    //         <br />
    //         <select
    //           name="status"
    //           value={inpval.status}
    //           onChange={setdata}
    //         >
    //           <option value="" disabled selected hidden>
    //             Choose An Option
    //           </option>
    //           <option value="Queued">Queued</option>
    //           <option value="In Progress">In Progress</option>
    //           <option value="Success">Success</option>
    //           <option value="Failed">Failed</option>
    //         </select>
    //       </div>
    //       <div className="mb-3 col-lg-6 col-md-6 col-12">
    //         <label className="form-label">
    //           <b>Repository Name</b>
    //         </label>
    //         <input
    //           type="text"
    //           value={inpval.name}
    //           onChange={setdata}
    //           name="name"
    //           className="form-control"
    //         />
    //       </div>
    //       <div className="mb-3 col-lg-6 col-md-6 col-12">
    //         <label className="form-label">
    //           <b>Queued At</b>
    //         </label>
    //         <input
    //           type="datetime-local"
    //           value={inpval.queued}
    //           onChange={setdata}
    //           name="queued"
    //           className="form-control"
    //         />
    //       </div>
    //       <div className="mb-3 col-lg-6 col-md-6 col-12">
    //         <label className="form-label">
    //           <b>Scanning At</b>
    //         </label>
    //         <input
    //           type="datetime-local"
    //           value={inpval.scanning}
    //           onChange={setdata}
    //           name="scanning"
    //           className="form-control"
    //         />
    //       </div>
    //       <div className="mb-3 col-lg-6 col-md-6 col-12">
    //         <label className="form-label">
    //           <b>Finished At</b>
    //         </label>
    //         <input
    //           type="datetime-local"
    //           value={inpval.finished}
    //           onChange={setdata}
    //           name="finished"
    //           className="form-control"
    //         />
    //       </div>

    //       <div className="mb-3 col-lg-6 col-md-6 col-12">
    //         <label className="form-label">
    //           <b>Type</b>
    //         </label>
    //         <input
    //           type="text"
    //           value={inpval.type}
    //           onChange={setdata}
    //           name="type"
    //           className="form-control"
    //         />
    //       </div>
    //       <div className="mb-3 col-lg-6 col-md-6 col-12">
    //         <label className="form-label">
    //           <b>Rule ID</b>
    //         </label>
    //         <input
    //           type="text"
    //           value={inpval.rule}
    //           onChange={setdata}
    //           name="rule"
    //           className="form-control"
    //         />
    //       </div>
    //       <div className="mb-3 col-lg-6 col-md-6 col-12">
    //         <label className="form-label">
    //           <b>Path</b>
    //         </label>
    //         <input
    //           type="text"
    //           value={inpval.path}
    //           onChange={setdata}
    //           name="path"
    //           className="form-control"
    //         />
    //       </div>
    //       <div className="mb-3 col-lg-6 col-md-6 col-12">
    //         <label className="form-label">
    //           <b>Position</b>
    //         </label>
    //         <input
    //           type="text"
    //           value={inpval.pos}
    //           onChange={setdata}
    //           name="pos"
    //           className="form-control"
    //         />
    //       </div>
    //       <div className="mb-3 col-lg-6 col-md-6 col-12">
    //         <label className="form-label">
    //           <b>Description</b>
    //         </label>
    //         <input
    //           type="text"
    //           value={inpval.desc}
    //           onChange={setdata}
    //           name="desc"
    //           className="form-control"
    //         />
    //       </div>
    //       <div className="mb-3 col-lg-6 col-md-6 col-12">
    //         <label className="form-label">
    //           <b>Severity</b>
    //         </label>
    //         <input
    //           type="text"
    //           value={inpval.severity}
    //           onChange={setdata}
    //           name="severity"
    //           className="form-control"
    //         />
    //       </div>

    //       <button
    //         type="submit"
    //         onClick={updateuser}
    //         className="btn btn-primary"
    //       >
    //         Submit
    //       </button>
    //     </div>
    //   </form>
    // </div>
  );
};

export default Edit;
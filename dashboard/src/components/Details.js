import React, { useEffect, useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Typography, Box, Paper, Divider } from "@mui/material";

const Details = () => {
  const [getuserdata, setUserData] = useState([]);
  console.log(getuserdata);

  const { id } = useParams("");
  console.log(id);

  const navigate = useNavigate("");

  const getData = async () => {
    const res = await fetch(`/getuser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("Error");
    } else {
      setUserData(data);
      console.log("Get Data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteUser = async (id) => {
    const res2 = await fetch(`/deleteuser/${id}`, {
        method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const deletedata = await res2.json();
        console.log(deletedata);

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            console.log("user deleted");
            navigate("/");
        }

    }

  return (
    <div className="container">   
      <div className="add_btn mt-2 mb-2">
        <Typography variant="h5">Scan Results
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
          <NavLink to={`/edit/${getuserdata._id}`}><button className="btn"><CreateIcon color="primary"/></button></NavLink>
          <button className="btn" onClick={() => deleteUser(getuserdata._id)}><DeleteOutlineIcon color="error"/></button>
        </Typography>
      </div>

      <table sx={{ minWidth: 500 }} aria-label="custom pagination table">

      </table>


      <div className="column">
        <Box component={Paper} p={3}>
        <Box p={4} bgcolor="#efefef" borderRadius={4}>
          <div className="row">
          <div className="col-6">
          <center>
          <div className="row">
            <label><b>Details:</b></label>
          </div>
          <Divider color="black"/>
          <br></br>
          <div className="row">
          <label>Repository Name: &nbsp; <span style={{ fontWeight: 400 }}>{getuserdata.name}</span></label>
          </div>
          <br></br>
          <div className="row">
          <label>Status: &nbsp; <span style={{ fontWeight: 400 }}>{getuserdata.status}</span></label>
          </div>
          <br></br>
          <div className="row">
          <label>Queued At: &nbsp; <span style={{ fontWeight: 400 }}>{getuserdata.queued}</span></label>
          </div>
          <br></br>
          <div className="row">
          <label>Scanned At: &nbsp; <span style={{ fontWeight: 400 }}>{getuserdata.scanning}</span></label>
          </div>
          <br></br>
          <div className="row">
          <label>Finished At: &nbsp; <span style={{ fontWeight: 400 }}>{getuserdata.finished}</span></label>
          </div>
          </center>
          </div>   
          
          <div className="col-6">
          <center>
          <div className="row">
            <label><b>Findings:</b></label>
          </div>
          <Divider color="black"/>
          <br></br>
          <div className="row">
            <label>Type: &nbsp; <span style={{ fontWeight: 400 }}>{getuserdata.type}</span></label>
          </div>
          <br></br>
          <div className="row">
            <label>Rule ID: &nbsp; <span style={{ fontWeight: 400 }}>{getuserdata.rule}</span></label>
          </div>
          <br></br>
          <div className="row">
            <label>Path: &nbsp; <span style={{ fontWeight: 400 }}>{getuserdata.path}</span></label>
          </div>
          <br></br>
          <div className="row">
            <label>Position: &nbsp; <span style={{ fontWeight: 400 }}>{getuserdata.pos}</span></label>
          </div>
          <br></br>
          <div className="row">
            <label>Description: &nbsp; <span style={{ fontWeight: 400 }}>{getuserdata.desc}</span></label>
          </div>
          <br></br>
          <div className="row">
            <label>Severity: &nbsp; <span style={{ fontWeight: 400 }}>{getuserdata.severity}</span></label>
          </div>
          </center>
            
          </div>       
          </div>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Details;
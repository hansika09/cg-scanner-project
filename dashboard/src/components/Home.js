import React, { useState, useEffect, useContext } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { NavLink } from "react-router-dom";
import { adddata, deldata } from './context/ContextProvider';
import { updatedata } from './context/ContextProvider';
import { Button, Typography, Stack } from '@mui/material';
// import Register from "./Register";

const Home = () => {
  const [getuserdata, setUserData] = useState([]);
  console.log(getuserdata);

  const { udata, setUdata } = useContext(adddata);

  const { updata, setUPdata } = useContext(updatedata);

  const { dltdata, setDLTdata } = useContext(deldata);

  const getData = async () => {
    const res = await fetch("/getdata", {
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
        "Content-Type": "application/json",
      }
    });

    const deletedata = await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      console.log("error");
    } else {
      console.log("user deleted");
      setDLTdata(deletedata);
      getData();
    }

  }


  return (

    <>
      {
        udata ?
          <>
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              <strong>{udata.name}</strong>  Added Successfully!
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          </> : ""
      }
      {
        updata ?
          <>
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              <strong>{updata.name}</strong>  Updated Successfully!
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          </> : ""
      }

      {
        dltdata ?
          <>
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              <strong>{dltdata.name}</strong>  Deleted Successfully!
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          </> : ""
      }

      {/* <div className="mt-5"> */}
      <div className="container">
        <div className="add_btn mt-2 mb-2">
          <Typography variant="h5">Scan Results
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <a href='/register'>
              <Button variant="outlined" sx={{ height: 40, width: 194 }} onClick={() => ""} alignItems="right">
                <Stack direction="row" alignItems="center" justifyContent={"center"}>
                  <Typography><span style={{ fontWeight: 'bold' }}>ADD NEW SCAN</span></Typography>
                </Stack>
              </Button></a>
          </Typography>
        </div>

        <table className="table">
          <thead>
            <tr className="table-white">
              <th scope="col"><span style={{ fontWeight: 'normal' }}>ID</span></th>
              <th scope="col"><span style={{ fontWeight: 'normal' }}>Repository Name</span></th>
              <th scope="col"><span style={{ fontWeight: 'normal' }}>Status</span></th>
              <th scope="col"><span style={{ fontWeight: 'normal' }}>Last Updated</span></th>
              <th scope="col"><span style={{ fontWeight: 'normal' }}>Findings</span></th>
              <th scope="col"><span style={{ fontWeight: 'normal' }}>View</span></th>
              <th scope="col"><span style={{ fontWeight: 'normal' }}>Edit</span></th>
              <th scope="col"><span style={{ fontWeight: 'normal' }}>Remove</span></th>
              {/* <th scope="col"></th> */}
            </tr>
          </thead>
          <tbody>
            {getuserdata.map((element, id) => {
              return (
                <>
                  <tr className="table-white">
                    <th scope="row">{id + 1}</th>
                    <td>{element.name}</td>
                    <td>{element.status}</td>
                    <td>{element.queued}</td>
                    <td>{
                      element.severity ? element.severity : "No Findings"
                    }</td>
                    {/* <td className="d-flex justify-content-between"> */}
                    <td>
                      <NavLink to={`view/${element._id}`}>
                        <button className="btn">
                          <RemoveRedEyeIcon color="success"/>
                        </button>
                      </NavLink>
                      </td>
                      <td>
                      <NavLink to={`edit/${element._id}`}><button className="btn"><CreateIcon color="primary"/></button></NavLink>
                      </td>
                      <td>
                      <button className="btn" onClick={() => deleteUser(element._id)}><DeleteOutlineIcon color="error"/></button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* </div> */}
    </>
  );
};

export default Home;
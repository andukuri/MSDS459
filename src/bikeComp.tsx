import React, { useState } from "react";
import {useQuery, gql} from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.css';
import Table from 'react-bootstrap/Table';
import { UserAskDataType, BrandInfo, AllQueryVars, Bike, Model, Subcategory, Category, Brand, BikeData } from "./type";
import Accordion from 'react-bootstrap/Accordion'
import Carousel from 'react-bootstrap/Carousel';
import { FormControl, FormLabel } from "react-bootstrap";
import Grid from '@mui/material/Grid'; 
import Item from '@mui/material/Grid'; 
import { Box } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";


const allquery = gql`
query GetCategoryBikes($category:String,$category1:String, $subcategory:String!, $frame:String, $suspension:String){
  Brands:Brands(first:5)
  {
    id
    brand
    categories(filter:{or:[{category:{eq:$category}},{category:{eq:$category1}}]}) {
    id
      category
      subcategories(filter:{subcategory:{eq:$subcategory}}) { id
                      subcategory
                      models{ id
                                model
                                year
                                bikes(filter:{frame:{eq:$frame}, suspension:{eq:$suspension}}){ id
                                          battery
                                          brakes
                                          currency
                                          drivetrain
                                          fork
                                          frame
                                          groupset
                                          motor
                                          price
                                          suspension
                                          travelfront
                                          travelrear
                                          wheels
                                          url
                                        }
                              }
                    }
                } 
    }
}
`;

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: "none"
  }
}));


const BikeComp=({userAskData})=>{
  
  
   const [open, setOpen] = useState(false);
  // // getModalStyle is not a pure function, we roll the style only on the first render
   const [modalStyle] = useState(getModalStyle);
   const [modalData, setData] = useState<BikeData>();
   const classes = useStyles();

   const CustomModal = () => {
    return modalData ? (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <Typography variant="subtitle1" id="simple-modal-description">            
           <img className="d-block w-100" src={modalData.url} alt='{year}-{model}' /> 
            <table>
                <thead>
                  <td></td>
                  <td></td>
                </thead>
                <tbody>
                    <tr>
                        <td>
                              Brand:
                        </td>
                        <td>
                            {modalData.brand}
                        </td>
                    </tr>
                    <tr>
                        <td>
                              Category:
                        </td>
                        <td>
                            {modalData.category}
                        </td>
                    </tr>
                    <tr>
                        <td>
                              Subcategory:
                        </td>
                        <td>
                            {modalData.subcategory}
                        </td>
                    </tr>
                    <tr>
                        <td>
                              Model:
                        </td>
                        <td>
                            {modalData.model}
                        </td>
                    </tr>                    
                    <tr>
                        <td>
                              Year:
                        </td>
                        <td>
                            {modalData.year}
                        </td>
                    </tr>
                    <tr>
                        <td>
                              Price:
                        </td>
                        <td>
                            {modalData.price}
                        </td>
                    </tr>
                    <tr>
                        <td>
                              Currency:
                        </td>
                        <td>
                            {modalData.currency}
                        </td>
                    </tr>
                    <tr>
                        <td>
                              Frame:
                        </td>
                        <td>
                            {modalData.frame}
                        </td>
                    </tr>
                    <tr>
                        <td>
                              Suspension:
                        </td>
                        <td>
                            {modalData.suspension}
                        </td>
                    </tr>
                    <tr>
                        <td>
                              Wheels:
                        </td>
                        <td>
                            {modalData.wheels}
                        </td>
                    </tr>
                    <tr>
                        <td>
                              Travel Front:
                        </td>
                        <td>
                            {modalData.travelfront}
                        </td>
                    </tr>
                    <tr>
                        <td>
                              Travel Rear:
                        </td>
                        <td>
                            {modalData.travelrear}
                        </td>
                    </tr>
                    <tr>
                        <td>
                              Fork:
                        </td>
                        <td>
                            {modalData.fork}
                        </td>
                    </tr>
                    <tr>
                        <td>
                              Groupset:
                        </td>
                        <td>
                            {modalData.groupset}
                        </td>
                    </tr>
                    <tr>
                        <td>
                              Motor:
                        </td>
                        <td>
                            {modalData.motor}
                        </td>
                    </tr>
                    <tr>
                        <td>
                              Battery:
                        </td>
                        <td>
                            {modalData.battery}
                        </td>
                    </tr>
                    <tr>
                        <td>
                              Drive Train:
                        </td>
                        <td>
                            {modalData.drivetrain}
                        </td>
                    </tr>
                    <tr>
                        <td>
                              Brakes:
                        </td>
                        <td>
                            {modalData.brakes}
                        </td>
                    </tr>
                </tbody>
            </table>
          </Typography>
          {/* <SimpleModal /> */}
        </div>
      </Modal>
    ) : null;
  };

   const handleOpen = (bikeBrand:Brand, bikeCategory:Category, bikeSubcategory:Subcategory, bikeModel:Model, bike:Bike) => {
     setOpen(true);

      const bikeData={
           brand:bikeBrand.brand,
           category:bikeCategory.category,
           subcategory:bikeSubcategory.subcategory,
           model:bikeModel.model,
           year:bikeModel.year,
           price:bike.price,
           currency:bike.currency,
           frame:bike.frame,
           wheels:bike.wheels,
           travelfront:bike.travelfront,
           travelrear:bike.travelrear,
           fork:bike.fork,
           groupset:bike.groupset,
           suspension:bike.suspension,
           motor:bike.motor,
           battery:bike.battery,
           drivetrain:bike.drivetrain,
           brakes:bike.brakes,
           url:bike.url
      }  
     setData(bikeData);
   };

   const handleClose = () => {
     setOpen(false);
   };

   const { loading, data } = useQuery<BrandInfo, AllQueryVars>(
    allquery,
    { 
      variables: { 
        category:userAskData.userAskData.category,
        category1:userAskData.userAskData.category1,
        subcategory:userAskData.userAskData.subcategory,
        frame:userAskData.userAskData.frame,
        suspension:userAskData.userAskData.suspension
      } 
    }
  );

    return(
      <div>
      <h3>Bikes for {userAskData.userAskData.category} - {userAskData.userAskData.subcategory} with frame: {userAskData.userAskData.frame} and suspension: {userAskData.userAskData.suspension}</h3>
      { loading ? (
        <p>Loading ...</p>
      ) : 
       <div>
            { data.Brands.map((brand:Brand) => (
                <div>
                  { brand.categories.map((category:Category) => (
                          category.subcategories.map((subcategory:Subcategory)=> (  
                              <div>
                                      <Box sx={{ flexGrow: 3 }}>
                                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                        {
                                          subcategory.models.map((model:Model)=>(
                                                  model.bikes.map((bike:Bike) =>(                                                           
                                                      <Grid item xs={2} sm={4}>
                                                          <Item>
                                                            <label style={{fontSize: '10px'}}>{model.year}-{model.model}</label>                                                               
                                                              <img className="d-block w-100" src={bike.url} alt='{year}-{model}'  onClick={(e) => handleOpen(brand, category, subcategory, model, bike)} />                                                           
                                                          </Item>

                                                      </Grid>                                                      
                                                    ))))}
                                                     
                                        </Grid> 
                                      </Box>
                                </div>
                          ))))}

                  <br/><br/>  
                </div>
          ))}
          
       <CustomModal />
        </div>
          }
        </div>      
  )}


export default BikeComp;
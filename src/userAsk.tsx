import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { useForm, Controller } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { storeKeyNameFromField } from '@apollo/client/utilities';
import { useRowSelection } from 'react-data-grid';
import { UserAskDataType } from './type';

const questionArray = [
  {
    question: "What terrain will you be primarily riding on?",
    options: [
      "Tarmac:Road",
      "Trails, Offroad:Mountain",
      "Just around the neighborhood:Urban"
    ],
    property:"category",
    questionId: 1,
  },
  {
    question: "Would you like pedal assist?",
    options: ["Yes:E-bike", "No: "],
    property:"category1",
    questionId: 2,
  },
  {
    question: "What is your intended use?",
    options: ["Commuting:Commuter",
    "Exploring smooth terrain:Road",
    "Exploring rough terrain:Trail",
    "Competing or Racing:Race"],
    property:"subcategory",
    questionId: 3,
  },
  {
    question: "How bumpy, intense do you imagine your rides will be?",
    options: ["Very Bumpy:Full", "Not Bumpy:Rigid", "Somewhat Bumpy:HardTail"],
    property:"suspension",
    questionId: 4,
  },
  
  {
    question: "Is weight an important factor?",
    options: ["Yes:Carbon", "No:Aluminum"],
    property:"frame",
    questionId: 5,
  },
];


//export default function UserAsk(userAskData:UserAskDataType, updateVars:(val:UserAskDataType)=>void) {
const UserAsk=({updateVars, userAskData:UserAskDataType})=>{
  const { register, handleSubmit, control } = useForm({
  });
  
  const navigate = useNavigate();

  
  const onSubmit=(data) => {    
     // var userselect=JSON.stringify(data, null, 2)
      
      const newData={
        frame:data.frame,
        suspension:data.suspension,
        subcategory:data.subcategory,
        category:data.category,
        category1:data.category1
      }
      updateVars({
        userAskData:newData
      });

      navigate('/bikes');
  };

  return (
    <div style={{ padding: 25, maxWidth: 1000 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl component="fieldset">
                  {questionArray.map(
                    ({ question, options, questionId, property }) => (
                      <div>
                        <FormLabel component="legend">{question}</FormLabel>
                        <Controller 
                        rules={{ required: true }}
                        control={control}
                        name={property}
                          as={
                            <RadioGroup>
                              {options.map(option => (
                                  <FormControlLabel
                                      value={option.split(':')[1]}
                                      control={<Radio />}
                                      label={option.split(':')[0]}
                                />
                                ))}
                            </RadioGroup>
                          }
                        />
                        <br/>
                        </div>                        
                    ))}

                  </FormControl>
                  
        <input type="submit" />
      </form>
    </div>
  )
}

export default UserAsk;
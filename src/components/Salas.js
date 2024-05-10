import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';



export default function Salas() {

    const [name,setName]= React.useState('')
    const [description,setDescription]= React.useState('')
    const [capacity,setCapacity]= React.useState('')
    const [price,setPrice]= React.useState('')

    const [salas, setSalas]= React.useState([]);

    const handleClick= (e)=>{
        e.preventDefault()
        const salas={name,description,capacity,price}
        console.log(salas);
        fetch("http://localhost:8080/salas/add",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(salas)
        }).then(()=>{
            console.log("new sala is added");
        })
    }

    React.useEffect(()=>{
        fetch("http://localhost:8080/clases/getAll")
        .then(res=>res.json())
        .then((result)=>{
            setSalas(result);
        }
    )
    },[])

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
    <form>
      <TextField id="outlined-basic" label="Name" variant="outlined" value={name} onChange={(e)=>setName(e.target.value)} />
      <TextField id="outlined-basic" label="Description" variant="outlined" value={description} onChange={(e)=>setDescription(e.target.value)} />
      <TextField id="outlined-basic" label="Capacity" variant="outlined"  value={capacity} onChange={(e)=>setCapacity(e.target.value)}/>
      <TextField id="outlined-basic" label="Price" variant="outlined"  value={price} onChange={(e)=>setPrice(e.target.value)}/>
      <Button variant="contained" onClick={handleClick}>Submit</Button>
    </form>
    <Paper elevation={3} >

        {salas.map(salas=>(
            <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}}/>
           
        ))}
    </Paper>
   
      
    </Box>
  );
}
